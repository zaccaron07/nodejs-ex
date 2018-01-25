var Contato = require('./../models/contato');
var mongoose = require('mongoose');

module.exports = app => {
  app.route("/contact")
    .get((req, res) => {
      Contato.find((err, contatos) => {
        if(err){
          return res.send(err);
        }
      res.json(contatos);
      });
    })
    .post((req, res) => {
      if(!req.body._id) {
        req.body._id = new mongoose.mongo.ObjectID();
      }
      Contato.findOneAndUpdate({_id: req.body._id}, req.body, {upsert: true}, (err, result) => {
        if(err){
          console.log("server/routes/contato.js Erro /contact.post "  + err);
        }
        res.json(result);
      });
    });        
  app.route("/contact/:id_grupo")
    .get((req, res) => {
      Contato.find({'idGrupo.grupo': req.params.id_grupo}, {'nome':1, 'numero':1, 'idGrupo.$':1},
        (err, contato) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(contato);
      });
    })
    .put((req, res) => {
      Contato.updateOne(
        {
          "_id": req.params.id_grupo, 
          "idGrupo.grupo": req.body.idGrupo[0].grupo
        },
        { $set: {"nome": req.body.nome,
                "numero": req.body.numero,
                "idGrupo.$.participa": req.body.idGrupo[0].participa} },
                (err, sucesso) => {
                  console.log('server/routes/contato.js Erro /contact/:id_grupo.put' + sucesso);
                }
      );
      res.json("OK");
    })
    .delete((req, res) => {
      Contato.findByIdAndRemove(req.params.id_grupo, (err, resultado) => {
        if(err){
          return res.send(err);
        }
        res.json(resultado);
      });
    });

  app.route("/contactUser/:id_numero")
    .get((req, res) => {
      
      Contato.findOne({'numero': req.params.id_numero},(err, contato) => {
        if (err) {
            return res.send(err);
        }
        res.json(contato);
      });
    })
}