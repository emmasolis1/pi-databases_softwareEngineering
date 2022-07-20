------------------------- Oficial Ta' Bueno SQL Query -------------------------

--------------- Deleting (firing) an Employee --------------
create procedure delete_employee (@userID as char(10)) as 
begin try
	begin transaction;
    -- 1. Process this last payment (liquidation).

    -- 2. Make early finalization to employee's contract.
    update Contracts set RealEndedDate=(select CONVERT (Date, GETDATE())) where EmployeeID=@userID;

    -- 3. Set User as inactive
    update Users set UserType=3 where Identification=@userID;
	commit transaction;
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
	if XACT_STATE() = -1 begin
		print 'The transaction cannot be commited';
		rollback transaction;
	end
end catch
go

--------------- Pay Salary to an Employee -----------------

create procedure save_payment @project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @start_date date, @payment_date date, @net_salary float
as 
begin try
	begin transaction;
	insert into Payments ([ProjectName], [EmployerID], [EmployeeID], [StartDate], [PaymentDate], [NetSalary])
	VALUES (@project_name, @employer_id, @employee_id, @start_date, @payment_date, @net_salary)
	commit transaction;
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
	if XACT_STATE() = -1 begin
		print 'The transaction cannot be commited';
		rollback transaction;
	end 
end catch
go

create function GetRentDeduction(
	@salary float
)
returns varchar(128)
begin
	declare @rent_deduction as varchar(128) = 'none'
	if @salary between 842000 and 1236000 begin
		set @rent_deduction = 'Income tax I'
	end
	else if @salary between 1236000 and 2169000 begin
		set @rent_deduction = 'Income tax II'
	end
	else if @salary between 2169000 and 4337000 begin
		set @rent_deduction = 'Income tax III'
	end
	else if @salary > 4337000 begin
		set @rent_deduction = 'Income tax IV'
	end
	return @rent_deduction
end
go

create function GetRentDeductionAmount(
	@salary float
)
returns float(20)
begin
	declare @total_rent_deduction as float(20) = 0
	declare @applyable_value as float(20) = 0
	if @salary > 842000 begin
		if @salary > 1236000 begin
			set @applyable_value = 1236000 - 842000
		end
		else begin
			set @applyable_value = @salary - 842000
		end
		set @total_rent_deduction = @total_rent_deduction + (@applyable_value * 0.1)
	end
	if @salary > 1236000 begin
		if @salary > 2169000 begin
			set @applyable_value = 2169000 - 1236000
		end
		else begin
			set @applyable_value = @salary - 1236000
		end
		set @total_rent_deduction = @total_rent_deduction + (@applyable_value * 0.15)
	end
	if @salary > 2169000 begin
		if @salary > 4337000 begin
			set @applyable_value = 4337000 - 2169000
		end
		else begin
			set @applyable_value = @salary - 2169000
		end
		set @total_rent_deduction = @total_rent_deduction + (@applyable_value * 0.2)
	end
	if @salary > 4337000 begin
		set @applyable_value = @salary - 4337000
		set @total_rent_deduction = @total_rent_deduction + (@applyable_value * 0.25)
	end
	return @total_rent_deduction
end
go

create function DateIsInRange(
	@date_check date,
	@start_date date,
	@end_date date
)
returns bit
as
begin
	if @date_check is null begin
		set @date_check = convert (date, getdate())
	end
	declare @response as bit = 0
	if (@end_date is not null and @date_check between @start_date and @end_date) or (@date_check > @start_date and @end_date is null)
	begin
		set @response = 1
	end
	return @response
end
go

--Gets the employee's hours resgistries on a project within a given date range, it doesn't consider the given @start_date (@start_date < HOUR_REGISTRY_DATE <= @end_date)
create procedure GetEmployeeHourRegistryInRange @project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @start_date date, @end_date date
as
begin try
	select Users.Identification, HoursRegistry.ProjectName, HoursRegistry.Date, HoursRegistry.NumberOfHours
	from Users join HoursRegistry on Users.Identification = HoursRegistry.EmployeeID
	where HoursRegistry.ProjectName = @project_name and HoursRegistry.EmployerID = @employer_id and HoursRegistry.EmployeeID = @employee_id and HoursRegistry.Date between @start_date and @end_date and HoursRegistry.Date > @start_date and HoursRegistry.HoursApprovalStatus = 1
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
end catch
go

--Gets all the employees contracts' that work for a specified proyect in a specific date
create procedure GetEmployeesWorkingOnProjectToDate @project_name varchar(255), @employer_id varchar(10), @date date
as 
begin try
	if @date is null begin
	set @date = convert (date, getdate())
	end
	select EmployeeID, Schedule, ContractType, NetSalary, StartDate, ExpectedEndingDate, @date as PaymentDate
	from Contracts
	where ProjectName = @project_name and EmployerID = @employer_id and (dbo.DateIsInRange(@date, StartDate, RealEndedDate) = 1)
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
end catch
go

