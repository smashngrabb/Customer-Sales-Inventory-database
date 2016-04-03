var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

var productFunctions = require('../functions/productFunctions.js');
var orderFunctions = require('../functions/orderFunctions.js');

// All Products
router.get('/', function (req, res) {
	productFunctions.GetAllProducts(function (result) {
		res.render('allProducts', {
			title: 'All Products',
			products: result
}); }); });

// Add Product
router.get('/New/', function (req, res) {
		res.render('addProduct', {
			title: 'Add Product'
}); });

// --- POST
router.post('/New' , function (req, res) {
    productFunctions.InsertProduct(req.body, function (result) {
        res.redirect('/Products/'); }); });

// View Product
router.get('/:id/', function (req, res) {
    productFunctions.GetProduct(req.params.id, function (results) {
        if (results.length == 0) {
            res.send('Product does not exist <br> <a href=/Products>Go back</a>');}
        else {
            productFunctions.VendorProduct(req.params.id, function (supplies) {
							orderFunctions.GetAllOrdersByProduct(req.params.id, function (orders) {
								res.render('viewProduct', {
                    title: 'View Product',
                    product: results,
                    supplies: supplies,
									 	orders: orders }); }); }); } }); });


// Edit Product (GET)
router.get('/Edit/:id', function (req, res) {
	productFunctions.GetProduct(req.params.id, function (result) {
		res.render('editProduct', {
			title: 'Edit Product',
			product: result
}); }); });

// --- POST
router.post('/Edit', function (req,res) {
	productFunctions.UpdateProduct(req.body, function (result) {
		res.redirect('/Products/' + req.body.product_id);
}); });

// Add new Supply (GET)
router.get('/Item/Supply/New/:id', function (req, res) {
    productFunctions.GetAllProducts(function (Products) {
           res.render('addSupply', {
                title: 'Add new Supply',
                data: JSON.stringify(Products),
                item: {product_id: '', name: '', vendor_id: req.params.id}});
});	});

// Add new Supply (POST)
router.post('/Item/Supply/New', function (req, res) {
    productFunctions.NewSupply(req.body, function (insertId) {
            res.redirect('/Vendors/' + req.body.vendor_id);
});	});

// ---------------------------------------- WORKING ON THIS!! ------------------------------------------------------

// View Order Item
router.get('/Item/Supply/:id', function (req, res) {
    productFunctions.GetSupply(req.params.id, function (OrderItem) {
        productFunctions.GetAllProducts(function (Products) {
           res.render('editSupply', {
                title: 'View Item',
                data: JSON.stringify(Products),
                item: OrderItem
}); }); }); });

// --- POST
router.post('/Item/Supply/', function (req, res) {
    productFunctions.EditSupply(req.body, function (unique_id) {
            res.redirect('/Products/' + req.body.product_id);
}); });

module.exports = router;
