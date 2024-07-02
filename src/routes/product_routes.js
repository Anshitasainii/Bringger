const express = require("express");
const product_router = express.Router();
const auth = require("../../middleware/adminauth");
const multer = require("multer");
const storage= multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "././public/p_images/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const upload = multer({ storage: storage })
let {
    updateproduct,
    viewproduct,
    addproduct,
    addproductpage,
    update_product_page,
    filter_product,

}=  require("./../controller/controller");


product_router.get("/add_product_page",auth,addproductpage);
product_router.post("/updateproduct",auth,updateproduct);
product_router.post("/updateproduct_page", auth,update_product_page);
product_router.post("/add_product",upload.single("editphoto"),auth,addproduct);
product_router.get("/viewproduct",auth,viewproduct);
product_router.get("/filterproduct",auth,filter_product);


module.exports = product_router;