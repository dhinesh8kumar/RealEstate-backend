const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
// var bcrypt = require('bcryptjs');
// var passwordHash = require('password-hash');
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 },
  })
);
app.use(cookieParser());

//POST methods

app.post("/Bsignup", async (req, res) => {
  const aadhaar = req.body.values.passport;
  const name = req.body.values.fullname;
  const email = req.body.values.email;
  const number = req.body.values.mob;
  const plainPassword = req.body.values.password;
  const address = req.body.values.address;
  const file = req.body.values.file;
  const verify = -1;
  // const hp =   bcrypt.hash(pass,4);
  //console.log(password);
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    db.query(
      "INSERT INTO buyer(aadhar_id,Full_Name,Email,Contact_Number,Password,Address,verify,id_proof)VALUES (?,?,?,?,?,?,?,?)",
      [aadhaar, name, email, number, hashedPassword, address, verify, file],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("error hashing passwword");
  }
});

app.post("/Ssignup", async (req, res) => {
  const Full_Name = req.body.values.fullname;

  const Email = req.body.values.email;

  const Contact_Number = req.body.values.mob;

  const Aadhar_id = req.body.values.passport;

  const PPassword = req.body.values.password;

  const Address = req.body.values.address;

  const id_proof = req.body.values.file;

  const Verify = -1;

  try {
    const hashed_Password = await bcrypt.hash(PPassword, saltRounds);

    db.query(
      "INSERT INTO seller(Full_Name, Email, Contact_Number,Aadhar_id, Password, Address, id_proof,Verify) VALUES(?,?,?,?,?,?,?,?)",

      [
        Full_Name,
        Email,
        Contact_Number,
        Aadhar_id,
        hashed_Password,
        Address,
        id_proof,
        Verify,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.send("Sent successfully");

          console.log("sent succesfully.");
        }
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).send("error hashing passwword");
  }
});

app.post("/Asignup", async (req, res) => {
  const Full_Name = req.body.values.fullname;
  const Email = req.body.values.email;
  const Contact_Number = req.body.values.mob;
  const Aadhar_id = req.body.values.passport;
  const APassword = req.body.values.password;
  const Address = req.body.values.address;
  const id_proof = req.body.values.pfile;
  const Attorney_Certificate = req.body.values.lfile;
  const Profile = req.body.values.profile;
  const Verify = -1;

  try {
    const hashPassword = await bcrypt.hash(APassword, saltRounds);

    db.query(
      "INSERT INTO attorney(Aadhar_id, Full_Name, Email, Contact_Number,Address,Verify, Password,id_proof, Attorney_Certificate, Profile) VALUES(?,?,?,?,?,?,?,?,?,?)",

      [
        Aadhar_id,
        Full_Name,
        Email,
        Contact_Number,
        Address,
        Verify,
        hashPassword,
        id_proof,
        Attorney_Certificate,
        Profile,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.send("Sent successfully");

          console.log("sent succesfully.");
        }
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).send("error hashing passwword");
  }
});

app.post("/AddProperty", (req, res) => {
  const Property_Name = req.body.values.propname;

  const Reg_no = req.body.values.reg;

  const Owner_Name = req.body.values.ownername;

  const Contact_Number = req.body.values.mob;

  const Seller_id = req.body.values.sellerid;

  const Address = req.body.values.address;

  const Price = req.body.values.value;

  const Area_Size = req.body.values.area;

  const Descrp = req.body.values.desc;

  const Purpose = req.body.values.purpose;

  const Property_Image = req.body.values.image;

  const Property_Doc = req.body.values.pdoc;

  console.log(req.body.values);

  const Verify = -1;

  db.query(
    "INSERT INTO property(Property_Name, Reg_no, Owner_Name,Contact_Number,Seller_id, Address, Price, Area_Size, Descrp, Purpose, Property_Image, Property_Doc, Verify ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",

    [
      Property_Name,

      Reg_no,

      Owner_Name,

      Contact_Number,

      Seller_id,

      Address,

      Price,

      Area_Size,

      Descrp,

      Purpose,

      Property_Image,

      Property_Doc,

      Verify,
    ],

    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Sent successfully");

        console.log("sent succesfully.");
      }
    }
  );
});

app.post("/complaint", (req, res) => {
  const Full_Name = req.body.values.fullname;
  const Email = req.body.values.email;
  const Your_id = req.body.values.id;
  const issue_id = req.body.values.issueid;
  const Subject = req.body.values.subject;
  const Descrp = req.body.values.descrp;
  const Verify = -1;
  // alert(req.body);
  db.query(
    "INSERT INTO complaint(Full_Name, Email, Your_id, issue_id, Subject, Descrp, Verify) VALUES(?,?,?,?,?,?,?)",
    [Full_Name, Email, Your_id, issue_id, Subject, Descrp, Verify],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Sent successfully");
        console.log("sent succesfully.");
      }
    }
  );
});

app.get("/api/buyer", function (req, res) {
  db.query(
    "SELECT * FROM buyer WHERE verify=-1",
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
      } else {
        res.send(results);
      }
    }
  );
});

