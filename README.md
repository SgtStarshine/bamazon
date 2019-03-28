#Bamazon

### Overview
A Node.js &amp; MySQL digital storefront. This is a command line Node app that mimics an online retailer.


### Node.js

- `BamazonCustomer.js` _([See example here](#customer))_
  - Receives orders from customers via the command line and interfaces with mySQL to deplete stock from the store's inventory.

### MySQL
The JavaScript files mentioned above query a MySQL database called `Bamazon` which is locally hosted.

- Please refer to the `schema.sql` file to see how the database was created using raw SQL queries.

  - If you wish to run this app on your own machine, then please note the following commands:

    1. If you are new to MySQL, please set up [MySQL](http://dev.mysql.com/downloads/mysql/) and [MySQL Workbench](http://dev.mysql.com/downloads/workbench/) on your laptop and then open up to your localhost connection.
    2. Run `CREATE DATABASE bamazon;` in mySQL Workbench.
    3. Be sure to select the correct database by running the `USE bamazon;` 


### Node Package Manager (npm)
If you clone this repo down to your machine, note that it has two npm dependencies!
Before running the JavaScript files mentioned above, please run `npm install` in your terminal to download the [prompt](https://www.npmjs.com/package/prompt) and [mysql](https://www.npmjs.com/package/mysql) node packages.


### Screenshots
Below are some screenshots that show the functionality of the app.


<a name="customer"></a>
- Below is a demo of the `BamazonCustomer.js` file...
      ![Customer Order](/screenshot.png)# bamazon
