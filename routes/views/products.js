const keystone = require("keystone");
const Product = keystone.list("Product");
const p = require("es6-promisify").promisify;

exports = module.exports = async function(req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  locals.section = "products";

  locals.products = await p(Product.paginate({
    page: req.query.page || 1,
    perPage: 12,
    maxPages: 5
  })
    .where("sold", false)
    .populate("currentBid")
    .sort("-createdAt")
    .exec)();

  view.render("products");
};
