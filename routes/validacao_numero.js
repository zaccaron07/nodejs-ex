var authy = require('authy')('reyNd3dpOLg81Ki3MHU6DxXBLrQcjhGr');

module.exports = app => {
    app.route("/verifyCode")
    .post((req, res) => {
        console.log('verifica ' + JSON.stringify(req.body));
        authy.phones().verification_check(req.body.numero, 
        req.body.codigo_pais, req.body.codigo_verificacao, (err, sucess) => {
            console.log('validacao_numero server/routes/verifyCode.post' + JSON.stringify(err));
            console.log('validacao_numero server/routes/verifyCode.post' + JSON.stringify(sucess));
            
            if(err) {
                res.json(err);
            }
            res.json(sucess);
        });
    });

    app.route("/generateCode")
        .post((req, res) => {
            console.log('validacao_numero server/routes/genereteCode.post ' + JSON.stringify(req.body));
            authy.phones()
                .verification_start(req.body.numero, req.body.codigo_pais, 'sms', (err, sucess) => {
                    console.log('validacao_numero server/routes/genereteCode.post' + JSON.stringify(err));
                    console.log('validacao_numero server/routes/genereteCode.post' + JSON.stringify(sucess));
                    if(err) {
                        res.json(err);
                    }

                    res.json(sucess);
                });
        });
}