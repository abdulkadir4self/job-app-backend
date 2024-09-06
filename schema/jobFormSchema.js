const mongoose = require('mongoose');

const jobFormSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required : true
    },
    position:{
        type: String,
        required : true
    },
    contract:{
        type: String,
        required : true
    },
    location:{
        type: String,
        required : true
    },
})

module.exports = mongoose.model('jobForm' , jobFormSchema);