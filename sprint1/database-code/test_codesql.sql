select *
from IncludesVoluntaryDeductions

select *
from VoluntaryDeductionsStatus

select *
from Payments
where ProjectName = 'TaBueno Planilla CR' and PaymentDate = '2022-6-21' and EmployeeID = '1234567895'

select *
from IncludesMandatoryDeductions

select *
from Contracts
where ProjectName = 'TaBueno Planilla CR'

delete from IncludesVoluntaryDeductions
where ProjectName = 'TaBueno Planilla CR'

delete from IncludesMandatoryDeductions
where ProjectName = 'TaBueno Planilla CR'

delete from Payments
where ProjectName = 'TaBueno Planilla CR' and PaymentDate = '2022-6-21' and EmployeeID = '1234567895'

delete from IncludesVoluntaryDeductions
where ProjectName = 'TaBueno Planilla CR' and PaymentDate = '2022-06-21'

delete from IncludesMandatoryDeductions
where ProjectName = 'TaBueno Planilla CR' and PaymentDate = '2022-06-21'

EXECUTE GetLatestPayment '1234567895', '0116800871', 'TaBueno Planilla CR', null

EXECUTE GetEmployeesWorkingOnProjectToDate 'TaBueno Planilla CR', '0116800871', null

EXECUTE GetEmployeeHourRegistryInRange 'TaBueno Planilla CR', '0116800871', '1234567895', '2020-06-19', '2022-06-21'

select *
from HoursRegistry

declare @date date = '2022-6-20'
print @date
declare @2date int = 20
print @date - @2date

if 3 between 1 and 3 begin
print 'Si'
end