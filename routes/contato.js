var Contato = require('./../models/contato');

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
            Contato.findOne({'numero': req.body.numero}, (err, contato) => {
                if (contato == null) {
                    Contato.create(req.body, (err, resultado) => {
                        if(err){
                            res.send(err);
                        }
                        res.json(resultado);
                    });
                    return 
                }
                
                contato.idGrupo.push(req.body.idGrupo);
                contato.save((err, contato) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.send(contato);
                });
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
                            console.log(sucesso);
                        }
            );
            
            res.json("OK");
        })
        .delete((req, res) => {
            Contato.findByIdAndRemove(req.params.id, (err, resultado) => {
                if(err){
                    return res.send(err);
                }
                res.json(resultado);
            });
        });
}