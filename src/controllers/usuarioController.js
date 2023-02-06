// Importações
import UsuarioModel from "../models/UsuarioModel.js"
const Usuario = UsuarioModel.Usuario;

// Usuario - Home
const telaInicial = (req, res) => {
    res.render('usuario/telaInicial', {
        layout: 'mainUsuario'
    })
}

// Usuario - Logout
const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}

export default {
    telaInicial,
    logout
}