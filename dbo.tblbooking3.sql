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

