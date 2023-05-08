var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "sozores.mysql.database.azure.com",
  database:"practicedb",
  user: "nb501",
  password: "1234Asdf@"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var q1 = "INSERT INTO buyerr(bname, b_email, b_cno, b_password, b_address, b_passportno) Values('Ramana', 'ramana@gmail.com',8977253088, 'husky96','Habibi it is dubai', 'ABCD12345678')";
  con.query(q1, function(err, result){
    if(err) throw err;
    console.log("1 row inserted");
  })
});