app.get("/api/attorney", function (req, res) {
  db.query(
    "SELECT * FROM attorney WHERE Verify = 1 ",
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
      } else {
        res.send(results);
      }
    }
  );
});
app.get("/api/admin/attorney", function (req, res) {
  db.query(
    "SELECT * FROM attorney WHERE Verify = -1 ",
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
      } else {
        res.send(results);
      }
    }
  );
});
app.get("/api/comaplaint", function (req, res) {
  db.query("SELECT * FROM complaint", function (error, results, fields) {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data");
    } else {
      res.send(results);
    }
  });
});

app.get("/api/property", function (req, res) {
  db.query(
    "SELECT * FROM property WHERE Verify =1",
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
      } else {
        res.send(results);
      }
    }
  );
});

app.get("/api/admin/property", function (req, res) {
  db.query(
    "SELECT * FROM property WHERE Verify = -1",
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
      } else {
        res.send(results);
      }
    }
  );
});
app.get("/api/seller", function (req, res) {
  db.query(
    "SELECT * FROM seller where Verify = -1",
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
      } else {
        res.send(results);
      }
    }
  );
});

// LOGIN
app.post("/login", async (req, res) => {
  // Retrieve username and password from request body

  const username = req.body.values.email;

  const plain_Password = req.body.values.password;

  const type = req.body.values.type; // Query the database for the user with the specified username and password

  const sql = `SELECT * FROM \`${type}\` WHERE Email = ? `;

  db.query(sql, [username], async (err, results) => {
    if (err) {
      throw err;
    } // If the user was found, store user data in session object

    if (results.length > 0) {
      const hashedPassword = results[0].Password;

      const isMatch = await bcrypt.compare(plain_Password, hashedPassword);

      if (isMatch) {
        app.use(cookieParser());

        const user = {
          id: results[0].id,
          Name: results[0].Full_Name,
          verify: results[0].Verify,
        };

        return res.json(user);
      } else if (results.length === 0) {
        res.status(404).send("User not found");
      } else {
        res.json({ message: "Invalid username or password." });
      }
    }
  });
});

app.listen(9091, () => {
  console.log("Server is running");
});

app.put("/baccept", (req, res) => {
  const id = req.body.id;
  const verify = req.body.verify;

  db.query(
    "UPDATE buyer SET verify = ? WHERE id = ?",
    [verify, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error updating customer");
      }
    }
  );
});
app.put("/saccept", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const verify = req.body.verify;

  db.query(
    "UPDATE seller SET verify = ? WHERE id = ?",
    [verify, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error updating customer");
      }
    }
  );
});
app.put("/proaccept", (req, res) => {
  const id = req.body.id;
  const verify = req.body.verify;

  db.query(
    "UPDATE property SET verify = ? WHERE id = ?",
    [verify, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error updating customer");
      }
    }
  );
});
app.put("/aaccept", (req, res) => {
  const id = req.body.id;
  const verify = req.body.verify;

  db.query(
    "UPDATE attorney SET verify = ? WHERE id = ?",
    [verify, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error updating customer");
      }
    }
  );
});
// PAYMENTS
app.put("/paccept", (req, res) => {
  const id = req.body.id;
  const verify = req.body.verify;

  db.query(
    "UPDATE payment SET verify = ? WHERE id = ?",
    [verify, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error updating customer");
      }
    }
  );
});

//payments fetch to admin
app.get("/api/payment", function (req, res) {
  db.query("SELECT * FROM payment ", (error, results) => {
    if (error) {
      // console.log(id);
      console.log(error);
      res.status(500).send("Internal server error");
    } else {
      res.json(results);
    }
  });
});

//payments fetch according to user to user database where the buyer can approve or deny the payments
app.get("/api/bpayment", function (req, res) {
  const id = req.query.user;
  const verify = req.query.verify;

  db.query(
    "SELECT * FROM payment where buyer_id = ? AND verify = ?",
    [id, verify],
    (error, results) => {
      if (error) {
        // console.log(id);
        console.log(error);
        res.status(500).send("Internal server error");
      } else {
        res.json(results);
      }
    }
  );
});

//payments fetch according to user to seller database
app.get("/api/spayment", function (req, res) {
  const id = req.query.user;
  db.query(
    "SELECT * FROM payment where seller_id = ? ",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Internal server error");
      } else {
        res.json(results);
      }
    }
  );
});
app.get("/api/sproperty", function (req, res) {
  const id = req.query.user;

  db.query(
    "SELECT * FROM property where seller_id = ? ",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Internal server error");
      } else {
        res.json(results);
      }
    }
  );
});
app.get("/api/complaint", function (req, res) {
  const id = req.query.user;
  const verify = req.query.verify;

  db.query("SELECT * FROM complaint", (error, results) => {
    if (error) {
      // console.log(id);
      console.log(error);
      res.status(500).send("Internal server error");
    } else {
      res.json(results);
    }
  });
});

app.post("/payment", (req, res) => {
  const name = req.body.name;
  const buyer_id = req.body.buyer;
  const property_id = req.body.property;
  const amount = req.body.amount;
  const seller_id = req.body.seller;
  const Email = req.body.email;
  const Verified = -1;
  const attorney = req.body.attorney;
  db.query(
    "INSERT INTO payment(buyer_id,property_id,amount,seller_id,Email,verify,attorney_id,Full_Name) VALUES (?,?,?,?,?,?,?,?)",

    [buyer_id, property_id, amount, seller_id, Email, Verified, attorney, name],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
