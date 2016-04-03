var express = require('express');
var pool = require('../config/connection.js');

module.exports.GetAllProducts = function (callback) {
	pool.query('SELECT *, products.name as label FROM products where products.status = 0 ORDER BY quantity ASC', function (err, result) {
		if (err)
			console.log(err);
		else
			callback(result);
}); };

module.exports.InsertProduct = function (product, callback) {
    pool.query('INSERT into products SET ?', product , function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
}); };

module.exports.GetProduct = function (productId, callback) {
    pool.query('SELECT * FROM products WHERE product_id = ' + productId , function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
}); };

module.exports.UpdateProduct = function (product, callback) {
    pool.query('UPDATE products SET name = ?, status = ?, default_price = ?, quantity = ?, first_stone_earning = ?, second_stone_earning = ?, third_stone_earning = ?, inventory_cost = ? where product_id = ' + product.product_id, [product.name, product.status, product.price, product.quantity, product.first_stone_earning, product.second_stone_earning, product.third_stone_earning, product.inventory_cost], function (err) {
        if (err)
            console.log(err);
        else
            callback(null);
}); };

module.exports.NewSupply = function (data, callback) {
    pool.query('INSERT INTO product_vendor SET ?', data, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
}); };

module.exports.GetSupply = function (unique_id, callback) {
    pool.query('SELECT *, products.name as ProductName, product_vendor.quantity as ProductQuantity FROM product_vendor INNER JOIN products on products.product_id = product_vendor.product_id WHERE unique_id = ' + unique_id, function (err, result) {
				if (err)
            console.log(err);
        else
            callback(result);
}); };

module.exports.EditSupply = function (data, callback) {
    pool.query('UPDATE product_vendor SET date_added = ?, product_id = ?, weight = ?, cost = ?, quantity = ?, quality = ?, notes = ? where unique_id = ' + data.unique_id, [data.date_added, data.product_id, data.weight, data.cost, data.quantity, data.quality, data.notes], function (err, result) {
        if (err)
            console.log(err);
        else
            callback(null);
}); };

module.exports.VendorProduct = function (product_id, callback) {
    pool.query('SELECT *, product_vendor.notes as SupplyNotes FROM product_vendor INNER JOIN vendors on vendors.vendor_id = product_vendor.vendor_id WHERE product_vendor.product_id = ' + product_id + ' ORDER BY date_added DESC' , function (err, products) {
        if (err)
            console.log(err);
        else
            callback(products);
    });
};
