CREATE TABLE [dbo].[tblbooking] (
    [bid]             INT       IDENTITY (1, 1) NOT NULL,
    [cregid]          VARCHAR (11) NOT NULL,
    [uemail]          VARCHAR (50) NOT NULL,
    [bpickupcity]     VARCHAR (50) NOT NULL,
    [bpickupaddress]  VARCHAR (50) NOT NULL,
    [bpickuplandmark] VARCHAR (50) NULL,
    [bpickupdate]     VARCHAR (50) NOT NULL,
    [bpickuptime]     VARCHAR (10) NOT NULL,
    PRIMARY KEY CLUSTERED ([bid] ASC)
);

CREATE TABLE [dbo].[tblcars] (
    [cregid]     VARCHAR (11) NOT NULL,
    [cmanf]      VARCHAR (50) NOT NULL,
    [cmodel]     VARCHAR (50) NOT NULL,
    [cseat]      INT          NOT NULL,
    [crateperkm] FLOAT (53)   NOT NULL,
    [crateperhr] FLOAT (53)   NOT NULL,
    [cminhr]     INT          NOT NULL,
    [cacornonac] VARCHAR (10) NOT NULL,
    [cphotolink] VARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([cregid] ASC)
);

CREATE TABLE [dbo].[tblusers] (
    [uname]     VARCHAR (50) NOT NULL,
    [umobile]   VARCHAR (10) NOT NULL,
    [uemail]    VARCHAR (50) NOT NULL,
    [uaddress]  VARCHAR (50) NOT NULL,
    [upassword] VARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([uemail] ASC)
);