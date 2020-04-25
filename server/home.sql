USE home;

CREATE TABLE  tblProperty (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(30) NOT NULL,
    Address VARCHAR(20),
    Country varchar(20),
    City VARCHAR(20),
    State VARCHAR(20),
    Zip VARCHAR(20),
    Deleted bit NOT NULL DEFAULT 0,
	CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CreatedBy INT NUll,
	UpdatedDate	TIMESTAMP NULL, 
	UpdatedBy INT NULL,
	DeletedDate TIMESTAMP NULL,
	DeletedBy INT NULL
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS `customers` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  active BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE  luUnitType (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(30) NOT NULL,
    Deleted bit NOT NULL DEFAULT 0,
	CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CreatedBy INT NUll,
	UpdatedDate	TIMESTAMP NULL, 
	UpdatedBy INT NULL,
	DeletedDate TIMESTAMP NULL,
	DeletedBy INT NULL
)  ENGINE=INNODB;



INSERT INTO luUnitType (Name) VALUES ('Bike');
INSERT INTO luUnitType (Name) VALUES ('Car');
INSERT INTO luUnitType (Name) VALUES ('Shop');
INSERT INTO luUnitType (Name) VALUES ('House');


CREATE TABLE  tblUnit (
    UnitID INT AUTO_INCREMENT PRIMARY KEY,
    UnitName VARCHAR(30) NOT NULL,
    UnitTypeID Int NOt NULL,
    FOREIGN KEY (UnitTypeID) REFERENCES luUnitType(ID),
    PropertyID Int NOt NULL,
    FOREIGN KEY (PropertyID) REFERENCES tblProperty(ID),
    AreaInSqft VARCHAR(20),
    Description VARCHAR(100),
    Deleted bit NOT NULL DEFAULT 0,
	CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CreatedBy INT NUll,
	UpdatedDate	TIMESTAMP NULL, 
	UpdatedBy INT NULL,
	DeletedDate TIMESTAMP NULL,
	DeletedBy INT NULL
)  ENGINE=INNODB;


CREATE TABLE home.tblTenant (
    TenantID INT AUTO_INCREMENT,
    TenantName VARCHAR(50) NOT NULL,
    Age int null,
    GenderID Int NOt NULL,
    FOREIGN KEY (GenderID) REFERENCES refgender(GenderID),
    OccupationID Int NOt NULL,
    FOREIGN KEY (OccupationID) REFERENCES refoccupation(OccupationID),
    DateOfBirth date null,
    ContactNumber VARCHAR(20),
    Email VARCHAR(100),
    Deleted bit NOT NULL DEFAULT 0,
	CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CreatedBy INT NUll,
	UpdatedDate	TIMESTAMP NULL, 
	UpdatedBy INT NULL,
	DeletedDate TIMESTAMP NULL,
	DeletedBy INT null,
	CONSTRAINT tblTenant_pk PRIMARY KEY (TenantID)
)  ENGINE=INNODB;


CREATE TABLE home.tblPayment (
    PaymenID INT AUTO_INCREMENT,
    BillingID INT NOT NULL,
    TenantID INT NOT NULL,
    UnitID INT NOT NULL,
    PaymentType INT NOT NULL,
    PaymentDate	TIMESTAMP NOT NULL, 
    Deleted bit NOT NULL DEFAULT 0,
	CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CreatedBy INT NUll,
	UpdatedDate	TIMESTAMP NULL, 
	UpdatedBy INT NULL,
	DeletedDate TIMESTAMP NULL,
	DeletedBy INT null,
	CONSTRAINT tblPayment_pk PRIMARY KEY (PaymenID)
)  ENGINE=INNODB;

