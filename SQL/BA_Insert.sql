INSERT INTO BudgetProfile(BP_Type, BP_Description)
VALUES('Nuclear No Save', 'No Restrictions, Spend it if you got it or even if you do not'),
('Moderate Save', 'Save money with little restriction on spending'),
('Strict Save', 'Unemployed or Need to save alot of money');

INSERT INTO BillingCycle(BC_Interval, BC_Description)
VALUES('Weekly', 'expense occurs  weekly'),
('Monthly', 'expense occurs  monthly'),
('Quartly', 'expense occurs  quarterly'),
('Yearly', 'expense occures yearly'),
('Non Fixed', 'expense is not reoccurring');
 

Select * from BillingCycle;