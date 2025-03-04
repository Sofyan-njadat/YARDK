-- Create Database
CREATE DATABASE YARDK_DB;

USE YARDK_DB;

-- Users Table
CREATE TABLE Users (
    ID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    Password NVARCHAR(100),
    Phone NVARCHAR(50),
    Role NVARCHAR(50) CHECK (Role IN ('User', 'Admin')),
    IsActive BIT,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Categories Table
CREATE TABLE Categories (
    ID INT PRIMARY KEY IDENTITY,
    CategoryName NVARCHAR(100)
);

-- Products Table
CREATE TABLE Products (
    ID INT PRIMARY KEY IDENTITY,
    ProductName NVARCHAR(100),
    Description NVARCHAR(MAX),
    Category NVARCHAR(100),
    Quantity INT,
    Price DECIMAL(18, 2),
    Condition NVARCHAR(50) CHECK (Condition IN ('New', 'Used', 'Scrap')),
    ImageUrl NVARCHAR(MAX),
    Status NVARCHAR(50) CHECK (Status IN ('Pending', 'Active', 'Sold')),
    SellerID INT FOREIGN KEY REFERENCES Users(ID),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Orders Table
CREATE TABLE Orders (
    ID INT PRIMARY KEY IDENTITY,
    BuyerID INT FOREIGN KEY REFERENCES Users(ID),
    ProductID INT FOREIGN KEY REFERENCES Products(ID),
    Quantity INT,
    TotalPrice DECIMAL(18, 2),
    Status NVARCHAR(50) CHECK (Status IN ('Pending', 'Approved', 'Cancelled', 'Completed')),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Payments Table
CREATE TABLE Payments (
    ID INT PRIMARY KEY IDENTITY,
    OrderID INT FOREIGN KEY REFERENCES Orders(ID),
    Amount DECIMAL(18, 2),
    PaymentMethod NVARCHAR(50) CHECK (PaymentMethod IN ('Visa', 'MasterCard')),
    PaymentStatus NVARCHAR(50) CHECK (PaymentStatus IN ('Pending', 'Paid', 'Failed')),
    PaymentDate DATETIME DEFAULT GETDATE()
);

-- Feedbacks Table
CREATE TABLE Feedbacks (
    ID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100),
    Email NVARCHAR(100),
    Subject NVARCHAR(100),
    Message NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Featured Ads Table
CREATE TABLE FeaturedAds (
    ID INT PRIMARY KEY IDENTITY,
    ProductID INT FOREIGN KEY REFERENCES Products(ID),
    SellerID INT FOREIGN KEY REFERENCES Users(ID),
    Price DECIMAL(18, 2),
    Duration INT,
    StartDate DATETIME,
    EndDate DATETIME,
    Status NVARCHAR(50) CHECK (Status IN ('Active', 'Expired'))
);

-- Indexes
CREATE INDEX IX_Products_SellerID ON Products(SellerID);
CREATE INDEX IX_Orders_BuyerID ON Orders(BuyerID);
CREATE INDEX IX_FeaturedAds_ProductID ON FeaturedAds(ProductID);

PRINT 'YARDK Database Created Successfully 🚀';
