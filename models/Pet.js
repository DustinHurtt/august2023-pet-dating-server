const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    animalType: String,
    name: String,
    energyLevel: {
      type: Number,
      min: 1,
      max: 10,
      default: 1,
    },
    size: {
      type: String,
      enum: ["extra-small", "small", "medium", "large", "extra-large"],
    },
    location: String,
    gender: String,
    image: {
        type: String,
        default: 'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg'
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    tagline: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Pet", petSchema);


