const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// register

const register = async (req, res) => {

  try {
      const { name, phone, gender, BDate, password } = req.body;

      // validation
      if (password.length < 6)
        return res.status(400).json({
          errorMessage: "Please enter a password of at least 6 characters.",
        });

  
      const existingUser = await User.findOne({ phone });
      if (existingUser)
        return res.status(400).json({
          errorMessage: "An account with this phone already exists.",
        });

  
      // save a new user account to the db
  
      const newUser = new User({
        name,
        phone,
        gender,
        BDate,
        password,
      });
  
      const savedUser = await newUser.save();
  
      // sign the token
  
      const token = jwt.sign(
        {
          user: savedUser._id,
        },
        process.env.JWT_SECRET
      );
  
      // send the token 
  
      res.status(200).json({
          token: token, 
          user:savedUser,
          expiresIn:"3h"   });
      
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  }
  
  // log in
  
  const login = async (req, res) => {
    try {
      const { phone, password } = req.body;
  
      // validate
  

      const existingUser = await User.findOne({ phone, password });
      if (!existingUser)
        return res.status(401).json({ errorMessage: "Wrong phone or password." });

  
      // sign the token
  
      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        process.env.JWT_SECRET
      );
  
      // send the token
        //expires in 3 hours
      res.status(200).json({
        token: token, 
        user:existingUser,
        expiresIn:"3h"   });

    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  }
  
  const logOut = (req, res) => {
    res
      .json("token", "", {
        expires: new Date(0),
      })
      .send();
  }
  

  module.exports = {
    register,
    login,
    logOut
  }