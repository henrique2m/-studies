const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://****V1@cluster0-ysxe1.mongodb.net/****?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;