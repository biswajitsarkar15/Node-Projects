const adminModel=require('../models/admin.model')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
class AdminController {
  constructor() {}

  async userAuth(req, res, next) {
    try {
      if (req.user) {
        next();
      } else {
        res.redirect("/");
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * @Method showIndex
   * @Description To Show The Index Page / Login Page
   */
  async showIndex(req, res) {
    try {
      res.render("admin/index", {
        title: "Admin || Login",
      });
    } catch (err) {
      throw err;
    }
  }


  /**
   * 
   * @Method: Register 
   */
  async getRegister(req,res){
    try {
     res.render('admin/register',{
     title: "Admin || Register"}) 
    } catch (err) {
      throw err
    }
  }

  async register(req,res){
    try {
      console.log(req.file);
      req.body.image = req.file.filename;

      if(req.body.password === req.body.confirmPassword){
        req.body.password = bcrypt.hashSync(
          req.body.password,bcrypt.genSaltSync(10)
        )
       console.log(req.body);
       let saveData =await adminModel.create(req.body)
       if(saveData && saveData._id){
           console.log('Register...');
           res.redirect('/')
       }else{
           console.log('Not Register..');
           res.redirect('/getRegister')
       }
      }else{
        console.log('confirmPassword and password should be matched');
        res.redirect('/')
      }
     
    } catch (error) {
      throw error
    }
  }

  async login(req,res){
    try {
      let isUserExist =await adminModel.findOne({
        email:req.body.email,
      })
     console.log(isUserExist);
    if(isUserExist){
      const hashPassword=isUserExist.password;
      if(bcrypt.compareSync(req.body.password,hashPassword)){
       
        const token = jwt.sign(
          {
            id: isUserExist._id,
            email: isUserExist.email,
            name: `${isUserExist.firstName} ${isUserExist.lastName}`,
            image: isUserExist.image,

          },
          "ME3DS8TY2N",
          { expiresIn: "10m" }
        );

        console.log('Logged In...');
      // res.redirect('/dashboard')

      res.cookie("userToken", token);
      res.redirect("/dashboard");
      }else{
        console.log('Login Failed');
        res.redirect('/')
      }
    }else{
      console.log('Email not Exist');
      res.redirect('/')
    }
    } catch (error) {
      throw error
    }
  }



  /**
   * @Method dashboard
   * @Description To Show The Dashboard
   */
  async dashboard(req, res) {
    try {
      res.render("admin/dashboard", {
        title: "Admin || Dashboard", 
        user:req.user,
      })
    } catch (err) {
      throw err;
    }
  }

  /**
   * @Method template
   * @Description Basic Template
   */
   async template(req, res) {
    try {
      res.render("admin/template", {
        title: "Admin || Template"
      })
    } catch (err) {
      throw err;
    }
  }

  async logout(req, res) {
    try {
      console.log(req.cookies);
      res.clearCookie("userToken");
      console.log("Cookie Cleared!");
      res.redirect("/");
    } catch (error) {
      
      throw error;
    }
  }
  async table(req, res) {
    try {
      let adminData = await adminModel.find({});
      res.render("admin/table", {
        title: "Admin||Data",
        adminData,
        user: req.user,
      });
    } catch (err) {
      throw err;
    }
  }

}

module.exports = new AdminController();
