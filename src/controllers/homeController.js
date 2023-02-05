// Importações

import UsuarioModel from "../models/USuarioModel.js"
const Usuario = UsuarioModel.Usuario;


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

// Criação de conta

const formCriarConta = (req, res) => {

    res.render('home/formCriarConta', {layout: 'mainHome'})
    return;
}
const criaConta = async (req, res) => {

    try {
        
        const usuario = new Usuario(req.body)
        
        await usuario.registrar()

        if (!usuario.valido) {
            req.session.save( () => {
                return res.render('home/formCriarConta', {
                    layout: 'mainHome',
                    usuario: usuario.dados,
                    erros: usuario.erros
                })
            })
            return
        }

        // Se não ocorreu erro, a partir desse ponto o usuário já foi salvo no BD

        if (usuario.usuario !== null) { // Verificação por precaução

            usuario.enviarSenha("senhaInicial")

            if (!usuario.valido) {
                
                req.flash('msgSucesso', "Usuário cadastrado com sucesso!")
                req.flash('msgErro', "Problema ao enviar a senha por e-mail. Use o link recuperar senha, por favor.")
                req.session.save( () => {
                    return res.redirect('/')
                })
                return
            }
        }

        req.flash('msgSucesso', "Usuário cadastrado com sucesso!")
        req.session.save( () => {
            return res.redirect('/')
        })
        return

    } catch(e) {

        req.flash('msgErro', "Erro ao cadastrar o usuário")
        req.session.save( () => {
            return res.redirect('/')
        })
        return

    }
}

export default {
    formLogin,
    verificaLogin,
    formRecuperarSenha,
    recuperaSenha,
    formCriarConta,
    criaConta,
}