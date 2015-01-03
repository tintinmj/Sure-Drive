CREATE TABLE [dbo].[tblbooking] (
    [bid]          BIGINT       IDENTITY (1, 1) NOT NULL,
    [cregid]     VARCHAR (50) NOT NULL,
    [uemail]     VARCHAR (50) NOT NULL,
    [bpickup]      VARCHAR (50) NOT NULL,
    [bdestination] VARCHAR (50) NOT NULL,
    [bpickuptime]  DATETIME     NOT NULL,
    PRIMARY KEY CLUSTERED ([bid] ASC)
);

