// This function is used for finding authenticated users

const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Processing registration for email:', email);
    // Input validation
    if (!email || !password) {
      return res.status(403).json({ message: 'Email and Password are required' });
    }
    const safeEmail = String(email).trim();
    const safePassword = String(password).trim();
    // Check existing user
    const existingUser = await findUserByEmail(safeEmail);
    if (existingUser.rows && existingUser.rows.length > 0) {
      return res.status(402).json({ message: 'Email already exists' });
    }
    // Create new user
    const hashedPassword = await bcrypt.hash(safePassword, 10);
    const newUser = await createUser(safeEmail, hashedPassword);
    console.log('User creation result:', {
      success: !!newUser?.rows,
      rowCount: newUser?.rows?.length
    });
    // Verify valid result
    if (!newUser?.rows?.length) {
      return res.status(500).json({ 
        message: 'Failed to create user - no data returned'
      });
    }
    // Success response
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.rows[0].id,
        email: newUser.rows[0].email,
        created_at: newUser.rows[0].created_at
      }
    });
  } 
  catch (err) {
      console.error('Registration error:', err);
      return res.status(500).json({
          message: 'Error creating user',
          error: err.message
      });
  }
};

exports.login = async(req, res) => {
  try{
    const {email, password} = req.body;
    const safeEmail = String(email).trim();
    const safePassword = String(password).trim();
    const findUser = await findUserByEmail(email);

    if(!safeEmail || !safePassword){
      return res.status(403).json({message:'Email and Password are required'});
    }

    if(findUser.rows.length === 0 || !findUser.rows || !findUser){
      return res.status(201).json({message:'User does not exist'});
    }
    const isMatch = await bcrypt.compare(safePassword, findUser.rows[0].password);
    if(!isMatch){
      return res.status(401).json({message:'Invalid Password'});
    }
    res.status(200).json({message:'Logged In'});
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:'Server Error'});
  }
};
