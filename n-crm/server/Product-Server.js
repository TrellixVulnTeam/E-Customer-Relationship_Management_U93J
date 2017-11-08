let Product = require('../model/Product');

module.exports = function(app) {
    // Load Home page
    app.get('/create-product',function(req,res){
        res.render('add_product');
    });
    app.post('/testAddDB', function (req,res) {
        let product = new Product();
        product.product_id = "PR002";
        product.product_name = "Coca cola";
        product.image = "D://coca-cocla.png";
        product.description = "Sugar water";

        product.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                // req.flash('success', 'Product Add Success');
            }
        });
    })
}