var prompt = require('prompt');
var mysql = require('mysql');
var padText = require('./padTable.js')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "#AJAXquery621", 
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

connection.query('SELECT * FROM products', function(err, res){
  
  if(err) throw err;

  console.log('Check out our selection...\n');

  console.log('  ID  |               Product Name               |  Department Name  |   Price  | In Stock');
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
  
  for(var i = 0; i < res.length; i++){

    var item_id = res[i].item_id + '';
    item_id = padText("  ID  ", item_id);

    var product_name = res[i].product_name + '';
    product_name = padText("               Product Name               ", product_name);

    var department_name = res[i].department_name + ''; 
    department_name = padText("  Department Name  ", department_name);

    var price = '$' + res[i].price.toFixed(2) + '';
    price = padText("   Price  ", price);

    var quantity = res[i].stock_quantity + '';

    console.log(item_id + '|' + product_name + '|' + department_name + '|' + price + '|    ' + quantity);
  }

  prompt.start();

  console.log('\nWhich item do you want to buy?');
  prompt.get(['buyItemID'], function (err, result) {
    
    var buyItemID = result.buyItemID;
    console.log('You selected Item # ' + buyItemID + '.');

    console.log('\nHow many do you wish to buy?')
    prompt.get(['buyItemQuantity'], function (err, result) {

      var buyItemQuantity = result.buyItemQuantity;
      console.log('You selected to buy ' + buyItemQuantity + ' of these.');

      connection.query('SELECT stock_quantity FROM products WHERE ?', [{item_id: buyItemID}], function(err, res){
        if(err) throw err;

        if(res[0] == undefined){
          console.log('Sorry... We found no items with Item ID "' +  buyItemID + '"');
          connection.end();
        }
        else{
          var bamazonQuantity = res[0].stock_quantity;

          if(bamazonQuantity >= buyItemQuantity){

            var newInventory = parseInt(bamazonQuantity) - parseInt(buyItemQuantity);
            connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: newInventory}, {item_id: buyItemID}], function(err, res){
              if(err) throw err;
            });

            var customerTotal;
            connection.query('SELECT price FROM products WHERE ?', [{item_id: buyItemID}], function(err, res){
              
              var buyItemPrice = res[0].price;
              customerTotal = buyItemQuantity*buyItemPrice.toFixed(2);

              console.log('\nYour total is $' + customerTotal + '.');

              connection.query('SELECT department_name FROM products WHERE ?', [{item_id: buyItemID}], function(err, res){
                var itemDepartment = res[0].department_name;
                
                connection.query('SELECT total_sales FROM departments WHERE ?', [{department_name: itemDepartment}], function(err, res){
                  var totalSales = res[0].total_sales;

                  var totalSales = parseFloat(totalSales) + parseFloat(customerTotal);

                  connection.query('UPDATE departments SET ? WHERE ?', [{total_sales: totalSales}, {department_name: itemDepartment}], function(err, res){
                    if(err) throw err;
                    console.log('Transaction Completed.')
                    connection.end();

                  });
                });
              });
            });
          }
          else{
            console.log('Sorry... We only have ' +  bamazonQuantity + ' of those items. Order cancelled.');
            connection.end();
          }
        }
      });
    });
  });
});