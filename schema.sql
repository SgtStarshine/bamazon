CREATE DATABASE bamazon;
USE bamazon;


-- ============================ First Table ============================

CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255) NOT NULL,
price DOUBLE(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

-- Seed Items into Database
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Eggs", "grocery", 1.99, 12),
  ("Milk", "grocery", 2.99, 24),
  ("PS4", "electronics", 199.99, 5),
  ("Xbox One X", "electronics", 179.99, 7),
  ("Nintendo Switch", "electronics", 399.99, 18),
  ("Bicycle", "sporting goods", 599.99, 2),
  ("Football", "sporting goods", 9.99, 49),
  ("Encyclopedia Eorzea", "books", 9.99, 69),
  ("Game of Thrones", "books", 19.99, 33),
  ("Whisper to the Black Candle", "books", 11.99, 6),
  ("Final Fantasy VII Advent Children ", "dvds", 13.99, 36),  
  ("The One", "dvds", 9.99, 21),
  ("Masters of War", "music", 11.55, 15);

-- View Database Entries
-- SELECT * FROM products;


-- ============================ Second Table ============================

CREATE TABLE departments(
department_id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR(255) NOT NULL,
overhead_costs DOUBLE(10,2) NOT NULL,
total_sales DOUBLE(10,2) NOT NULL,
PRIMARY KEY (department_id)
);

-- Seed departments into Database
INSERT INTO departments(department_name, overhead_costs, total_sales)
VALUES ("grocery", 10500.00, -10000.00),
  ("electronics", 25000.00, 0.00),
  ("sporting goods", 15000.00, 0.00),
  ("books", 5000.00, 0.00),
  ("dvds", 20000.00, 0.00),
  ("music", 7500.00, 0.00);