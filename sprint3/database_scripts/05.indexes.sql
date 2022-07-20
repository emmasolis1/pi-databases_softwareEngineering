use TaBueno

-- Primer Indice
select FirstName, LastName, LastName2, Identification, Email, Country, State, City, Phone from Users where FirstName = 'Luis'

CREATE INDEX OrderByFirstName
ON dbo.Users (FirstName);

-- Segundo Indice
SELECT [FirstName], [LastName], [LastName2], [Identification], [Email], [Country], [State], [City], [Phone]
FROM Users
JOIN Contracts ON Users.Identification = Contracts.EmployeeID 
JOIN Projects ON Contracts.ProjectName = Projects.ProjectName
WHERE UserType = 1
AND Projects.ProjectName = 'TaBueno Planilla CR'
AND Contracts.EmployerID = '0116800871'
AND Contracts.RealEndedDate IS NULL
AND ContractType = 0

CREATE INDEX OrderByContractType
ON dbo.Contracts (ContractType);
