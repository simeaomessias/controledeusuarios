
// Home
const index = (req, res) => {
    res.render('login/index', {layout: 'mainLogin'});
    return;
}
const verifyLogin = (req, res) => {
    res.send("VERIFICAÇÃO DO DADOS PARA LOGIN");
    return;
}


export default {
    index,
    verifyLogin
}