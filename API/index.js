const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const morgan = require('morgan')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'))

// Buat koneksi
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

// Konek
db.connect((err) => {
    if (err) throw err;
    console.log('Mysql Berjalan')
});

// Cors Handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// ROUTE

// app.get('/shop/iphonex', (req, res) => {
//     const fetch = "SELECT * FROM products JOIN computer_spec ON products.id = computer_spec.id";
//     db.query(fetch, (err, record) => {
//         if (err) {
//             console.log(err)
//         }
//         res.json(record)
//     })
// });

app.get('/shop/:product', (req, res) => {
    const fetch = 
    `SELECT * FROM products JOIN computer_spec ON products.id = computer_spec.id && title = '${req.params.product}'`;
    db.query(fetch, (err, record) => {
        if (err) {
            console.log(err)
        }
        res.json(record)
    })    
})

app.post('/register', (req,res) => {
    const fetch = `SELECT * FROM userlist WHERE email = '${req.body.email}'`
    db.query(fetch, (err, record) => {
        let value = {};
        if (record.length > 0) {
            value.message = "Email sudah ada"
        } else if (record.length === 0){
            value.message = 'Email valid'
        }
        if (err) {console.log(err)}
        res.json(value)
    })
})

app.post('/inserting', (req,res) => {
    const fetch = `INSERT INTO userlist(email,username,nomorPonsel,kataSandi)VALUES('${req.body.email}','${req.body.username}','${req.body.nomorPonsel}','${req.body.kataSandi}');`
    db.query(fetch, (err,record) => {
        if(err)throw err;
        res.json(record)
    })
})

app.post('/login', (req,res) => {
    const fetch = `SELECT * FROM userlist WHERE email = '${req.body.email}' && kataSandi = '${req.body.kataSandi}'`;
    let value = {};
    db.query(fetch, (err, record) => {
        if(err)throw err;
        if(record.length > 0) {
            value.message = true
            value.username = record[0].username
            value.id = record[0].id
        }else if (record.length === 0) {
            value.message = false
        }
        res.json(value)
    })
})

app.post('/cekuser', (req,res) => {
    const fetch = `SELECT * FROM userlist where username = '${req.body.username}'`;
    db.query(fetch,(err,record) => {
        if(err) throw err;
        res.json(record)
    })
})

app.post('/searchalamat', (req,res) => {
    const fetch = `SELECT * FROM userlist JOIN alamatuser WHERE userlist.username = '${req.body.username}'`;
    db.query(fetch, (err,record) => {
        if(err) throw err;
        res.json(record)
    })
})

app.post('/insertalamat', (req,res) => {
    res.header("Access-Control-Allow-Origin","*")
    const fetch = `INSERT into alamatuser(labelAlamat,namaPenerima,nomorHP,kota,kodepos,jalan,userlistId)
    VALUES('${req.body.labelAlamat}','${req.body.namaPenerima}','${req.body.nomorHP}','${req.body.kota}','${req.body.kodepos}','${req.body.jalan}','${req.body.userlistId}')`
    db.query(fetch, (err, record) => {
        if(err) throw err;
        res.json(record)
    })
})

app.get('/', (req,res) => {
    res.send('jalan2')
})

app.listen(port, () => console.log(`Server berjalan pada port ${port}`));

