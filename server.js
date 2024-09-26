const express = require("express");
const dotenv = require("dotenv");
const mongoose  = require("mongoose");
dotenv.config();
const Router=require("./Routes/userRouter");
const cors=require("cors");
const app = express();

app.use(cors())
app.use(Router);
app.use(express.json());

const userData=require("./Model/userModel")

//Connect to mongodb database(locally)
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Failed to connect", error));

  //CREATE
app.post("/", async (req, res) => {
  console.log(req.body);
  const {name , email, age } = req.body;
  try {
    const userAdded = await userData.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//UPDATE
app.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  //const { name, email, age } = req.body;
  console.log("get body", req.body);
  console.log("get id", id);
 
  try {
    const updatedUser = await userData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});