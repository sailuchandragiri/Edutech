const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    mobile: { type: String, required: true, unique: true, minlength: 10, maxlength: 10 },
    otp: { type: Number, required: true },
    my_projects: [{ type: String, required: false }],
    bought_courses: [{ type: String, required: false }],
    my_subscriptions: [{ type: String, required: false }],
    my_payments: [{ type: String, required: false }],
    ongoing_courses: [{ type: String, required: false }],
    upcoming_courses: [{ type: String, required: false }],
    completed_courses: [{ type: String, required: false }],
    course_journey: [{ type: Number, required: false }]
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("user", userSchema);
