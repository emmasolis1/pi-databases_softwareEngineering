------------------------- Oficial Ta' Bueno SQL Query -------------------------
use TaBueno

--------------- Creating Tables --------------
-- Entidad: Usuario
create table Usuario 
    (Cedula         char(10)		    NOT NULL, 
    Contrasena      varchar(50)         NOT NULL,
    Nombre			varchar(15)         NOT NULL,
    Apellido1       varchar(15)         NOT NULL,
    Apellido2       varchar(15)         NOT NULL,
    Telefono        int					NOT NULL,
    TipoUsuario		tinyint             NOT NULL,
    Provincia       varchar(15)         NOT NULL,
    Canton			varchar(15)         NOT NULL,
    CodigoPostal    char(5)				NOT NULL,
	primary key (Cedula)
);

-- Entidad: Proyecto
create table Proyecto
    (nombre             varchar(200)        not null,
    cedulaEmpleador     char(10)            not null,
    presupuesto         float,
    modalidadPago       varchar(50),
    primary key (nombre, cedulaEmpleador),
    foreign key (cedulaEmpleador) references Usuario
);

-- Entidad: Deducciones Obligatorias
create table DeduccionesObligatorias
    (nombre             varchar(100)        not null,
    porcentaje          float       
    primary key (nombre)
);

-- Relacion: TrabajaEn
create table TrabajaEn
    (nombreProyecto         varchar(200)        not null,
    cedulaEmpleador         char(10)            not null,
    cedulaEmpleado          char(10)            not null,
    registroHoras           INT,
    primary key (nombreProyecto, cedulaEmpleador, cedulaEmpleado),
    foreign key (nombreProyecto, cedulaEmpleador) references Proyecto
);

-- Entidad: Beneficios
create table Beneficios
    (nombreBeneficio        varchar(200)        not null,
    cedulaEmpleador         char(10)            not null,
    nombreProyecto          varchar(200)        not null,
    primary key (nombreBeneficio, cedulaEmpleador, nombreProyecto),
    foreign key (nombreProyecto, cedulaEmpleador) references Proyecto
);

-- Entidad: Pago
create table Pago
    (cedulaRecibe           char(10)            not null,
    fecha                   date                not null,
    nombreProyecto          varchar(200)        not null,
    cedulaEmpleador         char(10)            not null,
    salarioBruto            float,
    tipoPago                varchar(50),
    primary key (cedulaRecibe, fecha),
    foreign key (nombreProyecto, cedulaEmpleador) references Proyecto
);

-- Relacion: IncluyeDeduccionObligatoria
create table IncluyeDeduccionObligatoria
    (cedulaEmpleado                 char(10)            not null,
    fechaPago                       date                not null,
    nombreDeduccionObligatoria      varchar(100)        not null,
    primary key (cedulaEmpleado, fechaPago, nombreDeduccionObligatoria),
    foreign key (cedulaEmpleado, fechaPago) references Pago,
    foreign key (nombreDeduccionObligatoria) references DeduccionesObligatorias
);

-- Entidad: Contrato
create table Contrato
    (nombreProyecto         varchar(200)        not null,
    cedulaEmpleador         char(10)            not null,
    cedulaEmpleado          char(10)            not null,
    fechaInicio             date                not null,
    puesto                  varchar(100)        not null,
    fechaFinalizacion       date,
    jornadaLaboral          varchar(200),
    primary key (nombreProyecto, cedulaEmpleador, cedulaEmpleado, fechaInicio),
    foreign key (nombreProyecto, cedulaEmpleador) references Proyecto,
    foreign key (cedulaEmpleado) references Usuario
);

-- Entidad: EstadoBeneficio
create table EstadoBeneficio
    (nombreBeneficio        varchar(200)        not null,
    cedulaEmpleador         char(10)            not null,
    nombreProyecto          varchar(200)        not null,
    fechaInicio             date,
    fechaFinalizacion       date,
    primary key (nombreBeneficio, cedulaEmpleador, nombreProyecto, fechaInicio),
    foreign key (nombreBeneficio, cedulaEmpleador, nombreProyecto) references Beneficios
);

-- Relacion: ApareceEn
create table ApareceEn
    (nombreBeneficio        varchar(200)        not null,
    cedulaEmpleador         char(10)            not null,
    nombreProyecto          varchar(200)        not null,
    fechaInicio             date,
    cedulaRecibePago        char(10),
    fechaPago               date,
    primary key (nombreBeneficio, cedulaEmpleador, nombreProyecto, fechaInicio, cedulaRecibePago, fechaPago),
    foreign key (nombreBeneficio, cedulaEmpleador, nombreProyecto, fechaInicio) references EstadoBeneficio
);

-- Entidad: DeduccionesVoluntarias
create table DeduccionesVoluntarias
    (nombre                 varchar(100)        not null,
    primary key (nombre)
);

-- Entidad: EstadoDeduccionVoluntaria
create table EstadoDeduccionVoluntaria
    (nombreDeduccion        varchar(100)        not null,
    fechaInicial            date                not null,
    fechaFinalizacion       date,
    monto                   float               not null,
    nombreProyecto          varchar(200)        not null,
    cedulaEmpleador         char(10)            not null,
    primary key (nombreDeduccion, fechaInicial),
    foreign key (nombreProyecto, cedulaEmpleador) references Proyecto
);

-- Relacion: IncluyeDeduccionVoluntaria
create table IncluyeDeduccionVoluntaria
    (nombreDeduccion        varchar(100)        not null,
    fechaInicialDeduccion   date                not null,
    fechaPago               date                not null,
    cedulaRecibePago        char(10)            not null,
    primary key (nombreDeduccion, fechaInicialDeduccion, fechaPago, cedulaRecibePago),
    foreign key (nombreDeduccion, fechaInicialDeduccion) references EstadoDeduccionVoluntaria,
    foreign key (cedulaRecibePago, fechaPago) references Pago
);


--------------- Inserting Values --------------
-- Usuarios
insert into Usuario values ('1234567890', 'password', 'Diego', 'Chinchilla', 'Otarola', '76343352', 0, 'San Jose', 'Hatillo', '10101');
insert into Usuario values ('0987654321', 'password', 'Jan', 'Murillo', 'Barquero', '23213433', 1, 'Alajuela', 'Alajuela', '20201');
insert into Usuario values ('2365123132', 'password', 'Gabriel', 'Zuniga', 'Orozco', '35435344', 1, 'Heredia', 'Heredia', '30301');

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
