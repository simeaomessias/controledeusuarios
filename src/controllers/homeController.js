
// Login

const formLogin = (req, res) => {
    res.render('home/formLogin', {layout: 'mainHome'});
    return;
}
const verificaLogin = (req, res) => {
    res.send("VERIFICAÇÃO DOS DADOS DE LOGIN")
    return;
}

// Recuperação de senha

const formRecuperarSenha = (req, res) => {
    res.render('home/formRecuperarSenha', {layout: 'mainHome'});
    return;
}
const recuperaSenha = (req, res) => {
    res.send("VERIFICAÇÃO PARA RECUPERAÇÃO DE SENHA.")
    return;
}

const formCriarConta = (req, res) => {
    res.render('home/formCriarConta', {layout: 'mainHome'})
    return;
}
const criaConta = (req, res) => {
    res.send("VERIFICAÇÃO PARA CRIAÇÃO DE CONTA")
    return;
}

export default {
    formLogin,
    verificaLogin,
    formRecuperarSenha,
    recuperaSenha,
    formCriarConta,
    criaConta,
}