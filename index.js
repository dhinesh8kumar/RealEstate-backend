const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "sozores.mysql.database.azure.com",
  user: "nb501",
  password: "1234Asdf@",
  database: "realestate"
})
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/api/buyer', function (req, res) {
  db.query('SELECT * FROM buyer WHERE verify=-1', function (error, results, fields) {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data");
    } else {
      res.send(results);
    }
  });
});

app.get('/api/attorney', function (req, res) {
  db.query('SELECT * FROM attorney ', function (error, results, fields) {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data");
    } else {
      res.send(results);
    }
  });
});

app.get('/api/comaplaint', function (req, res) {
  db.query('SELECT * FROM complaint', function (error, results, fields) {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data");
    } else {
      res.send(results);
    }
  });
});

app.get('/api/property', function (req, res) {
  db.query('SELECT * FROM property', function (error, results, fields) {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data");
    } else {
      res.send(results);
    }
  });
});

app.get('/api/seller', function (req, res) {
  db.query('SELECT * FROM seller', function (error, results, fields) {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data");
    } else {
      res.send(results);
    }
  });
});



app.listen(9091, () => {
  console.log("Server is running");
})

app.put('/baccept', (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const verify = req.body.verify;

  db.query(
    'UPDATE buyer SET verify = ? WHERE buyer_id = ?',
    [verify, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating customer');
      } 
    }
  );
});
app.put('/breject', (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const verify = req.body.verify;

  db.query(
    'UPDATE buyer SET verify = ? WHERE buyer_id = ?',
    [verify, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating customer');
      } 
    }
  );
});
app.post("/bsignup",(req,res)=>{
  
  const buyerid ="test1234";
  const aadhaar =req.body.values.passpor
  const name= req.body.values.fullname;
  const email = req.body.values.email;
  const number = req.body.values.mob;
  const pass = req.body.values.password;
  const address = req.body.values.address;
  const verify = -1;
  
  db.query("INSERT INTO buyer(buyer_id,aadhar_id,Full_Name,Email,Contact_Number,Password,Address,verify)VALUES (?,?,?,?,?,?,?,?)",
  [
    buyerid,aadhaar,name,email,number,pass,address,verify

  ],(error, results) => {

    if (error) {
      console.log(error);
    }
    else {
      res.send("Values Inserted")
    }

  },);
});
app.post("/payment", (req, res) => {

  const payment_id = "test9";
  const buyer_id = req.body.buyer;
  const property_id = req.body.property;
 const amount = req.body.amount;
  const seller_id = req.body.seller;
  const Email = req.body.email;
  const Verified = -1;
  
  db.query(

    "INSERT INTO payment(payment_id,buyer_id,property_id,amount,seller_id,Email,Verified) VALUES (?,?,?,?,?,?,?)",

    [
      payment_id,
      buyer_id,
      property_id,
      amount,
      seller_id,
      Email,
      Verified

    ],
    (error, results) => {

      if (error) {
        console.log(error);
      }
      else {
        res.send("Values Inserted")
      }

    },);

});

