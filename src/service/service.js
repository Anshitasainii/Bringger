let sellerModel = require("../model/seller");
let productModel = require("../model/product");
let transactionModel = require("./../model/transaction");
let randomstring = require("randomstring");
let nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let mongoose = require("mongoose");

const transporter = nodemailer.createTransport({
  service: 'gmail',// E.g., 'Gmail' or use your SMTP server settings
  auth: {
    user: 'aceisop107@gmail.com',
    pass: 'jrssmgnffnyszecj',
  },
});


exports.register_data_save = async (req) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    req.body.pass = bcrypt.hashSync(req.body.pass, salt);
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let number = req.body.mobile;
    const otp = randomstring.generate({
      length: 6,
      charset: 'numeric'

    });

    const mailOptions = {
      from: 'aceisop107@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.redirect('/send-otp?message=Error sending OTP');
      }
    });
    let savedata = new sellerModel({
      name: name,
      email: email,
      password: pass,
      mobile: number,
      otp: otp,
      img: 'image.png'
    });

    let saved_data = await savedata.save();
    if (saved_data)
      return {
        message: "data saved",
        data: saved_data,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: [],
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};

//verify
exports.verify_otp = async (req, res) => {
  try {
    let email = req.body.email;
    let otp = req.body.otp;
    let data = await sellerModel.findOne({ email: email })
    if (data && data.otp == otp) {
      return {
        message: "data saved",
        data: data,
        sucess: true,
      };
    }
    else {
      await sellerModel.findByIdAndDelete({ _id: data._id });
      return {
        message: "data not saved",
        data: [],
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};


//login
exports.login_data_validation = async (req, res) => {
  try {
    let data = await sellerModel.findOne({ email: req.body.email });
    if (data) {
      let matchpass = bcrypt.compareSync(req.body.pass, data.password);
      if (matchpass) {
        const token = jwt.sign(
          { _id: data._id.toString() },
          process.env.SECRET_KEY
        );
        await sellerModel.findByIdAndUpdate(
          { _id: data._id },
          { auth_key: token }
        );
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 10000 * 60 * 60), //1 minit
          httpOnly: true,
          overwrite: true,
        });
        return {
          name: data.name,
          message: "user is logined",
          sucess: true,
          img: data.img,
          status: 200,
        };
      } else {
        return {
          message: "invalid credentials",
          sucess: false,
          status: 300,
        };
      }
    } else {
      return {
        message: "invalid credentials",
        sucess: false,
        status: 300,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

};

//add product
exports.addproduct = async (req) => {
  try {

    let name = req.body.name;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let category = req.body.category;
    let gender = req.body.gender;
    let image = req.file.filename;
    let adddata = new productModel({
      p_name: name,
      p_price: price,
      Quantity: quantity,
      category: category,
      gender: gender,
      p_image: image,
    });
    let saved_data = await adddata.save();

    if (saved_data)
      return {
        message: "data saved",
        data: saved_data,
        img: req.user.img,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: [],
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
};

//updating data

exports.updateproduct = async (req) => {
  try {
    let price = req.body.price;
    let quantity = req.body.quantity;
    let id = req.body.id;
    console.log(id)
    let updatedata = await productModel.findByIdAndUpdate({ _id: id }, {
      p_price: price,
      Quantity: quantity,
    });
    if (updatedata) {
      return {
        message: "data saved",
        data: updatedata,
        img: req.user.img,
        sucess: true,
      };

    }
    else {
      return {
        message: "data not saved",
        data: [],
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
};


//viewproduct
exports.viewproduct = async (req, res) => {
  try {

    let data = await productModel.find();
    if (data) {
      if (req.user) {
        return {
          name: req.user.name,
          data: data,
          message: "user is logined",
          img: req.user.img,
          sucess: true,
          status: 200,
        };
      }
    } else {
      return {
        data: data,
        message: "invalid credentials",
        sucess: false,
        status: 300,
      };
    }
  }
  catch (error) {
    console.log("error", error);
  }
};

//filter products

exports.filter_product = async (req, res) => {
  try {
    let condition = {};
    if (req.body.filtername) {
      condition.p_name = req.body.filtername;
    }
    if (req.body.filterprice) {
      condition.p_price = req.body.filterprice;
    }
    if (req.body.filtercategory) {
      condition.category = req.body.filtercategory;
    }
    if (req.body.filterquantity) {
      condition.Quantity = req.body.filterQuantity;
    }
    console.log(condition)
    let data = await productModel.find(condition);
    if (data) {
      if (req.user && data) {
        return {
          name: req.user.name,
          data: data,
          message: "user is logined",
          img: req.user.img,
          sucess: true,
          status: 200,
        };
      }
    } else {
      return {
        data: data,
        message: "invalid credentials",
        sucess: false,
        status: 300,
      };
    }
  }
  catch (error) {
    console.log("error", error);
  }
};


//signout
exports.signout = async (req, res) => {

  try {
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
      let data = await sellerModel.findOneAndUpdate({ auth_key: token }, { auth_key: null });
      res.cookie("jwt", '');
      if (data) {
        return {
          data: data,
          message: "user is logined",
          sucess: true,
          status: 200,
        };
      } else {
        return {
          data: data,
          message: "invalid credentials",
          sucess: false,
          status: 300,
        };
      }
    }
  }
  catch (error) {
    console.log("error", error);
  }
};



//sellerProfile
exports.sellerprofile = async (req, res) => {
  try {
    if (req.user) {
      let data = await sellerModel.findOne({ _id: req.user._id });

      if (data) {
        return {
          data: data,
          message: "user is logined",
          img: req.user.img,
          sucess: true,
          status: 200,
        };
      } else {
        return {
          message: "invalid credentials",
          sucess: false,
          status: 300,
        };
      }
    }
  }
  catch (error) {
    console.log("error", error);
  }

};

//Updating seller data
exports.update_profile = async (req, res) => {
  try {
    if (req.user) {
      let name = req.body.name;
      let mobile = req.body.mobile;
      let image = req.file.filename;
      let email = req.file.email;
      let updatedata = await sellerModel.findOneAndUpdate({ auth_key: req.user.auth_key }, {
        name: name,
        mobile: mobile,
        img: image,
        email: email
      });


      if (updatedata)
        return {
          name: name,
          message: "data saved",
          mobile: mobile,
          email: updatedata.email,
          img: updatedata.img,
          sucess: true,
        };
      else {
        return {
          message: "data not saved",
          data: null,
          sucess: false,
        };
      }
    }
  } catch (error) {
    console.log("error", error);
  }

};
exports.change_pass = async (req, res) => {
  try {

    let id = req.body.id;
    let oldpass = req.body.oldpass;
    let salt = bcrypt.genSaltSync(10);
    req.body.pass = bcrypt.hashSync(req.body.pass, salt);
    let pass = req.body.pass;
    console.log(id, oldpass, pass);
    let data = await sellerModel.findOne({ _id: id });
    if (data) {
      let matchpass = bcrypt.compareSync(oldpass, data.password);
      if (matchpass) {
        let updatedata = await sellerModel.findByIdAndUpdate({
          _id: id
        },
          {
            password: pass,
          });
        if (updatedata) {
          return {
            message: "data saved",
            img: req.user.img,
            sucess: true,
          };
        } else {
          return {
            message: "data not saved",
            data: null,
            sucess: false,
          };
        }
      } else {
        return {
          message: "password not match",
          data: null,
          sucess: false,
        };
      }
    } else {
      return {
        message: "data not saved",
        data: null,
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

};


exports.transaction_view = async (req, res) => {
  try {

    let data = await transactionModel.find();
    if (data) {
      if (req.user) {
        return {
          name: req.user.name,
          data: data,
          message: "user is logined",
          sucess: true,
          img: req.user.img,
          status: 200,
        };
      }
    } else {
      return {
        data: data,
        message: "invalid credentials",
        sucess: false,
        status: 300,
      };
    }
  }
  catch (error) {
    console.log("error", error);
  }
};

exports.filter_transaction = async (req, res) => {
  try {
    let condition = {};
    if (req.body.filtername) {
      condition.product_name = req.body.filtername;
    }
    if (req.body.filterproductid) {
      condition.product_id = req.body.filterproductid;
    }
    if (req.body.filteramount) {
      condition.amount = req.body.filteramount;
    }
    if (req.body.filtertransactionid) {
      condition.amount = req.body.filtertransactionid;
    }
    console.log(condition)
    let data = await transactionModel.find(condition);
    console.log(data)
    if (data) {
      if (req.user && data) {
        return {
          name: req.user.name,
          data: data,
          message: "user is logined",
          img: req.user.img,
          sucess: true,
          status: 200,
        };
      }
    } else {
      return {
        data: data,
        message: "invalid credentials",
        sucess: false,
        status: 300,
      };
    }
  }
  catch (error) {
    console.log("error", error);
  }
};
//end