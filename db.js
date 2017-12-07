const mongoose = require('mongoose');

module.exports = app => {
    mongoose.connect('mongodb://zaccaron_mandelli:eventozm007@ds139470.mlab.com:39470/db_evento', { useMongoClient: true });
}