const express = require("express");
const router = express.Router();
const auth = require("../../middleware/adminauth");
const multer = require("multer");
const storage= multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "././public/images/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const upload = multer({ storage: storage })
let {
  register,
  register_data_save,
  login_data_validation,
  login,
  signout,
  sellerprofile,
  profileupdate,
  update_profile,
  dashboard,
  verify_otp,
  change_pass_page,
  change_pass,
  transaction_view,
  filter_transaction,
  faq,
  contact
} = require("./../controller/controller");
router.post("/update_profile",upload.single("editphoto"),auth,update_profile)
router.get("/register", register);
router.get("/",login);
router.post("/register_data_save", register_data_save);
router.post("/login-data-validation", login_data_validation);
router.get("/dashboard", auth,dashboard);
router.post("/verify-otp",verify_otp);
router.post("/flash",async(req,res)=>{
    res.render("/flash")
  });
  router.get("/signout",signout);
  router.get("/sellerprofile",auth,sellerprofile);
  router.get("/profileupdate",auth,profileupdate);
  router.get("/change_pass_page",auth,change_pass_page);
  router.post("/change_pass",auth,change_pass);
  router.get("/viewtransaction",auth,transaction_view);
  router.post("/filtertransaction",auth,filter_transaction);
  router.get("/faq",auth,faq);
  router.get("/contact",auth,contact);
  
module.exports = router;
