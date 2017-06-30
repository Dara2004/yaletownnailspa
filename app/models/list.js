  var mongoose = require('mongoose');

  module.exports = mongoose.model('Subscriber', {
      name: String,
      email: String
  });
