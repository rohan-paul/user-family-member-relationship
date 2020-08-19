"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let unidentifiedMemberSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    gender: { type: String },
    email: { type: String },
    phone: { type: String },
    location: { type: String }
  },
  {
    // createdAt,updatedAt fields are automatically added into records
    timestamps: true
  }
);

// exports
module.exports = mongoose.model("UnidentifiedMember", unidentifiedMemberSchema);
