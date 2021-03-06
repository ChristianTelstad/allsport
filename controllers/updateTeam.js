const Team = require('../models/Team.js')
const User = require('../models/User.js')
const Post = require('../models/Post.js')


module.exports = async (req, res) => {

    //Updates Team information
    let updateTeamName = req.body.updateTeamName;
    let updateSportType = req.body.updateSportType;
    let updateDescription = req.body.updateDescription;
    let updateLocation = req.body.updateLocation;
    let updateLevel = req.body.updateLevel;
    const conditions = {};

    // if only one conditon is to be updated example:  conditons = {teamName: "CBS football"}
    // if multiple conditon is to be updated example:  conditons = {teamName: "CBS football", sportType: "Football", etc}
    if (updateTeamName) {
        conditions.teamName = updateTeamName

    }

    if (updateSportType) {
        conditions.sportType = updateSportType

    }

    if (updateDescription) {
        conditions.description = updateDescription

    }

    if (updateLocation) {
        conditions.location = updateLocation

    }

    if (updateLevel) {
        conditions.level = updateLevel

    }


    const teams = await Team.findByIdAndUpdate(req.params.id, conditions, function () {}).populate('members').populate('leaders')
    const user= await User.findById(req.session.userId)
    const post = await Post.find({team: teams}).sort({'datePosted': -1})



    res.render('team', {
        teams,
        user,
        post
    });
}


