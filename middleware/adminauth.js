const jwt = require("jsonwebtoken");
const sellerModel = require("../src/model/seller");

module.exports = async (req, res, next) => {
  try {
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
      const { _id } = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await sellerModel.findOne({ _id });
      if (req.user) {
        next();
      } else {
        res.render("sellerlogin");
      }
    } else {
      res.render("sellerlogin");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
};
