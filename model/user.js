const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true},
        password: { type: String, required: true}
    },
    { collection :'customers'}
)

const  model = mongoose.model('UserSchema', UserSchema);

module.exports = model;