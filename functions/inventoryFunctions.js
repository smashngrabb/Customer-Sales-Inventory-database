var express = require('express');
var pool = require('../config/connection.js');

module.exports.UpdateInventory = function (item, callback) {
    pool.query('UPDATE products SET quantity = quantity - ' + (item.quantity - item.quantityOld) + ' WHERE product_id = ' + item.product_id,
        function (err) {
            if (err)
                console.log(err);
            else
                callback(null);
            });
};