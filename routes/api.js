const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const StudentModel = require("../models/student");

mongoose
  .connect("mongodb://127.0.0.1:27017/testDb", {
    useNewUrlParser: true,
    useUnifiedtopology: true,
  })
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// CRUD

// POST
router.post("/addStudent", (req, res) => {
  let newStudentModel = new StudentModel();
  newStudentModel.name = req.body.name;
  newStudentModel.age = req.body.age;
  newStudentModel.add = req.body.add;
  newStudentModel.class1 = req.body.class1;

  newStudentModel
    .save()
    .then(() => {
      res.status(200).json({ message: "Student Data Added", status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// GET
router.get("/getStudentDetails", (req, res) => {
  StudentModel.find({})
    .then((data) => {
      res.status(200).json({ studentList: data, status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// get particular data using _ID field
router.get("/getStudentDetailsById/:id", (req, res) => {
  StudentModel.findById(req.params.id)
    .exec()
    .then((data) => {
      res.status(200).json({ studentList: data, status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// PUT
router.put("/updateStudent/:id", (req, res) => {
  StudentModel.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      age: req.body.age,
      class1: req.body.class1,
      add: req.body.add,
    },
  })
    .then(() => {
      res.status(200).json({ message: "student data updated", status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// PATCH
router.patch("/updateStudent/:id", (req, res) => {
  // console.log(req.body,req.params.id);
  StudentModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then(() => {
      res.status(200).json({ message: "Student Data Updated", status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// Delete
router.delete("/deleteStudent/:id", (req, res) => {
  StudentModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Student Data Deleted", status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

module.exports = router;
