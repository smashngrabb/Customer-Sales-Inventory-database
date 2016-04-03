var express = require('express');
var router = express.Router();

var pool = require('../config/connection.js');

var orderFunctions = require('../functions/orderFunctions.js');
var otherFunctions = require('../functions/otherFunctions.js');
var productFunctions = require('../functions/productFunctions.js');
var inventoryFunctions = require('../functions/inventoryFunctions.js');


// All Orders
router.get('/', function (req, res) {
    orderFunctions.GetAllOrders(function (allOrders) {
        res.render('allOrders', {
            title: 'List of Orders',
            orders: allOrders
}); }); });

// Add New Order
router.get('/New/:id', function (req, res) {
    otherFunctions.GetPlatforms(function (allPlatforms) {
        res.render('addOrder', {
            title: 'Add new Order',
            customerID : req.params.id,
            platforms: allPlatforms
}); });	});

// --- POST
router.post('/New', function (req, res) {
    orderFunctions.InsertOrder(req.body, function (OrderId) {
            res.redirect('/Orders/' + OrderId);
}); });

// View Order
router.get('/:id', function (req, res) {
    orderFunctions.GetOrderInfo(req.params.id, function (OrderInfo) {
        orderFunctions.GetOrderItemList(req.params.id, function (ItemList) {
            res.render('viewOrder', {
                title: 'View Order',
                order: OrderInfo,
                itemList: ItemList
}); }); }); });

// Edit Order
router.get('/Edit/:id', function (req, res) {
    otherFunctions.GetPlatforms(function (allPlatforms) {
        orderFunctions.GetOrderInfo(req.params.id, function (results) {
            res.render('editOrder', {
                title: 'Edit Order',
                order: results,
                platforms: allPlatforms
}); }); }); });



// --- POST
router.post('/Edit', function (req, res) {
    orderFunctions.UpdateOrder(req.body, function (order_id) {
       res.redirect('/Orders/' + order_id);
}); });


// Add new Item to Order (GET)
router.get('/Item/New/:id', function (req, res) {
    productFunctions.GetAllProducts(function (Products) {
           res.render('addItem', {
                title: 'View Item',
                data: JSON.stringify(Products),
                item: {product_id: '', name: '', price: '', first_stone_earning: '',second_stone_earning: '', third_stone_earning: '' , order_id: req.params.id}});
});	});

// Add new Item to Order (POST)
router.post('/Item/New', function (req, res) {
    orderFunctions.InsertOrderItem(req.body, function (insertId) {
        inventoryFunctions.UpdateInventory(req.body, function () {
            res.redirect('/Orders/' + req.body.order_id);
        });
});	});

// View Order Item
router.get('/Item/:id', function (req, res) {
    orderFunctions.GetOrderItem(req.params.id, function (OrderItem) {
        productFunctions.GetAllProducts(function (Products) {
           res.render('editItem', {
                title: 'View Item',
                data: JSON.stringify(Products),
                item: OrderItem
}); }); }); });

// --- POST
router.post('/Item', function (req, res) {
    orderFunctions.UpdateOrderItem(req.body, function (orderId) {
        inventoryFunctions.UpdateInventory(req.body, function () {
            res.redirect('/Orders/' + orderId);
}); }); });

module.exports = router;
