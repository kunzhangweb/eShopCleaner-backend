const express = require("express");
const multer = require("multer");
const Cleaner = require("../models/cleaner");
const router = express.Router();
const mongoose = require("mongoose");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "backend/images");
  },
  filename: function(req, file, cb) {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    let fileName;

    if (!req.file) {
      console.log("No file");
      fileName = "noImage.jpg";
    } else {
      fileName = req.file.filename;
    }
    const cleaner = new Cleaner({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      weight: req.body.weight,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
      price: req.body.price,
      barcode: req.body.barcode,
      date: req.body.date,
      image: url + "/images/" + fileName
    });
    console.log();
    cleaner.save().then(createdCleaner => {
      res.status(201).json({
        message: "The cleaning supply added successfully",
        cleaner: createdCleaner
      });
    });
  }
);

// router.put(
//     "/:id",
//     multer({ storage: storage }).single("image"),
//     (req, res, next) => {
//         let image = req.body.image;
//         console.log(image);
//         if (req.file) {
//             const url = req.protocol + "://" + req.get("host");
//             image = url + "/images/" + req.file.filename;
//         }
//         const book = new Book({
//             _id: mongoose.Types.ObjectId(),
//             title: req.body.title,
//             disc: req.body.disc,
//             author: req.body.author,
//             price: req.body.price,
//             isbn: req.body.isbn,
//             date: req.body.date,
//             image: url + "/images/" + req.file.filename
//         });

//         book.updateOne({ _id: req.params.id }, Book).then(result => {
//             res.status(200).json({
//                 message: "Update successful!"
//             });
//         });
//     }
// );

router.get("", (req, res, next) => {
  Cleaner.find().then(documents => {
    res.status(200).json({
      message: "The cleaning supply fetched successfully!",
      Cleaners: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Cleaner.findById(req.params.id).then(Cleaner => {
    if (Cleaner) {
      res.status(200).json(Cleaner);
    } else {
      res.status(404).json({ message: "The cleaning supply not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Cleaner.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "The cleaning supply deleted!" });
  });
});

module.exports = router;
