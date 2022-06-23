------------------------- Oficial Ta' Bueno SQL Query -------------------------
use TaBueno

--------------- Creating Tables --------------
create table Users (
    Identification      char(10)        PRIMARY KEY,
    FirstName           varchar(50)     NOT NULL,
    LastName            varchar(50)     NOT NULL,
    LastName2           varchar(50)     NULL,
    Email               varchar(255)    NOT NULL,
    Password            varchar(255)    NOT NULL,
    Country             varchar(50)     NULL,
    State               varchar(50)     NULL,
    City                varchar(50)     NULL,
    ZipCode             char(5)         NULL,
    Address             varchar(255)    NULL,
    Phone               varchar(17)     NULL,
    UserType            tinyint         NOT NULL
);

create table Phones (
    Identification     char(10)        NOT NULL,  
    Phone              varchar(17)     NOT NULL,
    primary key (Identification, Phone),
    foreign key (Identification) references Users
);

create table Projects (
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    Budget                  float               NULL,
    PaymentMethod           varchar(50)         NULL,
    Description             varchar(255)        NULL,
    MaxNumberOfBenefits     int                 NOT NULL,
    MaxBudgetForBenefits    float               NOT NULL,
    primary key (ProjectName, EmployerID),
    FOREIGN key (EmployerID) REFERENCES Users 
);

create table HoursRegistry (
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    Date                    date                NOT NULL,
    NumberOfHours           decimal(4, 1)     NOT NULL,
    primary key (ProjectName, EmployerID, EmployeeID, Date),
    foreign key (ProjectName, EmployerID) references Projects,
    foreign key (EmployeeID) references Users
);

create table Benefits (
    BenefitName             varchar(255)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    Description             varchar(255)        NULL,
    Cost                    float               NULL,
    primary key (BenefitName, ProjectName, EmployerID),
    foreign key (ProjectName, EmployerID) REFERENCES Projects
);

create table BenefitsStatus (
    BenefitName             varchar(255)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    EndDate                 date                NULL,
    primary key (BenefitName, ProjectName, EmployerID, EmployeeID, StartDate),
    foreign key (BenefitName, ProjectName, EmployerID) references Benefits,
    foreign key (EmployeeID) references Users
);

create table Contracts (
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
    PRIMARY key (ProjectName, EmployerID, EmployeeID, StartDate),
    foreign key (ProjectName, EmployerID) references Projects,
    foreign key (EmployeeID) references Users
);

create table Payments (
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    PaymentDate             date                NOT NULL,
    NetSalary               float,
    primary key (ProjectName, EmployerID, EmployeeID, StartDate, PaymentDate),
    foreign key (ProjectName, EmployerID, EmployeeID, StartDate) references Contracts
);

create table AppearsIn (
    BenefitName             varchar(255)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    ContractDate            date                NOT NULL,
    PaymentDate             date                NOT NULL,
    primary key (BenefitName, ProjectName, EmployerID, EmployeeID, StartDate, ContractDate, PaymentDate),
    foreign key (BenefitName, ProjectName, EmployerID, EmployeeID, StartDate) references BenefitsStatus,
    foreign key (ProjectName, EmployerID, EmployeeID, ContractDate, PaymentDate) references Payments
);

create table MandatoryDeductions (
    MandatoryDeductionName      varchar(128)      NOT NULL,
    Percentage                  decimal           NOT NULL,
    Description                 varchar(255)      NULL,
    primary key (MandatoryDeductionName)
);

create table IncludesMandatoryDeductions (
    MandatoryDeductionName  varchar(128)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    ContractDate            date                NOT NULL,
    PaymentDate             date                NOT NULL,
    primary key (MandatoryDeductionName, ProjectName, EmployerID, EmployeeID, ContractDate, PaymentDate),
    foreign key (MandatoryDeductionName) references MandatoryDeductions,
    foreign key (ProjectName, EmployerID, EmployeeID, ContractDate, PaymentDate) references Payments
);

create table VoluntaryDeductions (
    VoluntaryDeductionName  varchar(128)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    Description             varchar(255)        NULL,
    primary key (VoluntaryDeductionName, ProjectName, EmployerID),
    foreign key (ProjectName, EmployerID) references Projects
);

create table VoluntaryDeductionsStatus (
    VoluntaryDeductionName  varchar(128)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    EndingDate              date                NULL,
    Cost                    float               NULL,
    primary key (VoluntaryDeductionName, ProjectName, EmployerID, EmployeeID, StartDate),
    foreign key (VoluntaryDeductionName, ProjectName, EmployerID) references VoluntaryDeductions,
    foreign key (EmployeeID) references Users
);

create table IncludesVoluntaryDeductions (
    VoluntaryDeductionName  varchar(128)        NOT NULL,
    ProjectName             varchar(255)        NOT NULL,
    EmployerID              char(10)            NOT NULL,
    EmployeeID              char(10)            NOT NULL,
    StartDate               date                NOT NULL,
    ContractDate            date                NOT NULL,
    PaymentDate             date                NOT NULL,
    primary key (VoluntaryDeductionName, ProjectName, EmployerID, EmployeeID, StartDate, ContractDate, PaymentDate),
    foreign key (VoluntaryDeductionName, ProjectName, EmployerID, EmployeeID, StartDate) references VoluntaryDeductionsStatus,
    foreign key (ProjectName, EmployerID, EmployeeID, ContractDate, PaymentDate) references Payments
);
