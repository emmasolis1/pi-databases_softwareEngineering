------------------------- Oficial Ta' Bueno SQL Query -------------------------

--Employer
insert into Users(Identification, FirstName, LastName, Email, [Password], Country, State, City, UserType, Phone)
values ('1178202301', 'Daniel', 'Arias', 'daniel.arias@gmail.com', 'daniel','Costa Rica', 'Heredia', 'Heredia centro', 0, '89893302')

insert into Users(Identification, FirstName, LastName, Email, [Password], Country, State, City, UserType, Phone)
values ('1189203492', 'Leo', 'Mora', 'leo.mora@gmail.com', 'leomora','Costa Rica', 'San Jos�', 'Alajuelita', 0, '89893302')

--Employees
insert into Users(Identification, FirstName, LastName, Email, [Password], Country, State, City, UserType, Phone)
values ('2090182390', 'Arturo', 'Camacho', 'arturocamacho@gmail.com', 'password','Costa Rica', 'San Jos�', 'Curridabat', 1, '60892273')

insert into Users(Identification, FirstName, LastName, Email, [Password], Country, State, City, UserType, Phone)
values ('1727668927', 'Jeisson', 'Hidalgo', 'jeissonhidalgo@gmail.com', 'password','Costa Rica', 'San Jos�', 'San Pedro', 1, '86452390')

insert into Users(Identification, FirstName, LastName, Email, [Password], Country, State, City, UserType, Phone)
values ('6182833742', 'Edgar', 'Casasola', 'edgar.casasola@gmail.com', 'password','Costa Rica', 'San Jos�', 'Puriscal', 1, '70256721')

insert into Users(Identification, FirstName, LastName, Email, [Password], Country, State, City, UserType, Phone)
values ('402938192', 'Carlos', 'Vargas', 'carlos.vargas@gmail.com', 'password','Costa Rica', 'San Jos�', 'Sabanilla', 1, '70259021')

--Projects
insert into Projects( ProjectName , EmployerID, Budget, PaymentMethod, Description, MaxNumberOfBenefits, MaxBudgetForBenefits, IsActive)
values ('Small Space', '1178202301', '5000000', 'Monthly', 'Project for space stuff','5', '25000', 0)

insert into Projects( ProjectName , EmployerID, Budget, PaymentMethod, Description, MaxNumberOfBenefits, MaxBudgetForBenefits, IsActive)
values ('Blue Alpha', '1178202301', '4500000', 'Weekly', 'Water supplier','7', '40000', 0)

insert into Projects( ProjectName , EmployerID, Budget, PaymentMethod, Description, MaxNumberOfBenefits, MaxBudgetForBenefits, IsActive)
values ('AssistCard', '1189203492', '2000000', 'Monthly', 'Medical services','3', '30000', 0)


