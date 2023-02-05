// Importações

import UsuarioModel from "../models/UsuarioModel.js"
const Usuario = UsuarioModel.Usuario;


// Usuario - Home
const telaInicial = (req, res) => {
    res.send("TELA INICIAL DO USUÁRIO COMUM")
}

export default {
    telaInicial
}