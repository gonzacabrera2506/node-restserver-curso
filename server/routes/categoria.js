const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

///
///MOSTRAR TODAS LAS CATEGORIAS
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario','nombre email')
        .exec((err, categorias) => {
            
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });
        });

});

///
///MOSTRAR UNA CATEGORIA POR ID
app.get('/categoria/:id', verificaToken, (req, res) => {
    //Categoria.findById(..);

    let id = req.params.id;
    Categoria.findById(id, (err, categoriaID) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaID) {
            return res.status(400).json({
                ok: false,
                err : {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaID
        });

    });
    
});

///
///CREAR UNA NUEVA CATEGORIA
app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoria
    //req.usuario._id
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriaDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

///
///ACTUALIZAR CATEGORIA
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate( id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
        
    });
});

///
///BORRAR CATEGORIA
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    //solo un administrador puede borrar
    //Categoria.findByIdAndRemove
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) =>{

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if( !categoriaBorrada ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        });
    });

});




module.exports = app;