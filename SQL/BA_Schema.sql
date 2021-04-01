USE BudgetApp;

DROP TABLE IF EXISTS BudgetApp.ExpenseCat; 
CREATE TABLE IF NOT EXISTS BudgetApp.ExpenseCat (
  EC_ID INT(11) AUTO_INCREMENT,
  EC_Name VARCHAR(50),
  EC_Description VARCHAR(250),
  EC_AuditNotes VARCHAR(2000),
  PRIMARY KEY (EC_ID)); 
  
DROP TABLE IF EXISTS BudgetApp.BudgetProfile; 
CREATE TABLE IF NOT EXISTS BudgetApp.BudgetProfile  (
  BP_ID INT(11) AUTO_INCREMENT,
  BP_Type VARCHAR(250),
  BP_Description VARCHAR(250),
  BP_AuditNotes VARCHAR(2000),
  PRIMARY KEY (BP_ID)); 
  
DROP TABLE IF EXISTS BudgetApp.BudgetImpact; 
CREATE TABLE IF NOT EXISTS BudgetApp.BudgetImpact  (
  BI_ID INT(11) AUTO_INCREMENT,
  BI_Importance VARCHAR(250),
  BI_Description VARCHAR(250),
  BP_ID VARCHAR(250),
  BI_AuditNotes VARCHAR(2000),
  PRIMARY KEY (BI_ID)); 
  
DROP TABLE IF EXISTS BudgetApp.BillingCycle; 
CREATE TABLE IF NOT EXISTS BudgetApp.BillingCycle  (
  BC_ID INT(11) AUTO_INCREMENT,
  BC_Interval VARCHAR(250),
  BC_Description VARCHAR(250),
  BC_AuditNotes VARCHAR(2000),
  PRIMARY KEY (BC_ID)); 
  
DROP TABLE IF EXISTS BudgetApp.Categories; 
CREATE TABLE IF NOT EXISTS BudgetApp.Categories (
  Category_ID INT(11) AUTO_INCREMENT,
  CategoryName VARCHAR(250),
  CategoryDescription VARCHAR(250),
  CategoryAuditNotes VARCHAR(2000),
  PRIMARY KEY (Category_ID)); 
  
DROP TABLE IF EXISTS BudgetApp.Categories; 
CREATE TABLE IF NOT EXISTS BudgetApp.Categories (
  Category_ID INT(11) AUTO_INCREMENT,
  CategoryName VARCHAR(250),
  CategoryDescription VARCHAR(250),
  CategoryAuditNotes VARCHAR(2000),
  PRIMARY KEY (Category_ID)); 