const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Casa do Código </h1>
                    </body>
                </html>
            `
        );
    });
    
    app.get('/livros', (req, resp) => {
        const livroDao = new LivroDao(db);
        livroDao.lista()
            .then(livros =>  resp.send({livros: livros}))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form/:id', (req, resp) => {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.buscaPorId(id) 
        .then(livros =>  resp.send({livros: livros}))
        .catch(erro => console.log(erro));
    })
    
    app.post('/livros', (req, resp) => {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(resp.send({res: 'success', payload: req.body}))
            .catch(erro => console.log(erro));
    });

    app.put('/livros', (req, resp) => {
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body)
            .then(resp.send({res: 'success', payload: req.body}))
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', (req, resp) => {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(resp.status(200).send(id))
            .catch(erro => console.log(erro));
    })
};