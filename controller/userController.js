const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// register

const register = async (req, res) => {

  try {
    const { name, phone, gender, BDate, password, type, carType, carNumber, numberOfPassengers } = req.body;

    // validation
    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "يجب أن يتكون الرقم السري من أكثر من 6 خانات",
      });


    const existingUser = await User.findOne({ phone });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "هذا الحساب موجود بالفعل",
      });


    // save a new user account to the db

    const newUser = new User({
      name,
      phone,
      gender,
      BDate,
      password,
      type,
      carType,
      carNumber,
      numberOfPassengers
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
      user: savedUser,
      expiresIn: "3h"
    });

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
      return res.status(401).json({ errorMessage: "خطأ في رقم الهاتف او الرقم السري" });


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
      user: existingUser,
      expiresIn: "3h"
    });

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

const getUsersByTypes = async (req, res) => {
  const users = await User.find({ type: req.params.type })
  res.json(users);
}

const getLoggedInUser = async (req) => {
  return await User.findOne({ _id: jwt.verify(req.headers.token, process.env.JWT_SECRET).user });
}

const updateUserInfo = async (req, res) => {
  try {
    const user = await getLoggedInUser(req);
    user.name = req.body.name
    user.identification = req.body.identification
    user.phone = req.body.phone
    user.address = req.body.address
    user.gender = req.body.gender
    user.BDate = req.body.BDate
    user.carType = req.body.carType
    user.carNumber = req.body.carNumber
    user.numberOfPassengers = req.body.numberOfPassengers
    res.json(await user.save())
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}

module.exports = {
  register,
  login,
  logOut,
  getUsersByTypes,
  updateUserInfo
}