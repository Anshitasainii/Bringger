let {
  register_data_save,
  login_data_validation,
  updateproduct,
  addproduct,
  viewproduct,
  signout,
  sellerprofile,
  update_profile,
  verify_otp,
  change_pass,
  filter_product,
  transaction_view,
  filter_transaction,
} = require("./../service/service");
//register page
exports.register = async (req, res) => {
  res.render("register");
};
//register
exports.register_data_save = async (req, res) => {
  let data = await register_data_save(req);
  if (data.sucess) {
    res.render("otpsend", { data:data.data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
//login page
exports.login = async (req, res) => {
  res.render("sellerlogin");
};

exports.faq = async (req, res) => {
  res.render("FAQ",{data:req.user});
};
exports.contact = async (req, res) => {
  res.render("contact",{data:req.user});
};
//login
exports.login_data_validation = async (req, res) => {
  let data = await login_data_validation(req, res);
  if (data.sucess) {
    res.render("dashboard", { data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
//dashboard
exports.dashboard=async(req,res)=>{
  if (req.user) {
    console.log(req.user)
    res.render("dashboard", { data:req.user });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
//add product page
exports.addproductpage=async(req,res)=>{
  if (req.user) {
    res.render("addproduct", { data:req.user });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
//add product
exports.addproduct = async (req, res) => {

  let data = await addproduct(req, res);

  if (data.sucess) {
    // req.flash("success","data add succesfully")
    res.redirect("/viewproduct");
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
// update product
exports.update_product_page=async(req,res)=>{
  if (req.user) {
    let data={
      name:req.user.name,
      id:req.body.id
    };
    res.render("updateproduct" ,{data} );
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
// update product
exports.updateproduct = async (req, res) => {
  let data = await updateproduct(req);
  if (data.sucess) {
    res.redirect("/viewproduct" );
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};

exports.viewproduct = async (req, res) => {
  res.locals.message = req.flash();
  let data = await viewproduct(req,res);
  if (data.sucess) {
    res.render("viewproduct", { product: data.data , data});
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};
//signout
exports.signout = async (req, res) => {
  let data = await signout(req, res);
  if (data.sucess) {
    res.redirect("/");
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};
//profile update page
exports.profileupdate = async (req, res) => {
  res.render("profileupdate",{data:req.user});
};
//update profile
exports.update_profile = async (req, res) => {
  let data = await update_profile(req);
  if (data.sucess) {
    res.render("sellerprofile", { data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
//seller profile
exports.sellerprofile = async (req, res) => {
  res.locals.message = req.flash();
  let data = await sellerprofile(req, res);
  if (data.sucess) {
    res.render("sellerprofile", { data: data.data });
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};
//verify otp
exports.verify_otp = async (req, res) => {
  let data = await verify_otp(req, res);
  if (data.sucess) {
    res.render("sellerlogin");
  } else {
    res.render("register");
  }
};
//change pass page
exports.change_pass_page = async (req, res) => {
  if (req.user) {
    res.render("changepass",{data:req.user});
  } else {

    res.render("register");
  }
};
 // change pass
exports.change_pass = async (req, res) => {
  let data = await change_pass(req, res);
  if (data.sucess) {
    res.redirect("/signout");
  } else {
    res.send({ staus: 400, message: "not changed", data: [], sucess: false });
  }
};
//filter product
exports.filter_product= async (req, res) => {
  res.locals.message = req.flash();
  let data = await filter_product(req,res);
  if (data.sucess) {
    res.render("viewproduct", { product: data.data , data});
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};
//transaction view
exports.transaction_view = async (req, res) => {
  res.locals.message = req.flash();
  let data = await transaction_view(req,res);
  if (data.sucess) {
    res.render("viewtransaction", { transaction: data.data , data});
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};
//filter transaction
exports.filter_transaction = async (req, res) => {
  res.locals.message = req.flash();
  let data = await filter_transaction(req,res);
  if (data.sucess) {
    res.render("viewtransaction", { transaction: data.data , data});
  } else {
    res.send({ staus: 400, message: "not applicable service", data: [], sucess: false })
  }
};
//end