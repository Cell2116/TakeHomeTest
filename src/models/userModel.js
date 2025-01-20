// This function is for database interaction (user)

const pool = require('../config/db');
const util = require('util');

//Lock callback function to bind with pool connection
const queryAsync = util.promisify(pool.query).bind(pool);

const createUser = async (safeEmail, hashedPassword) => {
  try {
    // Create table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS dataLogin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await queryAsync(createTableQuery);
    
    // Insert new user
    const insertQuery = `
      INSERT INTO dataLogin (email, password) 
      VALUES (?, ?)
    `;
    const insertValues = [safeEmail, hashedPassword];
    
    console.log('Executing insert query with email:', safeEmail);
    const insertResult = await queryAsync(insertQuery, insertValues);
    
    // Fetch the created user
    const selectQuery = `
      SELECT id, email, created_at 
      FROM dataLogin 
      WHERE id = ?
    `;
    const selectResult = await queryAsync(selectQuery, [insertResult.insertId]);
    
    console.log('Insert result:', {
      insertId: insertResult.insertId,
      affectedRows: insertResult.affectedRows
    });
    
    return {
      rows: selectResult
    };
    
  } catch (err) {
    console.error('Database error in createUser:', err);
    throw err;
  }
};

const findUserByEmail = async (email) => {
  try {
//find table
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS dataLogin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await queryAsync(createTableQuery);
  const query = 'SELECT * FROM dataLogin WHERE email = ?';
  const values = [email];
  
  console.log('Searching for user with email:', email);
  const result = await queryAsync(query, values);
  
  console.log('Search result:', {
    found: result.length > 0,
    count: result.length
  });
  
  return {
    rows: result
  };
    
  } catch (err) {
    console.error('Database error in findUserByEmail:', err);
    throw err;
  }
};

module.exports = { createUser, findUserByEmail };