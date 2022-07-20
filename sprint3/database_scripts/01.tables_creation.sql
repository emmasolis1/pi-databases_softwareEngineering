------------------------- Oficial Ta' Bueno SQL Query -------------------------
USE TaBueno

-- set isolation level
set transaction isolation level repeatable read;

--------------- Creating Tables --------------
CREATE TABLE Users (
    Identification          char(10)            NOT NULL,
    FirstName               varchar(50)         NOT NULL,
    LastName                varchar(50)         NOT NULL,
    LastName2               varchar(50)         NULL,
    Email                   varchar(255)        NOT NULL,
    Password                varchar(255)        NOT NULL,
    Country                 varchar(50)         NULL,
    State                   varchar(50)         NULL,
    City                    varchar(50)         NULL,
    ZipCode                 char(5)             NULL,
    Address                 varchar(255)        NULL,
    Phone                   varchar(17)         NOT NULL,
    UserType                tinyint             NOT NULL,
    PRIMARY KEY (Identification)
);

CREATE TABLE Projects (
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    Budget                  float               NULL,
    PaymentMethod           varchar(10)         NOT NULL,
    Description             varchar(255)        NULL,
    MaxNumberOfBenefits     int                 NULL,
    MaxBudgetForBenefits    float               NULL,
    IsActive                tinyint             NOT NULL,
    PRIMARY KEY (ProjectName, EmployerID),
    FOREIGN KEY (EmployerID) REFERENCES Users 
);

CREATE TABLE HoursRegistry (
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    Date                    date                NOT NULL,
    NumberOfHours           decimal(4, 1)       NOT NULL,
    HoursApprovalStatus     tinyint             NOT NULL,
    PRIMARY KEY (ProjectName, EmployerID, EmployeeID, Date),
    FOREIGN KEY (ProjectName, EmployerID) REFERENCES Projects,
    FOREIGN KEY (EmployeeID) REFERENCES Users
);

CREATE TABLE Benefits (
    BenefitName             varchar(255)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    Description             varchar(255)        NULL,
    Cost                    float               NOT NULL,
    IsActive                tinyint             NOT NULL,
    PRIMARY KEY (BenefitName, ProjectName, EmployerID),
    FOREIGN KEY (ProjectName, EmployerID) REFERENCES Projects
);

CREATE TABLE BenefitsStatus (
    BenefitName             varchar(255)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    EndDate                 date                NULL,
    PRIMARY KEY (BenefitName, ProjectName, EmployerID, EmployeeID, StartDate),
    FOREIGN KEY (BenefitName, ProjectName, EmployerID) REFERENCES Benefits,
    FOREIGN KEY (EmployeeID) REFERENCES Users
);

CREATE TABLE Contracts (
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    ExpectedEndingDate      date                NULL,
    RealEndedDate           date                NULL,
    Position                varchar(128)        NOT NULL,
    Schedule                varchar(255)        NULL,
    NetSalary               float               NOT NULL,
    ContractType            tinyint             NOT NULL,
    PRIMARY KEY (ProjectName, EmployerID, EmployeeID, StartDate),
    FOREIGN KEY (ProjectName, EmployerID) REFERENCES Projects,
    FOREIGN KEY (EmployeeID) REFERENCES Users
);

CREATE TABLE Payments (
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    PaymentDate             date                NOT NULL,
    NetSalary               float               NULL,
    PRIMARY KEY (ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate),
    FOREIGN KEY (ProjectName, EmployerID, EmployeeID, StartDate) REFERENCES Contracts
);

CREATE TABLE AppearsIn (
    BenefitName             varchar(255)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    ContractDate            date                NOT NULL,
    PaymentDate             date                NOT NULL,
    PRIMARY KEY (BenefitName, ProjectName, EmployerID, EmployeeID, StartDate, ContractDate, PaymentDate),
    FOREIGN KEY (BenefitName, ProjectName, EmployerID, EmployeeID, StartDate) REFERENCES BenefitsStatus,
    FOREIGN KEY (ProjectName, EmployerID, EmployeeID, ContractDate, PaymentDate) REFERENCES Payments
);

CREATE TABLE MandatoryDeductions (
    MandatoryDeductionName  varchar(128)        NOT NULL,
    Percentage              decimal(9, 3)       NOT NULL,
    Description             varchar(255)        NULL,
    Condition               varchar(30)         NULL,
    PRIMARY KEY (MandatoryDeductionName)
);

CREATE TABLE IncludesMandatoryDeductions (
    MandatoryDeductionName  varchar(128)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    ContractDate            date                NOT NULL,
    PaymentDate             date                NOT NULL,
    PRIMARY KEY (MandatoryDeductionName, ProjectName, EmployerID, EmployeeID, ContractDate, PaymentDate),
    FOREIGN KEY (MandatoryDeductionName) REFERENCES MandatoryDeductions,
    FOREIGN KEY (ProjectName, EmployerID, EmployeeID, ContractDate, PaymentDate) REFERENCES Payments
);

CREATE TABLE VoluntaryDeductions (
    VoluntaryDeductionName  varchar(128)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    Description             varchar(255)        NULL,
    Cost                    float               NULL,
    IsActive                tinyint             NOT NULL,
    PRIMARY KEY (VoluntaryDeductionName, ProjectName, EmployerID),
    FOREIGN KEY (ProjectName, EmployerID) REFERENCES Projects
);

CREATE TABLE VoluntaryDeductionsStatus (
    VoluntaryDeductionName  varchar(128)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    EndingDate              date                NULL,
    Cost                    float               NULL,
    PRIMARY KEY (VoluntaryDeductionName, ProjectName, EmployerID, EmployeeID, StartDate),
    FOREIGN KEY (VoluntaryDeductionName, ProjectName, EmployerID) REFERENCES VoluntaryDeductions,
    FOREIGN KEY (EmployeeID) REFERENCES Users
);

CREATE TABLE IncludesVoluntaryDeductions (
    VoluntaryDeductionName  varchar(128)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    ContractDate            date                NOT NULL,
    PaymentDate             date                NOT NULL,
    PRIMARY KEY (VoluntaryDeductionName, ProjectName, EmployerID, EmployeeID, StartDate, ContractDate, PaymentDate),
    FOREIGN KEY (VoluntaryDeductionName, ProjectName, EmployerID, EmployeeID, StartDate) REFERENCES VoluntaryDeductionsStatus,
    FOREIGN KEY (ProjectName, EmployerID, EmployeeID, ContractDate, PaymentDate) REFERENCES Payments
);
