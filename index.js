
const express = require('express');
const app = express()
const PORT = 4000;
const cors = require("cors");

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

const crypto = require('crypto');
const mongoose = require("mongoose")


const db1URL = "mongodb+srv://balakrishnan:7sqYVMYWU0Z3HBI8@cluster0.10tzniz.mongodb.net/Restraunt_1?retryWrites=true&w=majority"
const db2URL = "mongodb+srv://balakrishnan:7sqYVMYWU0Z3HBI8@cluster0.10tzniz.mongodb.net/Restraunt_2?retryWrites=true&w=majority"

const db1 = mongoose.createConnection(db1URL);
const db2 = mongoose.createConnection(db2URL);

const User1 = db1.model('User', mongoose.Schema({ email: String }));
const User2 = db2.model('User', mongoose.Schema({ email: String }));



function generateRandomEmail() {
  const randomString = crypto.randomBytes(8).toString('hex');
  const email = `user_${randomString}@gmail.com`;
  return email;
}


app.post('/user/create', async (req, res, next) => {


  let randomemail = "balakrishnan@gmail.com";

  const copydatalist = await User1.find({
    email: randomemail
  });
  
  if (copydatalist && copydatalist.length > 0 ) {
    const response = generateRandomEmail()
    randomemail = response
  }

  try {
    const userdetails = await User1.create({ email: randomemail })
    if (userdetails) {
      res.status(200).send(userdetails)
    }

  } catch (Eror) {
    console.log("ErorEror", Eror)
    res.status(400).json({ message: "Error while creating user" })
  }
})


app.get('/user/list/real', async (req, res, next) => {
  try {
    const realdata = await User1.find()
    res.status(200).send(realdata)
  } catch (Eror) {
    console.log("ErorEror", Eror)
    res.status(400).json({ message: "Error while getting user list" })

  }
})


app.get('/user/list/copy', async (req, res, next) => {
  try {
    const copydatalist = await User2.find()
    res.status(200).send(copydatalist)
  } catch (Eror) {
    console.log("ErorEror", Eror)
    res.status(400).json({ message: "Error while getting copied user list" })

  }
})


app.post('/user/create/copy', async (req, res, next) => {
  try {
    const { email } = req.headers;

    const copydataemail = await User2.find({
      email: email
    });


    if (copydataemail && copydataemail.length > 0) {
      console.log("Copydataemail", copydataemail)
      res.status(200).send({ message: "Already user found" })
    } else {
      const copydata = await User2.create({ email: email })
      res.status(200).send(copydata)
    }

  } catch (Eror) {
    console.log("ErorEror", Eror)
    res.status(400).json({ message: "Error while copying user to another database" })

  }
})


app.listen(PORT, () => console.log("server listening"))