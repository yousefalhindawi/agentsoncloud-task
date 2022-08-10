// import bcrypt from 'bcrypt-nodejs'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { sequelize } = require("../../models/index");
const {User} = require('../../models');
const SECRET = 'Yousef@123'

// create User
const register = async (req, res) => {
  
    const salt = await bcrypt.genSalt(10);
    
      // let info = {
      //   name: req.query.name,
      //   email: req.query.email,
      //   password: await bcrypt.hash(req.query.password,salt),
      // };

      let info = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password,salt),
      };
    
      try {
        const user = await User.create(info);
        res.status(200).send({status:200, message: 'Register Successfully'});
      } catch (error) {
        console.log(error);
      }
    };

    const login = async (req, res) => {
        const user = await User.findOne({ where : {email : req.body.email }});
        if(user){
            const password_valid = await bcrypt.compare(req.body.password,user.password);
            if(password_valid){
                token = jwt.sign({ "id" : user.id,"email" : user.email,"name":user.name },SECRET);
                // console.log(token)
                // loggeduser = { "id" : user.id,"email" : user.email,"name":user.name };
        res.status(200).json({ token: token, loggedUser: { id : user.id, name : user.name }, status: 201, message:'logged in successfully' });
        // res.cookie('jwt',token, {httpOnly:true, maxAge: 3*24*60*60*1000} )
        // res.status(200).json({ token: token, status: 201 ,message:'logged in successfully' });
        
    } else {
      res.json({status: 400, errors : "Password Incorrect" });
    }
  
  }else{
    res.json({status: 204, errors : "User does not exist" });
  }
    }



    const signout = async (req, res) => {
        try {
          res.cookie('jwt', '', {maxAge:1});
          res.redirect('/');
          // req.session = null;
          return res.status(200).send({
            message: "You've been signed out!"
          });
        } catch (err) {
          this.next(err);
        }
    }

module.exports = {
    register,
    login,
    signout,
}