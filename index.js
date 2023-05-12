const express = require("express");
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");
const db =require('./db');



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(expressSession({
  secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60 },
}));
app.use(cookieParser());





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


// LOGIN
app.post('/login',(req,res)=>{
   
  // Retrieve username and password from request body
  const username =req.body.values.email;
  const pass = req.body.values.password;
  const type = req.body.values.type;
  
  // Query the database for the user with the specified username and password
  const sql = `SELECT * FROM \`${type}\` WHERE Email = ? AND Password = ? `;
  db.query(sql, [ username, pass], (err, results) => {
    if (err) {  
      throw err;
    }
 
    // If the user was found, store user data in session object
    if (results.length > 0) {
      
      app.use(cookieParser());
      const user = { id: results[0].id , Name: results[0].Full_Name ,verify:  results[0].Verify};
      return res.json(user);
    } else if (results.length === 0) {
      res.status(404).send('User not found');}
    else {
      res.json({ message: 'Invalid username or password.' });
    } 
  }); 
})



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

// PAYMENTS
app.put('/paccept', (req, res) => {
  
  const id = req.body.id;
  const verify = req.body.verify;

  db.query(
    'UPDATE payment SET verify = ? WHERE payment_id = ?',
    [verify, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating customer');
      } 
    }
  );
});
//payments fetch according to user to user database where the buyer can approve or deny the payments
app.get('/api/bpayment', function (req, res) {
  const id = req.query.user; 
  const verify =req.query.verify;
  
  db.query('SELECT * FROM payment where buyer_id = ? AND verify = ?',[id,verify] , (error, results) => {
    
    if (error) {
      // console.log(id);
      console.log(error);
      res.status(500).send('Internal server error');
    } else {
      
      res.json(results);
    }
  });
});

//payments fetch according to user to seller database
app.get('/api/spayment', function (req, res) {
  
  const id=req.query.user;
  db.query('SELECT * FROM payment where seller_id = ? ',[id] , (error, results) => {
    
    if (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    } else {
      
      res.json(results);
    }
  });
});

app.post("/bsignup",(req,res)=>{
  
  const buyerid ="test1234567";
  const aadhaar =req.body.values.passport;
  const name= req.body.values.fullname;
  const email = req.body.values.email;
  const number = req.body.values.mob;
  const pass = req.body.values.password;
  const address = req.body.values.address;
  const file = req.body.values.file;
  const verify = -1;
  
  db.query("INSERT INTO buyer(buyer_id,aadhar_id,Full_Name,Email,Contact_Number,Password,Address,verify,choose_file)VALUES (,?,?,?,?,?,?,?,?)",
  [
    buyerid,aadhaar,name,email,number,pass,address,verify,file

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

  const name= req.body.name
  const buyer_id = req.body.buyer;
  const property_id = req.body.property;
 const amount = req.body.amount;
  const seller_id = req.body.seller;
  const Email = req.body.email;
  const Verified = -1;
  const attorney = req.body.attorney;
  db.query(

    "INSERT INTO payment(buyer_id,property_id,amount,seller_id,Email,verify,attorney_id,Full_Name) VALUES (?,?,?,?,?,?,?,?)",

    [
      
      buyer_id,
      property_id,
      amount,
      seller_id,
      Email, 
      Verified,
      attorney,
      name

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




