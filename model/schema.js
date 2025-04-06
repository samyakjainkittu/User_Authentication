const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobno: {
        type: String,
        required: true,
        unique: true
    },
    passward: {
        type: String,
        required: true,
    },
    confpassward: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]

})





usersSchema.methods.generateAuthToken = async function () {

    try {

        const token = jwt.sign({ _id: this._id.toString() }, "mynameissamyakjainkittubarhanagra");
        // this.tokens = this.tokens.concat({token:token});
        // await this.save();       
        // // console.log(token)
        return token;


    } catch (error) { 
        res.send("error is " + error);

    }

}


usersSchema.pre("save", async function (next) {

    if (this.isModified("passward")) {
        this.passward = await bcrypt.hash(this.passward, 10);
        this.confpassward = undefined;
    }
    next();
})






const Register = new mongoose.model("Register_User", usersSchema);

module.exports = Register;