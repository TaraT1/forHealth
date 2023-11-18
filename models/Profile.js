const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  /*
 fullName: {
  fName,
  lName,
 }, 
 contact: {
  phone: String,
  email: String
},
  address: {
    street: String,
    city: String
 },
*/
  birthDate: {
    type: Date,
    required: false, 
  },
  bloodType: {
    type: String,
    require: false,
  },
  eHealthRecords: {
    type: String,
    require: false,
  },
  insurance: {
    type: String,
    require: false,
  },
  inCaseOfEmergency: {
      type: String,
  },
  journal: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  providers: 
    [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Provider' 
    }],
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
},
{ timestamps: true}
);

module.exports = mongoose.model('Profile', ProfileSchema);
