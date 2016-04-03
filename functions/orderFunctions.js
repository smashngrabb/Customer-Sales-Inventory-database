var express = require('express');
var pool = require('../config/connection.js');

module.exports.GetAllOrders = function (callback) {
    pool.query('select *, (SELECT SUM(order_details.quantity * order_details.price) FROM order_details where order_details.order_id = orders.order_id GROUP BY order_details.order_id) as Total FROM orders INNER JOIN customers on customers.customer_id = orders.customer_id INNER JOIN platforms on orders.platform_id = platforms.platform_id ORDER BY orders.date DESC', function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
}); };

module.exports.GetAllOrdersByProduct = function (product_id, callback) {
  pool.query('SELECT customers.first_name as FirstName, customers.last_name as LastName, orders.order_id as OrderId, order_details.quantity as Quantity, orders.date as Date, order_details.price as Price FROM order_details INNER JOIN orders on order_details.order_id = orders.order_id INNER JOIN customers on orders.customer_id = customers.customer_id where order_details.product_id = ' + product_id + ' ORDER BY orders.date DESC', function (err, result) {
    if (err)
      console.log(err);
    else
      callback(result);
  });
};

module.exports.GetOrderInfo = function (order_id, callback) {
    pool.query('select *, platforms.name as platform_name, orders.notes as order_notes FROM orders INNER JOIN customers on orders.customer_id = customers.customer_id INNER JOIN platforms on orders.platform_id = platforms.platform_id where orders.order_id = ' + order_id, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result);
}); };

module.exports.GetOrderItemList = function (order_id, callback) {
    pool.query('select *, platforms.name as platform_name, orders.notes as order_notes, order_details.inventory_cost as order_inventory_cost, order_details.quantity as order_quantity, products.name as product_name, order_details.first_stone_earning as product_first_stone_earning, order_details.second_stone_earning as product_second_stone_earning, order_details.third_stone_earning as product_third_stone_earning FROM order_details INNER JOIN orders on order_details.order_id = orders.order_id INNER JOIN products on order_details.product_id = products.product_id INNER JOIN customers on orders.customer_id = customers.customer_id INNER JOIN platforms on platforms.platform_ID = orders.platform_id where order_details.order_id = ' + order_id + ' ORDER BY order_details.price ASC', function (err, result) {
        if (err)
            console.log(err);
        else {
            if (result === null) {
                result = null;
            }
            callback(result);
        } }); };

module.exports.InsertOrderItem = function (item, callback) {
    pool.query('INSERT INTO order_details SET ?', { order_id: item.order_id, product_id: item.product_id, quantity: item.quantity, price: item.product_price, feedback_message: item.feedback_message, first_stone_earning: item.first_stone_earning, second_stone_earning: item.second_stone_earning, third_stone_earning: item.third_stone_earning, inventory_cost: item.inventory_cost}, function (err, result) {
	if (err)
            console.log(err);
        else
            callback(result.insertId);
}); };

module.exports.InsertOrder = function (order, callback) {
    pool.query('INSERT INTO orders SET ?', order, function (err, result) {
        if (err)
            console.log(err);
        else
            callback(result.insertId);
 }); };

module.exports.UpdateOrder = function (order, callback) {
    pool.query('UPDATE orders SET ? where order_id =' + order.order_id, order, function (err) {
        if (err)
            console.log(err);
        else
            callback(order.order_id);
}); };

module.exports.GetOrderItem = function (OrderItemId, callback) {
    pool.query('SELECT *, order_details.quantity as order_quantity FROM order_details INNER JOIN products ON products.product_id = order_details.product_id WHERE order_details_id =' + OrderItemId, function (err,result) {
        if (err)
            console.log(err);
        else
            callback(result);
}); };

module.exports.UpdateOrderItem = function(OrderItem, callback) {
    pool.query('UPDATE order_details SET order_id = ?, product_id = ?, quantity = ?, price = ?, feedback_message = ? where order_details_id = ?', [OrderItem.order_id, OrderItem.product_id, OrderItem.quantity, OrderItem.product_price, OrderItem.feedback_message, OrderItem.order_details_id], function (err, result) {
        if (err)
            console.log(err);
        else
            callback(OrderItem.order_id);
}); };
