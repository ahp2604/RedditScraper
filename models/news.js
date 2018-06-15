const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let newsSchema = new Schema({

    headline: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    notes: {
        type: Schema.Types.ObjectId,
        ref: "notes"
    }

});

let news = mongoose.model("news", newsSchema);

module.exports = news;