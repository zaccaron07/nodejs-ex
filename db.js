const mongoose = require('mongoose');

module.exports = app => {
    mongoose.connect('mongodb://zaccaron_mandelli:eventozm007@ds117148.mlab.com:17148/db_evento', { useMongoClient: true }); 
}