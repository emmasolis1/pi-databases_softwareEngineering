--Checks if today's date is in a date range, returns 0 on false and 1 in true
create function TodayIsInRange(
	@start_date date,
	@end_date date
)
returns bit
as
begin
	declare @response as bit = 0
	if (@end_date is not null and cast (getdate() as date) between @start_date and @end_date) or (cast (getdate() as date) > @start_date and @end_date is null)
	begin
		set @response = 1
	end
	return @response
end
go
--Checks if a specified date is in a date range, returns 0 on false and 1 in true
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
--Gets the employee id, voluntary deductions name's, start date and cost of all the voluntary deductions applicable of an specific employee in the specified proyect
create procedure GetEmployeeVoluntaryDeductionsToday @project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10)
as
select Contracts.EmployeeID, Contracts.NetSalary, VoluntaryDeductionsStatus.VoluntaryDeductionName, VoluntaryDeductionsStatus.StartDate, VoluntaryDeductionsStatus.Cost
from Contracts  left join VoluntaryDeductionsStatus on Contracts.EmployerID = VoluntaryDeductionsStatus.EmployerID and Contracts.EmployeeID = VoluntaryDeductionsStatus.EmployeeID and Contracts.ProjectName = VoluntaryDeductionsStatus.ProjectName
where Contracts.ProjectName = @project_name and Contracts.EmployerID = @employer_id and Contracts.EmployeeID = @employee_id and (dbo.TodayIsInRange(VoluntaryDeductionsStatus.StartDate, VoluntaryDeductionsStatus.EndingDate) = 1) and (dbo.TodayIsInRange(Contracts.StartDate, Contracts.RealEndedDate) = 1)
go
--Prueba para cuando hay null
--declare @inicio as date = '2021-3-15'
--declare @final as date = null
--if (@final is not null and cast (getdate() as date) between @inicio and @final) or (cast (getdate() as date) > @inicio and @final is null)
--begin
--print 'Esta disponible'
--end
--else
--begin
--print 'No esta disponible'
--end

--Gets all the employees contracts' that work for a specified proyect
create procedure GetEmployeesWorkingOnProjectToday @project_name varchar(255), @employer_id varchar(10)
as 
select EmployeeID, Schedule, ContractType, NetSalary, StartDate, ExpectedEndingDate
from Contracts
where ProjectName = @project_name and EmployerID = @employer_id and (dbo.TodayIsInRange(StartDate, RealEndedDate) = 1)
go
--Gets the employee's hours resgistries on a project within a given date range
create procedure GetEmployeeHourRegistryInRange @project_name varchar(255), @employer_id varchar(10), @employee_id varchar(10), @start_date date, @end_date date
as
select Users.Identification, HoursRegistry.ProjectName, HoursRegistry.Date, HoursRegistry.NumberOfHours
from Users left join HoursRegistry on Users.Identification = HoursRegistry.EmployeeID
where HoursRegistry.ProjectName = @project_name and HoursRegistry.EmployerID = @employer_id and HoursRegistry.EmployeeID = @employee_id and (dbo.DateIsInRange(HoursRegistry.Date, @start_date, @end_date) = 1)

--select *
--from VoluntaryDeductionsStatus