var Grupo = require('./../models/grupo');
var mongoose = require('mongoose');

module.exports = app => {
  app.route("/group")
    .get((req, res) => {
      Grupo.find((err, grupos) => {
        if(err){
          return res.send(err);
        }
        res.json(grupos);
      });
    })
    .post((req, res) => {
      var grupo = new Grupo(req.body);

      Grupo.bulkWrite([
        {
          insertOne: {
            document: grupo
          }
        }
      ], (err, resultado) =>{
        if(err){
          return res.send(err);
        }
        res.json(resultado);
      });
    });

  app.route("/groupUsuario")
    .get((req, res) =>{
      var parametros = [];
      //Se for um Array percore os elementos
      if(req.query.idGrupo){
        if(req.query.idGrupo.toString().includes(',')) {
          for(var elemento in req.query.idGrupo){
            parametros.push(req.query.idGrupo[elemento]);
          }
        } else {
          parametros.push(req.query.idGrupo);
        }
      }

      Grupo.find({ _id :{ $in : parametros }}, (err, grupo) => {
        if (err) {
          return res.send(err);
        }
        res.json(grupo);
      });
    });
  app.route("/group/:id")
    .put((req, res) => {
      Grupo.findById(req.params.id, (err, grupo) => {
        if (err) {
            res.status(500).send(err);
        } else {
          grupo.nome = req.body.nome || grupo.nome;
          grupo.descricao = req.body.descricao || grupo.descricao;
          grupo.horaInicial = req.body.horaInicial || grupo.horaInicial;
          grupo.horaFinal = req.body.horaFinal || grupo.horaFinal;
          grupo.data = req.body.data || grupo.data;

          grupo.save((err, grupo) => {
            if (err) {
              res.status(500).send(err);
            }
            res.status(200).send(grupo);
          });
        }
      });
    })
    .delete((req, res) => {
      Grupo.findByIdAndRemove(req.params.id, (err, resultado) => {
        if(err){
          return res.send(err);
        }
        res.json(resultado);
      });
    });
}