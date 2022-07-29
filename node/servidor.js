var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://localhost:27017/lista-de-pacientes');
var Lista = mongoose.model( 'Lista' , {
    nombre: String,
    rut: String,
    fechaNacimiento: String,
    ingreso: String,
    direccion: String,
    telefono: String,

    terminado: Boolean
    
} );

app.configure( function(){
    app.use(express.static( __dirname + '/publico'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    next();
})

 app.get('/', function(req,res){
   res.sendFile('./publico/index.html');
   });

app.post('/pacientes/lista', function(req,res){
    Lista.create({
        nombre: req.body.nombre,
        rut: req.body.rut,
        fechaNacimiento: req.body.fechaNacimiento,
        ingreso: req.body.ingreso,
        direccion: req.body.direccion,
        telefono: req.body.telefono

    }, function(error,lista){
        if(error){
            res.send(error);
        }
        Lista.find(function(error,lista){
            if(error){
                res.send(error);

            }
            res.json(lista);
        })
    })
})
app.get('/pacientes/lista', function(_req,res){
    Lista.find(function(error,lista){
        if(error){
            res.send(error);
        }
        res.json(lista);
    })
})
app.delete('/pacientes/lista/:item', function(req,res){
    Lista.remove({
        _id:req.params.item
    }, function(error,lista){
        if(error){
            res.send(error);
            Lista.find(function(error,lista){
                if(error){
                    res.send(error);
                }
                res.json(lista);
            })
        }
    })
})
app.put('/pacientes/lista/:item', function(req,res) {
    Lista.findOneAndUpdate(
        {_id: req.params.item},
        {terminado:true},
        function(error,lista){
            if(error){
                res.send(error);
            }
            Lista.find(function(error,lista){
                if(error){
                    res.send(error);
                }
                res.json(lista)
            })
        }
    )
})
const puerto = process.env.PUERTOS || 3009;
const servidor = process.env.HOSTORG || "localhost";
app.listen(puerto, () => console.log(`Servidor Disponible >>> http://${servidor}:${puerto} <<`));
