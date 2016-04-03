var express = require('express');
var pool = require('../config/connection.js');

module.exports.GetAllVendors = function (callback) {
    pool.query('SELECT * from vendors ORDER BY vendor_id DESC',
	function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
};

module.exports.InsertVendor = function (vendor, callback) {
    pool.query('INSERT INTO vendors SET ?', vendor, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
};

module.exports.GetVendor = function (vendor_id, callback) {
    pool.query('SELECT * FROM vendors WHERE vendor_id = ' + vendor_id, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
    });
};

module.exports.VendorProduct = function (vendor_id, callback) {
    pool.query('SELECT *, product_vendor.quantity as ProductQuantity FROM product_vendor INNER JOIN products on products.product_id = product_vendor.product_id WHERE vendor_id = ' + vendor_id + ' ORDER BY date_added DESC' , function (err, products) {
        if (err)
            console.log(err);
        else
            callback(products);
    });
};

module.exports.UpdateVendor = function (vendor, callback) {
    pool.query('UPDATE vendors SET name = ?, contact_person = ?, phone_number = ?, address = ?, website = ?, email = ?, country = ?, deleted = ?, notes = ? WHERE vendor_id = ?',
    [vendor.name, vendor.contact_person, vendor.phone_number, vendor.address, vendor.website, vendor.email, vendor.country, vendor.deleted, vendor.notes, vendor.vendor_id] ,
        function (err) {
            if (err)
                console.log(err);
            else
                callback(vendor.vendor_id);
            });
};
