var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'slotmachine_db'
});

module.exports = {
    connect: function() {
        return new Promise(function(resolve, reject) {
            connection.connect(function(err) {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        })
    },

    query: function(q, params) {
        return new Promise(function(resolve, reject) {
            connection.query(q, params, function(err, result) {
                if (err)
                    reject(err)
                else
                    resolve(result)
            });
        })
    },

    checkLogin: function(q, params) {
        return new Promise(function(resolve, reject) {
            connection.query(q, params, function(err, result) {
                if (err)
                    reject(err)
                else
                    resolve(result);
            });
        })
    },

    end: function() {
        return new Promise(function(resolve, reject) {
            connection.end(function(err) {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        })
    }
}