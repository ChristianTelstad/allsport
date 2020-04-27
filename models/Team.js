const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const TeamPost= require('../models/TeamPost')
let uniqueValidator = require('mongoose-unique-validator')


const TeamSchema = new Schema({
    teamName: {
        type: String,
        unique: true
    },
    sportType: String,
    description: String,
    location: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User'/*, unique: true*/ }],
    leaders: [{type: Schema.Types.ObjectId, ref: 'User'}],
    teamPost: [TeamPost.schema]
})

TeamSchema.plugin(uniqueValidator);
const Team = mongoose.model('Team', TeamSchema);
module.exports = Team
