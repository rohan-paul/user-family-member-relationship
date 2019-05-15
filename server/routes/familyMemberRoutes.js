let express = require("express"),
  router = express.Router(),
  FamilyMember = require("../models/familyMember");

// Get all family members
router.get("/", (req, res, next) => {
  FamilyMember.find(
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

// To Add New family member
router.post("/", (req, res, next) => {
  let familyMember = new FamilyMember(req.body);
  familyMember.save((error, newDocument) => {
    if (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        // console.log("DUPLICATE IN BACK END IS ", error);
        res.status(400).send(error);
      } else {
        next();
      }
    } else {
      res.status(200).send(newDocument);
    }
  });
});

module.exports = router;
