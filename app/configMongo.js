const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shortlyDb');

let urlSchema = new mongoose.Schema({
    url:String,
    baseUrl: String,
    code: String,
    title:String,
    visits:Number,
    createAt: Date,
    updatedAt: Date
})


let Urls = mongoose.model('Urls', urlSchema);

let userSchema = new mongoose.Schema({
   username: String,
   password: String,
   createAt: Date,
   updatedAt: Date
});

let Users = mongoose.model('Users', userSchema);