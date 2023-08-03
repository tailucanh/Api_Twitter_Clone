var express = require("express");
var router = express.Router();
const UserModel = require("../models/user_model");

//Post Method
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!username) {
    res.status(400).json({
      message: "Please enter your name",
    });
  } else if (!email) {
    res.status(400).json({
      message: "Please enter your email.",
    });
  } else if (!regex.test(email)) {
    res.status(400).json({
      message: "Please enter email in correct format.",
    });
  } else if (!password) {
    res.status(400).json({
      message: "Please enter a password.",
    });
  } else if (password.length < 6) {
    res.status(400).json({
      message: "Please enter a password of more than 6 characters.",
    });
  } else {
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      res.status(400).json({
        message: "Email has been registered. Please choose another email.",
      });
    } else {
      const data = new UserModel(req.body);
      try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
      } catch (error) {
        res
          .status(400)
          .json({ message: "An error has occurred. Please try again." });
      }
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    res.status(400).json({
      message: "Please enter your email.",
    });
  } else if (!regex.test(email)) {
    res.status(400).json({
      message: "Please enter email in correct format.",
    });
  } else if (!password) {
    res.status(400).json({
      message: "Please enter a password.",
    });
  } else if (password.length < 6) {
    res.status(400).json({
      message: "Please enter a password of more than 6 characters.",
    });
  } else {
    const userLogin = await UserModel.findOne({ email });

    if (!userLogin) {
      res.status(400).json({
        message:
          "Account does not exist. Please register if you do not have an account.",
      });
    } else {
      if (password != userLogin.password) {
        res.status(400).json({
          message: "Password is wrong, please check again.",
        });
      } else {
        res.json(userLogin);
        res.status(200).json({
          message: "Successful login.",
        });
      }
    }
  }
});

router.post("/loginWithId", async (req, res) => {
  const userId = req.params.userId;
  const userLogin = await UserModel.findOne({ _id: userId });

  if (!userLogin) {
    res.status(400).json({
      message:
        "Account does not exist. Please register if you do not have an account.",
    });
  } else {
    res.json(userLogin);
    res.status(200).json({
      message: "Successful login.",
    });
  }
});
//Get all Method
router.get("/getAll", async (req, res) => {
  33;
  try {
    const data = await UserModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await UserModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await UserModel.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
