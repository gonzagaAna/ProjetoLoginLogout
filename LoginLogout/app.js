const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(session({
    secret: 'minhafrasesecreta',
    resave: false,
    saveUninitialized: true,

    //rolling: false,  //renovar cada req.(requisição)

    cookie: { security: false, //em produção com htts = true
        maxAge: 60 * 100 //um minuto

    }
}));

app.use(express.json());

app.get('/', (req, res)=>{
    if(req.session.usuario){
        req.session.visitas = (req.session.visitas ?? 0) + 1;

        res.send(`Olá ${req.session.usuario}, você visitou está página. ${req.session.visitas} vezes`);

    } else{
        res.send(`Você visitou está página 1 vez. Faça o login.`)
    }

});

//ROTA PARA LOGIN
app.post('/login', (req, res)=>{
    const {username, password} =req.body;

    if(username === 'gonzaguinha' && password === '123'){
        req.session.usuario = username;
        res.send('Login bem sucedido!');
    } else{
        res.send('Credenciais inválidas.')
    }
});

//ROTA PARA SAIR DA CONTA
app.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.send('Erro ao sair!');
        }
        res.send('Logout bem sucedido!');
    });
});

//ROTA PARA VER O PERFIL
app.get('/perfil', (req, res)=>{
    if(req.session.usuario){
        res.send(`Bem vino ao seu perfil, ${req.session.usuario}` );
    } else{
        res.send(`Você precisa estar logado para acessar o seu perfil`);
    }
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});