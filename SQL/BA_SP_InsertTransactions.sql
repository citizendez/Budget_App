DELIMITER $$
DROP PROCEDURE IF EXISTS InsertTransaction $$
CREATE PROCEDURE InsertTransaction(
Composite_Key VARCHAR(500)
, Trans_Date DATE
, Trans_Description VARCHAR(255)
, Trans_Type VARCHAR(255)
, Trans_Amount INT
, EC_ID INT
, BI_ID INT
, BC_ID INT)
BEGIN
    INSERT INTO Transactions(Composite_Key, Trans_Date, Trans_Description, 
		Trans_Type, Trans_Amount, EC_ID, BI_ID, BC_ID)
	VALUES(Composite_Key, Trans_Date, Trans_Description, Trans_Type, 
		Trans_Amount, EC_ID, BI_ID, BC_ID);
END;

CALL InsertTransaction('01-02-2021', '03-03-2021', 'something', 'food'
	, 100, 100, 0, 1, 2, 3
	);

SELECT * FROM Transactions;