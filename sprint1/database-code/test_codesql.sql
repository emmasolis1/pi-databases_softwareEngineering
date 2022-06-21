select *
from IncludesVoluntaryDeductions

select *
from VoluntaryDeductionsStatus

select *
from Payments

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
where ProjectName = 'TaBueno Planilla CR'

EXECUTE GetLatestPayment '1234567895', '0116800871', 'TaBueno Planilla CR', null

declare @date date = '2022-6-20'
print @date
declare @2date int = 20
print @date - @2date

if 3 between 1 and 3 begin
print 'Si'
end