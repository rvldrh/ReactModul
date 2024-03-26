const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const db = mysql.createConnection({
 host: "localhost",
  password: "",
  user: "root",
  database: "rest_api"
});

db.connect(err => {
  if (err) console.log(err.message);
  else console.log("koneksi berhasil");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET: /pegawai --> end point untuk mengakses data pegawai
app.get("/pegawai", (req, res) => {
  let sql = "SELECT * FROM pegawai";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      let response = {
        count: result.length,
        pegawai: result
      };

      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(response));
    }
  });
});

// POST: /pegawai --> end point untuk pencarian data pegawai
app.post("/pegawai", (req, res) => {
    console.log(req.body)
  let sql = `SELECT * FROM pegawai WHERE nama LIKE "${req.body.nama}%"`;
//   let inserts = [`%${find}%`];
  sql = mysql.format(sql);

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      let response = {
        count: result.length,
        pegawai: result
      };

      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(response));
    }
  });
});

// POST: /pegawai/save --> end point untuk insert data pegawai
app.post("/pegawai/save", (req, res) => {
  let data = {
    nip: req.body.nip,
    nama: req.body.nama,
    alamat: req.body.alamat
  };
  let message = "";

  let sql = "INSERT INTO pegawai SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      message = err.message;
    } else {
      message = result.affectedRows + " row inserted";
    }

    let response = {
      message: message
    };

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response));
  });
});

// POST: /pegawai/update --> end point untuk update data pegawai
app.post("/pegawai/update", (req, res) => {
  let data = {
    nip: req.body.nip,
    nama: req.body.nama,
    alamat: req.body.alamat
  };
  let message = "";

  let sql = "UPDATE pegawai SET ? WHERE nip = ?";
  let values = [data, req.body.nip];
  sql = mysql.format(sql, values);

  db.query(sql, (err, result) => {
    if (err) {
      message = err.message;
    } else {
      message = result.affectedRows + " row updated";
    }

    let response = {
      message: message
    };

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response));
  });
});

// DELETE: /pegawai/:nip --> end point untuk hapus data pegawai
app.delete("/pegawai/:nip", (req, res) => {
  let data = {
    nip: req.params.nip
  };
  let message = "";
  let sql = "DELETE FROM pegawai WHERE ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      message = err.message;
    } else {
      message = result.affectedRows + " row deleted";
    }

    let response = {
      message: message
    };

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response));
  });
});

app.listen(2000, () => {
  console.log("Server run on port 2000");
});
