var express = require('express');
var router = express.Router();
var todoConnections = require('../Connections/todosConnection');

function getAllData(res){
    todoConnections.getConnection(function(err, connection) {
        // Use the connection
        connection.query( 'SELECT id, text, isDone from todos', function(err, rows) {
            res.json(rows);
            // And done with the connection.
            connection.release();
        });
    });
}


router.get('/init-data',function(req,res){

    var todosData = [
            ['Thuc hanh lai tu dau', 0],
            ['Become Expert', 0]
        ];

    todoConnections.getConnection(function(err, connection) {
        // Use the connection
        connection.query( 'INSERT INTO todos (`text`,`isDone`) VALUES ?',[todosData], function(err, rows) {
            if (err){
                res.status(500).json(err);
            }
            else {
                getAllData(res);
            }
        });
    });
});

router.get('/datas',function(req,res){
    getAllData(res);
});

router.post('/create',function(req,res){
    var todo = {
        text: req.body.text,
        isDone: req.body.isDone
    };

    if ( !req.body.text ) {
        res.status(500).send('Need param text to create');
    }

    todoConnections.getConnection(function(err, connection) {
        // Use the connection
        connection.query( 'INSERT INTO todos SET ?',todo, function(err, rows) {
            if (err){
                res.status(500).json(err);
            }
            else {
                getAllData(res);
            }
        });
    });
});

router.put('/update',function(req,res){
    var id = req.body.id;
    var text = req.body.text;
    var isDone = req.body.isDone;
    if ( !id ) {
        res.status(500).send('Need param ID to update');
    }

    todoConnections.getConnection(function(err, connection) {
        // Use the connection
        connection.query( 'UPDATE todos SET text = ? , isDone = ? WHERE id = ? ',[text,isDone,id], function(err, rows) {
            if (err){
                res.status(500).json(err);
            }
            else {
                getAllData(res);
            }
        });
    });

});

router.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    if( !id ) {
        res.status(500).send('Need id to delete');
    }

    todoConnections.getConnection(function(err, connection) {
        // Use the connection
        connection.query( 'DELETE FROM todos  WHERE id = ? ',[id], function(err, rows) {
            if (err){
                res.status(500).json(err);
            }
            else {
                getAllData(res);
            }
        });
    });

});

module.exports = router;