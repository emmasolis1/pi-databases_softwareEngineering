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
		set @rent_deduction = 'Renta I'
	end
	else if @salary between 1236000 and 2169000 begin
		set @rent_deduction = 'Renta II'
	end
	else if @salary between 2169000 and 4337000 begin
		set @rent_deduction = 'Renta III'
	end
	else if @salary > 4337000 begin
		set @rent_deduction = 'Renta IV'
	end
	return @rent_deduction
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
where HoursRegistry.ProjectName = @project_name and HoursRegistry.EmployerID = @employer_id and HoursRegistry.EmployeeID = @employee_id and HoursRegistry.Date between @start_date and @end_date and HoursRegistry.Date > @start_date and HourRegistry.HoursApprovalStatus = 1
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
select MandatoryDeductionName, Percentage
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

--------------- Get information to make report -----------------
create procedure GetAllEmployeePayments
@employeeID varchar(10)
as
select c.ProjectName, c.EmployerID, c.EmployeeID, c.StartDate, c.ContractType, p.PaymentDate, c.NetSalary
from Payments p
	join Contracts c on p.ProjectName = c.ProjectName and p.EmployerID = c.EmployerID and p.EmployeeID = c.EmployeeID and p.StartDate = c.StartDate
where p.EmployeeID = @employeeID
order by p.PaymentDate desc
go

create procedure GetVoluntaryDeductionsFromPayment
@project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @contract_date date, @payment_date date
as
select i.VoluntaryDeductionName, i.ProjectName, i.EmployerID, i.StartDate, i.EmployeeID, s.Cost
from IncludesVoluntaryDeductions i
	join VoluntaryDeductionsStatus s on i.VoluntaryDeductionName = s.VoluntaryDeductionName and i.ProjectName = s.ProjectName and i.EmployerID = s.EmployerID and i.StartDate = s.StartDate and i.EmployeeID = s.EmployeeID
where @project_name = i.ProjectName and @employer_id = i.EmployerID and @employee_id = i.EmployeeID and @contract_date = i.ContractDate and @payment_date = i.PaymentDate
go

create procedure GetMandatoryDeductionsFromPayment
@project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @contract_date date, @payment_date date, @salary float
as
select m.MandatoryDeductionName, m.Percentage, m.Condition, GetRentDeductionAmount(@salary) as IncomeDeductionAmount
from IncludesMandatoryDeductions i
	join MandatoryDeductions m on i.MandatoryDeductionName = m.MandatoryDeductionName
where @project_name = i.ProjectName and @employer_id = i.EmployerID and @employee_id = i.EmployeeID and @contract_date = i.ContractDate and @payment_date = i.PaymentDate
go
