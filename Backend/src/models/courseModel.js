const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    course_name: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    about: { type: String, required: true },
    whatToLearn: [{ type: String, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("course", courseSchema);

//    id: 2,
//     course_name: "Graphic Design",
//     status: "Ongoing",
//     type: "Paid",
//     category: "Creative",
//     image: "/Course-icons/Graphic-design-icon.png",