--Benefits 
insert into Benefits( BenefitName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Paid vacation', 'Small Space', '1178202301', '','25000', 0)
insert into Benefits( BenefitName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Transportation', 'Small Space', '1178202301', 'Transportation to work','40000', 0)
insert into Benefits( BenefitName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Retirement plan', 'Small Space', '1178202301', '','50000', 0)

insert into Benefits( BenefitName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Student Loan', 'Blue Alpha', '1178202301', 'For students','25000', 0)
insert into Benefits( BenefitName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Gym membership', 'Blue Alpha', '1178202301', 'All year long','40000', 0)
insert into Benefits( BenefitName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Mental health', 'Blue Alpha', '1178202301', 'Appointments with the psychologist','50000', 0)

insert into Benefits( BenefitName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Vision Care', 'AssistCard', '1189203492', 'Checkup appointment','25000', 0)
insert into Benefits( BenefitName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Social security', 'AssistCard', '1189203492', '','40000', 0)
insert into Benefits( BenefitName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Health Insurance', 'AssistCard', '1189203492', 'In case of accidents','50000', 0)

--Voluntary Deductions
insert into VoluntaryDeductions( VoluntaryDeductionName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Conape', 'Small Space', '1178202301', '','30000', 0)
insert into VoluntaryDeductions( VoluntaryDeductionName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Pizza for a homeless person', 'Small Space', '1178202301', 'Give a piece of pizza to a homeless person','45000', 0)
insert into VoluntaryDeductions( VoluntaryDeductionName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Animal rescue', 'Small Space', '1178202301', 'Around the world','60000', 0)

insert into VoluntaryDeductions( VoluntaryDeductionName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Green forest', 'Blue Alpha', '1178202301', 'Make forest green again','30000', 0)
insert into VoluntaryDeductions( VoluntaryDeductionName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Save a tree', 'Blue Alpha', '1178202301', 'Tree sowing','45000', 0)
insert into VoluntaryDeductions( VoluntaryDeductionName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Recycling campaigns', 'Blue Alpha', '1178202301', 'Advertising','60000', 0)

insert into VoluntaryDeductions( VoluntaryDeductionName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Trips', 'AssistCard', '1189203492', 'Company trip','30000', 0)
insert into VoluntaryDeductions( VoluntaryDeductionName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Emergency medications', 'AssistCard', '1189203492', '','45000', 0)
insert into VoluntaryDeductions( VoluntaryDeductionName , ProjectName, EmployerID, Description, Cost, IsActive)
values ('Newsletter subscription', 'AssistCard', '1189203492', 'Everyday news','60000', 0)

--Contracts
insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, ExpectedEndingDate, RealEndedDate, Position, NetSalary, ContractType)
values ('Small Space', '1178202301', '2090182390', '2022-07-03', '2023-07-03', null, 'Data Analyst', 850000, 0)
insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, ExpectedEndingDate, RealEndedDate, Position, NetSalary, ContractType)
values ('Small Space', '1178202301', '1727668927', '2022-07-03', '2023-07-03', null,'TI Operator', 700000, 1)
insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, ExpectedEndingDate, RealEndedDate, Position, NetSalary, ContractType)
values ('Small Space', '1178202301', '6182833742', '2022-07-03', '2023-07-03', null,'Software Developer', 600000, 3)
insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, ExpectedEndingDate, RealEndedDate, Position, NetSalary, ContractType)
values ('Small Space', '1178202301', '402938192', '2022-07-03', '2023-07-03', null,'Software Developer', 400000, 0)

insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, ExpectedEndingDate, RealEndedDate, Position, NetSalary, ContractType)
values ('Blue Alpha', '1178202301', '1727668927', '2022-07-03', '2023-07-03', null,'TI Operator', 400000, 1)
insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, ExpectedEndingDate, RealEndedDate, Position, NetSalary, ContractType)
values ('Blue Alpha', '1178202301', '6182833742', '2022-07-03', '2023-07-03', null,'Software Developer', 200000, 0)
insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, ExpectedEndingDate, RealEndedDate, Position, NetSalary, ContractType)
values ('Blue Alpha', '1178202301', '402938192', '2022-07-03', '2023-07-03', null,'Software Developer', 400000, 0)

insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, ExpectedEndingDate, RealEndedDate, Position, NetSalary, ContractType)
values ('AssistCard', '1189203492', '6182833742', '2022-07-03', '2023-07-03', null,'Software Developer', 900000, 0)
insert into Contracts(ProjectName, EmployerID, EmployeeID, StartDate, ExpectedEndingDate, RealEndedDate, Position, NetSalary, ContractType)
values ('AssistCard', '1189203492', '402938192', '2022-07-03', '2023-07-03', null,'Software Developer', 400000, 0)

--Payments
insert into Payments(ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate, NetSalary)
values ('Small Space', '1178202301', '2090182390', '2022-07-03', '2022-07-14', 850000)
insert into Payments(ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate, NetSalary)
values ('Small Space', '1178202301', '1727668927', '2022-07-03', '2022-07-14', 700000)
insert into Payments(ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate, NetSalary)
values ('Small Space', '1178202301', '6182833742', '2022-07-03', '2022-07-14', 600000)
insert into Payments(ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate, NetSalary)
values ('Small Space', '1178202301', '402938192', '2022-07-03', '2022-07-14', 400000)

insert into Payments(ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate, NetSalary)
values ('Blue Alpha', '1178202301', '1727668927', '2022-07-03', '2022-07-14', 400000)
insert into Payments(ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate, NetSalary)
values ('Blue Alpha', '1178202301', '6182833742', '2022-07-03', '2022-07-14', 200000)
insert into Payments(ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate, NetSalary)
values ('Blue Alpha', '1178202301', '402938192', '2022-07-03', '2022-07-14', 400000)

insert into Payments(ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate, NetSalary)
values ('AssistCard', '1189203492', '6182833742', '2022-07-03', '2022-07-14', 900000)
insert into Payments(ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate, NetSalary)
values ('AssistCard', '1189203492', '402938192', '2022-07-03', '2022-07-14', 400000)