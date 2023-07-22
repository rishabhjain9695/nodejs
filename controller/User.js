const jwt = require("jsonwebtoken");
const User = require("../model/User").User;
exports.loginUser =(req,res)=>{
  console.log("logintoken",req.body)
    if(req.user)
    res.json(req.user);
    else{
        res.json("invalid")
    }
}
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json("successfullu signedup User");
  } catch (error) {
    res.json(error);
  }
};
