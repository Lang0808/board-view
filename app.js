const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: '12345678',
    database: 'task',
    port: '3307'
});

connection.connect(function(err) {
    (err) ? console.log(err): console.log(connection);
})

app.get('/api/task', (req, res) => {
    var sql = "select * from TaskDate";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.json({ task: results });
    })
});

app.post('/api/insert', function(req, res) {
    var sql = "INSERT "
        + "INTO TaskDate(Ngay, JobName,Description) "
        + "VALUES ('"
        + req.body.Ngay + "','"
        + req.body.JobName + "','"
        + req.body.Description + "')";
    console.log(sql);
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.json({ task: results });
    });
});
app.listen(4000, () => console.log('App listening on port 4000'));