const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema ({

    
    body:{
        type: String,
        required: true
    }
})

const notes = mongoose.model("notes",noteSchema);

module.exports = notes;