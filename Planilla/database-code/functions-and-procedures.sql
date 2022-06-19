create function DateIsInRange(
	@date_check date,
	@start_date date,
	@end_date date
)
returns bit
as
begin
	declare @response as bit = 0
	if (@end_date is not null and @date_check between @start_date and @end_date) or (@date_check > @start_date and @end_date is null)
	begin
		set @response = 1
	end
	return @response
end
go
--Gets the employee's hours resgistries on a project within a given date range
create procedure GetEmployeeHourRegistryInRange @project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @start_date date, @end_date date
as
select Users.Identification, HoursRegistry.ProjectName, HoursRegistry.Date, HoursRegistry.NumberOfHours
from Users left join HoursRegistry on Users.Identification = HoursRegistry.EmployeeID
where HoursRegistry.ProjectName = @project_name and HoursRegistry.EmployerID = @employer_id and HoursRegistry.EmployeeID = @employee_id and (dbo.DateIsInRange(HoursRegistry.Date, @start_date, @end_date) = 1)
go
--Gets all the employees contracts' that work for a specified proyect in a specific date
alter procedure GetEmployeesWorkingOnProjectToDate @project_name varchar(255), @employer_id varchar(10), @date date
as 
if @date is null begin
set @date = convert (date, getdate())
end
select EmployeeID, Schedule, ContractType, NetSalary, StartDate, ExpectedEndingDate, @date as PaymentDate
from Contracts
where ProjectName = @project_name and EmployerID = @employer_id and (dbo.DateIsInRange(@date, StartDate, RealEndedDate) = 1)
go
--Gets the employee id, voluntary deductions name's, start date and cost of all the voluntary deductions applicable of an specific employee in the specified proyect
alter procedure GetEmployeeVoluntaryDeductionsToDate @project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @date date
as
select Contracts.EmployeeID, Contracts.NetSalary, VoluntaryDeductionsStatus.VoluntaryDeductionName, VoluntaryDeductionsStatus.StartDate, VoluntaryDeductionsStatus.Cost
from Contracts  left join VoluntaryDeductionsStatus on Contracts.EmployerID = VoluntaryDeductionsStatus.EmployerID and Contracts.EmployeeID = VoluntaryDeductionsStatus.EmployeeID and Contracts.ProjectName = VoluntaryDeductionsStatus.ProjectName
where Contracts.ProjectName = @project_name and Contracts.EmployerID = @employer_id and Contracts.EmployeeID = @employee_id and (dbo.DateIsInRange(@date, VoluntaryDeductionsStatus.StartDate, VoluntaryDeductionsStatus.EndingDate) = 1) and (dbo.DateIsInRange(@date, Contracts.StartDate, Contracts.RealEndedDate) = 1)
