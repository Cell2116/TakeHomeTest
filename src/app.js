// const splitData = require ('./models/splitData.js');
// const pool = require ('./config/pool.js');
// const jsonData = require ('../rawData.json');

// const records = splitData(JSON.stringify(jsonData));

// records.forEach(record => {
//   pool.query('INSERT INTO data_student (NAMA, NIM, YMD) VALUES (?, ?, ?)', record, (err, result)=>{
//     if(err)
//       throw new Error;
//     console.log(`Inserted record with ID: ${result.insertId}`);
//   })
// });

const express = require('express');

const app = express();
app.use(express.json());

module.exports =app;
