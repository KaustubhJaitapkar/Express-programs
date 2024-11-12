import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '22510113',
  database: 'mydb',
})

db.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL: ', err);
      return;
  }

    console.log('Connected to MySQL');
});

app.post('/create', (req, res) => {
  const name = req.body.name;
  const country = req.body.country;
  const age = req.body.age;
  const position = req.body.position;
  const wage = req.body.wage;

  console.log(name, country, age, position,wage);

  db.query('INSERT INTO employee (name, age,country, position,wage) VALUES (?,?,?,?,?)',
     [name, age, country, position, wage] ,
     (err, result) => {
        if(err) {
          console.log(err);
        }
        else{
          res.send("Values inserted");
        }
     });
})

app.get('/employees', (req, res) => {
  // console.log("Hiii")
  db.query('SELECT * FROM employee', (err, result) =>{
    if(err) {
      console.log(err);
    }
    else{
      // console.log(result);
      res.send(result);
    }
  });
})

app.listen(8000, ()=>{
  console.log('listening on port 8000');
})