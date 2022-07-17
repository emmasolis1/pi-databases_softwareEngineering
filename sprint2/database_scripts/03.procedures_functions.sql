------------------------- Oficial Ta' Bueno SQL Query -------------------------

--------------- Deleting (firing) an Employee --------------
create procedure delete_employee (@userID as char(10)) as 
begin 
    -- 1. Process this last payment (liquidation).

    -- 2. Make early finalization to employee's contract.
    update Contracts set RealEndedDate=(select CONVERT (Date, GETDATE())) where EmployeeID=@userID;

    -- 3. Set User as inactive
    update Users set UserType=3 where Identification=@userID;
end

--------------- Pay Salary to an Employee -----------------
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
select Users.Identification, HoursRegistry.ProjectName, HoursRegistry.Date, HoursRegistry.NumberOfHours
from Users join HoursRegistry on Users.Identification = HoursRegistry.EmployeeID
where HoursRegistry.ProjectName = @project_name and HoursRegistry.EmployerID = @employer_id and HoursRegistry.EmployeeID = @employee_id and HoursRegistry.Date between @start_date and @end_date and HoursRegistry.Date > @start_date
go

--Gets all the employees contracts' that work for a specified proyect in a specific date
create procedure GetEmployeesWorkingOnProjectToDate @project_name varchar(255), @employer_id varchar(10), @date date
as 
if @date is null begin
set @date = convert (date, getdate())
end
select EmployeeID, Schedule, ContractType, NetSalary, StartDate, ExpectedEndingDate, @date as PaymentDate
from Contracts
where ProjectName = @project_name and EmployerID = @employer_id and (dbo.DateIsInRange(@date, StartDate, RealEndedDate) = 1)
go

--Gets the employee id, voluntary deductions name's, start date and cost of all the voluntary deductions applicable of an specific employee in the specified proyect
create procedure GetEmployeeVoluntaryDeductionsToDate @project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @date date
as
select Contracts.EmployeeID, Contracts.NetSalary, VoluntaryDeductionsStatus.VoluntaryDeductionName, VoluntaryDeductionsStatus.StartDate, VoluntaryDeductionsStatus.Cost
from Contracts  left join VoluntaryDeductionsStatus on Contracts.EmployerID = VoluntaryDeductionsStatus.EmployerID and Contracts.EmployeeID = VoluntaryDeductionsStatus.EmployeeID and Contracts.ProjectName = VoluntaryDeductionsStatus.ProjectName
where Contracts.ProjectName = @project_name and Contracts.EmployerID = @employer_id and Contracts.EmployeeID = @employee_id and (dbo.DateIsInRange(@date, VoluntaryDeductionsStatus.StartDate, VoluntaryDeductionsStatus.EndingDate) = 1) and (dbo.DateIsInRange(@date, Contracts.StartDate, Contracts.RealEndedDate) = 1)
go

--Gets the latest payment of an employee
create procedure GetLatestPayment @employee_id varchar(10), @employer_id varchar(10), @project_name varchar(255), @date date
as
if @date is null begin
set @date = convert (date, getdate())
end
select top 1 ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate
from Payments
where EmployeeID = @employee_id and EmployerID = @employer_id and ProjectName = @project_name and PaymentDate <= @date
order by PaymentDate desc
go

--Gets the correct deductions applicable to a base employee
create procedure GetBasicMandatoryDeductions @salary float
as
select MandatoryDeductionName, Percentage, Condition, dbo.GetRentDeductionAmount(@salary) as IncomeDeductionAmount
from MandatoryDeductions
where Condition = '0' or MandatoryDeductionName = dbo.GetRentDeduction(@salary)

--------------- Get employees working and not working in a specific project -----------------
CREATE PROCEDURE GetEmployeesWorkingOnProject
@projectName varchar(255), @employerID char(10)
AS
SELECT [FirstName], [LastName], [LastName2], [Identification], [Email], [Country], [State], [City], [Phone]
FROM Users 
	JOIN Contracts ON Users.Identification = Contracts.EmployeeID 
	JOIN Projects ON Contracts.ProjectName = Projects.ProjectName
WHERE UserType = 1
	AND Projects.ProjectName = @projectName
	AND Contracts.EmployerID = @employerID
	AND Contracts.RealEndedDate IS NULL
ORDER BY FirstName

CREATE PROCEDURE GetEmployeesNotWorkingOnProject
@projectName varchar(255), @employerID char(10)
AS
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

