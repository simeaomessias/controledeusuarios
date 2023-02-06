// Importações
import UsuarioModel from "../models/UsuarioModel.js"
const Usuario = UsuarioModel.Usuario;


// Usuario - Tela inicial
const telaInicial = (req, res) => {
    return res.render('usuario/telaInicial', {layout: 'mainUsuario'})
}

// Usuario - Lista geral de usuários
const listarUsuarios = async (req, res) => {

    try {
        
        const usuario = new Usuario()
        const lista = await usuario.listarUsuarios()
    
        if (lista.length > 0) {
            req.session.save( () => {
                return res.render('usuario/listaGeral', {
                    layout: 'mainUsuario',
                    lista: lista
                })
            })
            return
        }

    } catch(e) {

        req.flash('msgErro', 'Erro ao listar os usuários cadastrados.')
        req.session.save( () => {
            return res.redirect('/usuario')
        })
        return
    }
    
}

// Usuario - Logout
const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}

export default {
    telaInicial,
    listarUsuarios,
    logout
}