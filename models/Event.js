const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    pet: { type: Schema.Types.ObjectId, ref: "Pet" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    activity: String,
    description: String,
    availability: String,
    participants: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", eventSchema);
