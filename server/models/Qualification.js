const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        firstname: { type: String, required: true, trim: true },
        lastname: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        completion: { type: Date, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Qualification', qualificationSchema);


