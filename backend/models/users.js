const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

/** 
//THIS DOESN'T WORK FOR SOME REASON; LEFT HERE FOR REFERENCE
//static function on the schema to find an user by email
//also used to see does an user exist
schema.statics.findUserByEmail = async function(req, res, next){
    const user = await this.find({email: req.body.email});
    if (user){
        console.log('user exists with email');  //diagnostic
        req.user = user;
        next();
    }
    else{
        onsole.log('user does not exist with email');
    }
    return user;
}
**/

module.exports = mongoose.model('users', schema);