--Gets the employee id, voluntary deductions name's, start date and cost of all the voluntary deductions applicable of an specific employee in the specified proyect
create procedure GetEmployeeVoluntaryDeductionsToDate @project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @date date
as
begin try
	select Contracts.EmployeeID, Contracts.NetSalary, VoluntaryDeductionsStatus.VoluntaryDeductionName, VoluntaryDeductionsStatus.StartDate, VoluntaryDeductionsStatus.Cost
	from Contracts  left join VoluntaryDeductionsStatus on Contracts.EmployerID = VoluntaryDeductionsStatus.EmployerID and Contracts.EmployeeID = VoluntaryDeductionsStatus.EmployeeID and Contracts.ProjectName = VoluntaryDeductionsStatus.ProjectName
	where Contracts.ProjectName = @project_name and Contracts.EmployerID = @employer_id and Contracts.EmployeeID = @employee_id and (dbo.DateIsInRange(@date, VoluntaryDeductionsStatus.StartDate, VoluntaryDeductionsStatus.EndingDate) = 1) and (dbo.DateIsInRange(@date, Contracts.StartDate, Contracts.RealEndedDate) = 1)
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
end catch
go

--Gets the latest payment of an employee
create procedure GetLatestPayment @employee_id varchar(10), @employer_id varchar(10), @project_name varchar(255), @date date
as
begin try
	if @date is null begin
	set @date = convert (date, getdate())
	end
	select top 1 ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate
	from Payments
	where EmployeeID = @employee_id and EmployerID = @employer_id and ProjectName = @project_name and PaymentDate <= @date
	order by PaymentDate desc
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
end catch
go

--Gets the correct deductions applicable to a base employee
create procedure GetBasicMandatoryDeductions @salary float
as
begin try
	select MandatoryDeductionName, Percentage, Condition, dbo.GetRentDeductionAmount(@salary) as IncomeDeductionAmount
	from MandatoryDeductions
	where Condition = '0' or MandatoryDeductionName = dbo.GetRentDeduction(@salary)
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
end catch
go
--------------- Get employees working and not working in a specific project -----------------
CREATE PROCEDURE GetEmployeesWorkingOnProject
@projectName varchar(255), @employerID char(10)
AS
begin try
	SELECT [FirstName], [LastName], [LastName2], [Identification], [Email], [Country], [State], [City], [Phone]
	FROM Users 
		JOIN Contracts ON Users.Identification = Contracts.EmployeeID 
		JOIN Projects ON Contracts.ProjectName = Projects.ProjectName
	WHERE UserType = 1
		AND Projects.ProjectName = @projectName
		AND Contracts.EmployerID = @employerID
		AND Contracts.RealEndedDate IS NULL
	ORDER BY FirstName
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
end catch
go

CREATE PROCEDURE GetEmployeesNotWorkingOnProject
@projectName varchar(255), @employerID char(10)
AS
begin try
	SELECT [FirstName], [LastName], [LastName2], [Identification], [Email], [Country], [State], [City], [Phone]
	FROM Users
	WHERE UserType = 1
		AND Users.Identification NOT IN (
			SELECT Identification
			FROM Users 
				JOIN Contracts ON Users.Identification = Contracts.EmployeeID 
				JOIN Projects ON Contracts.ProjectName = Projects.ProjectName
			WHERE Projects.ProjectName = @projectName
				AND Contracts.EmployerID = @employerID
				AND Contracts.RealEndedDate IS NULL )
			ORDER BY FirstName
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
end catch
go

--------------- Get information to make report -----------------
create procedure GetAllEmployeePayments
@employeeID varchar(10)
as
begin try
	select c.ProjectName, c.EmployerID, c.EmployeeID, c.StartDate, c.ContractType, p.PaymentDate, c.NetSalary
	from Payments p
		join Contracts c on p.ProjectName = c.ProjectName and p.EmployerID = c.EmployerID and p.EmployeeID = c.EmployeeID and p.StartDate = c.StartDate
	where p.EmployeeID = @employeeID
	order by p.PaymentDate desc
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
end catch
go

create procedure GetVoluntaryDeductionsFromPayment
@project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @contract_date date, @payment_date date
as
begin try
	select i.VoluntaryDeductionName, i.ProjectName, i.EmployerID, i.StartDate, i.EmployeeID, s.Cost
	from IncludesVoluntaryDeductions i
		join VoluntaryDeductionsStatus s on i.VoluntaryDeductionName = s.VoluntaryDeductionName and i.ProjectName = s.ProjectName and i.EmployerID = s.EmployerID and i.StartDate = s.StartDate and i.EmployeeID = s.EmployeeID
	where @project_name = i.ProjectName and @employer_id = i.EmployerID and @employee_id = i.EmployeeID and @contract_date = i.ContractDate and @payment_date = i.PaymentDate
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
end catch
go

create procedure GetMandatoryDeductionsFromPayment
@project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @contract_date date, @payment_date date, @salary float
as
begin try
	select m.MandatoryDeductionName, m.Percentage, m.Condition, dbo.GetRentDeductionAmount(@salary) as IncomeDeductionAmount
	from IncludesMandatoryDeductions i
		join MandatoryDeductions m on i.MandatoryDeductionName = m.MandatoryDeductionName
	where @project_name = i.ProjectName and @employer_id = i.EmployerID and @employee_id = i.EmployeeID and @contract_date = i.ContractDate and @payment_date = i.PaymentDate
end try
begin catch
	select ERROR_MESSAGE() as ErrorMessage
end catch
go
