let express = require("express"),
  router = express.Router(),
  UnidentifiedMember = require("../models/unidentifiedMember");

// Get all unidentified members
router.get("/", (req, res, next) => {
  UnidentifiedMember.find(
    {},
    null,
    {
      sort: { createdAt: -1 }
    },
    (err, docs) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(docs);
      }
    }
  );
});

// To Add New unidentified member
router.post("/", (req, res, next) => {
  let unidentifiedMember = new UnidentifiedMember(req.body);
  unidentifiedMember.save((error, newDocument) => {
    if (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        // console.log("DUPLICATE IN BACK END IS ", error);
        res.status(400).send(error);
      } else {
        console.log("Error occured while saving to mongo", error);
        next();
      }
    } else {
      res.status(200).send(newDocument);
    }
  });
});

// Batch insert unidentified members when data is first loaded from either csv file or some other way
router.post("/batch", (req, res, next) => {
  UnidentifiedMember.insertMany(req.body, (error, addedDocuments) => {
    if (error) {
      console.log("Error occurred while adding bulk documents", error);
      next();
    } else {
      res.status(200).send(addedDocuments);
    }
  });
});

// Delete by _id - Working
router.route("/delete").delete((req, res, next) => {
  UnidentifiedMember.remove(
    { _id: { $in: req.body.unidentifiedMember_id_list_arr } },
    (err, result) => {
      if (err) {
        console.log("Error occurred while deleting", err);
        return next(err);
      } else {
        res.status(200).send(result);
      }
    }
  );
});

module.exports = router;
