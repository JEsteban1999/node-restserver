const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();


app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({estado: true}, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec()
        .then(usuarios => {
            Usuario.count({estado: true})
                .then(cuantos => {
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos,
                    });
                })
                .catch(err => {
                    return res.status(400).json({
                        ok: false,
                        err,
                    });
                });
        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                err,
            });
        });
});

app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });
    usuario.save()
    .then(usuarioDB => {
        res.json({
            ok: true,
            usuario: usuarioDB,
        });  
    }) 
    .catch(err => {
        return res.status(400).json({
            ok: false,
            err,
        });
    });    
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then(usuarioDB => {
            res.json({
                ok: true,
                usuario: usuarioDB,
            });
        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                err,
            });
        });
    // res.json({
    //     id,
    // });
});

app.delete('/usuario/:id', (req, res) => {
    //////////////////// ELIMINAR DE LA BASE DE DATOS ////////////////////
    // let id = req.params.id;
    // Usuario.findByIdAndRemove(id)
    //     .then(usuarioBorrado => {
    //         if(!usuarioBorrado) {
    //             return res.status(400).json({
    //                 ok: false,
    //                 err: {
    //                     message: 'Usuario no encontrado',
    //                 },
    //             });
    //         }
    //         res.json({
    //             ok: true,
    //             usuario: usuarioBorrado,
    //         });
    //     })
    //     .catch(err => {
    //         return res.status(400).json({
    //             ok: false,
    //             err,
    //         });
    //     });
    let id = req.params.id;
    let cambiaEstado = {
        estado: false,
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true})
        .then(usuarioBorrado => {
            if(!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado',
                    },
                });
            }
            res.json({
                ok: true,
                usuario: usuarioBorrado,
            });
        })
        .catch(err => {
            return res.status(400).json({
                ok: false,
                err,
            });
        });
});


module.exports = app;