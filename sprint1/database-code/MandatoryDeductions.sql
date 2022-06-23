alter table MandatoryDeductions
add Condition varchar(30);

alter table MandatoryDeductions
alter column Percentage decimal(9,3);

select *
from MandatoryDeductions

Insert into MandatoryDeductions Values ('Renta I', 10, 'Impuesto de renta', ' between 842000 and 1236000')

Insert into MandatoryDeductions Values ('Renta II', 15, 'Impuesto de renta', ' between 1236001 and 2169000')

Insert into MandatoryDeductions Values ('Renta III', 20, 'Impuesto de renta', ' between 2169001 and 4337000')

Insert into MandatoryDeductions Values ('Renta IV', 25, 'Impuesto de renta', ' > 4337000')

Insert into MandatoryDeductions Values ('Seguro de Salud, Caja Costarricense de Seguro Social (C.C.S.S.)', 5.5, 'Impuesto C.C.S.S.', '0')

Insert into MandatoryDeductions Values ('Seguro de Pensiones Invalidez, Vejez y Muerte (I.V.M.)', 3.5, 'Impuesto I.V.M.', '0')

Insert into MandatoryDeductions Values ('Ley Protección al Trabajador', 1, 'Impuesto Protección al Trabajador', '0')
