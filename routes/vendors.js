var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

var vendorFunctions = require('../functions/vendorFunctions.js')

// Display all Vendors
router.get('/', function (req, res) {
    vendorFunctions.GetAllVendors(function (allVendors) {
        res.render('allVendors', {
            title: 'List of Vendors',
            vendors: allVendors }); }); });

// Add new Vendor
router.get('/new', function (req, res) {
    res.render('addVendor',
	{ title: 'Add new Vendor' }); });

// --- POST
router.post('/new' , function (req, res) {
    vendorFunctions.InsertVendor(req.body, function (result) {
        res.redirect('/Vendors/' + result.insertId); }); });

// View Vendor
router.get('/:id/', function (req, res) {
    vendorFunctions.GetVendor(req.params.id, function (results) {
        if (results.length == 0) {
            res.send('Vendor does not exist <br> <a href=/Vendors>Go back</a>');}
        else {
            vendorFunctions.VendorProduct(req.params.id, function (products) {
                res.render('viewVendor', {
                    title: 'View Vendor',
                    vendor: results,
                    vendor_product: products }); }); } }); });

// Edit Vendor
router.get('/Edit/:id', function (req, res) {
    vendorFunctions.GetVendor(req.params.id, function (results) {
        if (results.length == 0) {
            res.send('Vendor does not exist <br> <a href=/Vendors>Go back</a>'); }
        else {
            res.render('editVendor', {
                title: 'View Vendor',
                vendor: results }); } }); });

// --- POST
router.post('/Edit/:id', function (req, res) {
    var Vendor = req.body;
    vendorFunctions.UpdateVendor(Vendor, function () {
        res.redirect('/Vendors/' + req.params.id);
    });
});

module.exports = router;
