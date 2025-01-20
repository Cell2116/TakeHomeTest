// Making pool so database can be reused

const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

// Local Instance Database
dotenv.config({
  path: path.resolve(__dirname, '../../.env')
})

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl:{
    rejectUnauthorized: false, 
    //if you got error with authorization API, mostly happen depends on your browser
  }
});

//Test Connection
pool.getConnection((err, connection) => {
  if(err){
    console.error('Error connecting to DB:', err.stack);
    return;
  }
  else{
    console.log('Connected to DB');
    connection.release(); // release the connection.
    return;  // don't use the connection here, it has been returned to the pool.
  }
})

//if something went wrong 
pool.on('error', (err, client) =>{
  console.error('Unexpected error on client connection', err)
  process.exit(-1);
});


module.exports = pool;