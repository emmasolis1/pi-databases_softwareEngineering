--------------- Inserting Values --------------

-- Usuarios
insert into Users values ('1234567890', 'Diego', 'Chinchilla', 'Otarola', 'diego.chinchilla@gmail.com', 'password', 'United States', 'New York', 'Manhattan', '10101', '374 Washington St.', 0);
insert into Users values ('1234567899', 'Pedro', 'Garcia', 'Murillo', 'pedro.garcia@gmail.com', 'password', 'Costa Rica', 'San Jose', 'Curridabat', '10303', 'Frente al Walmart', 1);
insert into Users values ('1234567898', 'Maria', 'Sanchez', 'Perez', 'maria.sanchez@gmail.com', 'password', 'Costa Rica', 'San Jose', 'Hatillo', '10507', 'Frente a la Delegacion', 1);
insert into Users(Identification, FirstName, LastName, Email, [Password], UserType, Phone)
values ('1234567893', 'Javier', 'Molina', 'javier.molina@gmail.com', 'password', 1, '83445223')
insert into Users(Identification, FirstName, LastName, Email, [Password], UserType, Phone)
values ('1234567896', 'Christian', 'Rojas', 'christian.rojas@gmail.com', 'password', 1, '88635333')
insert into Users(Identification, FirstName, LastName, Email, [Password], UserType, Phone)
values ('1234567895', 'Luis', 'Bolaños', 'luis.bolanos@gmail.com', 'password', 1, '89634252')
insert into Users(Identification, FirstName, LastName, Email, [Password], UserType, Phone)
values ('1234567898', 'Paula', 'Monge', 'paula.monge@gmail.com', 'password', 1, '70324542')
insert into Users(Identification, FirstName, LastName, Email, [Password], UserType, Phone)
values ('1234567890', 'Pablo', 'Sauma', 'pablo.sauma@gmail.com', 'password', 1, '82463744')
insert into Users(Identification, FirstName, LastName, Email, [Password], UserType, Phone)
values ('1234567889', 'Carlos', 'Vargas', 'carlos.vargas@gmail.com', 'password', 1, '87364374')
insert into Users(Identification, FirstName, LastName, Email, [Password], UserType, Phone)
values ('1234567888', 'Jeisson', 'Hidalgo', 'jeisson.hidalgo@gmail.com', 'password', 1, '82664544')
insert into Users(Identification, FirstName, LastName, Email, [Password], UserType, Phone)
values ('1234567887', 'Adrian', 'Lara', 'adrian.lara@gmail.com', 'password', 1, '86455333')
insert into Users(Identification, FirstName, LastName, Email, [Password], UserType, Phone)
values ('1234567886', 'Arturo', 'Camacho', 'arturo.camacho@gmail.com', 'password', 1, '89766234')

insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, Position, NetSalary, ContractType)
values ('TaBueno Planilla CR', '0116800871', '1234567892', (SELECT CONVERT (Date, GETDATE())), 'Software Engineer', 10000, 0)
insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, Position, NetSalary, ContractType)
values ('La Casita Feliz', '0116800871', '1234567897', (SELECT CONVERT (Date, GETDATE())), 'TI Operator', 8000, 0)
insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, Position, NetSalary, ContractType)
values ('Planilla', '1234567899', '1234567899', (SELECT CONVERT (Date, GETDATE())), 'Software Developer', 6000, 0)

delete from Users where Identification='0116800871'
delete from Users where Identification='1234567890'
delete from Users where Identification='1234567893'
delete from Users where Identification='1234567894'
delete from Users where Identification='1234567896'
delete from Users where Identification='1234567898'
delete from Users where Identification='1234567899'

delete from Projects where EmployerID='0116800871'

select * from Projects

alter table Users
add Phone varchar(17)

drop table Phones

-- Proyectos
insert into Proyecto values ('Sistema de Planilla CR', '1234567890', '0987654321', 0)

-- Deducciones Obligatorias
insert into DeduccionesObligatorias values ('Caja Costarricense de Seguro Social', 0.10);
insert into DeduccionesObligatorias values ('Impuesto al Valor Agregado', 0.05);
Insert into DeduccionesObligatorias Values ('Enfermedad y Maternidad', 0.055)
Insert into DeduccionesObligatorias Values ('Invalidez, Vejez y Muerte', 0.0384)
Insert into DeduccionesObligatorias Values ('Aporte Trabajador', 0.1)
Insert into DeduccionesObligatorias Values ('Bajo 863000', 0)
Insert into DeduccionesObligatorias Values ('Hasta 1267000', 0.1)
Insert into DeduccionesObligatorias Values ('Hasta 2223000', 0.15)
Insert into DeduccionesObligatorias Values ('Hasta 4445000', 0.20)
Insert into DeduccionesObligatorias Values ('Sobre 4445000', 0.25)

-- Beneficios
insert into Beneficios values ('Plan Dental', '1234567890', 'Sistema de Planilla CR')

--------------- Consulting Values --------------
select * from Usuario
select * from Proyecto
select * from Beneficios
select * from DeduccionesObligatorias
