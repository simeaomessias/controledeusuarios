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

        req.session.save( () => {
            return res.redirect(`/enviar-senha-inicial/${usuario.usuario._id.toString()}`)
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

const msgEmailSenhaInicial = (req, res) => {

    res.render('home/msgEnviandoSenhaInicial', {
        layout: 'mainHome',
        id: req.params.id
    })
    return;

}

const enviaSenhaInicial = async (req, res) => {

    try {
        const usuario = new Usuario()
        await usuario.acharPorId(req.body.id)
    
        if (usuario.usuario === null) {
            req.flash('msgErro', "Erro ao enviar senha. Usuário não cadastrado.")
            req.session.save( () => {
                res.redirect('/')
            })
            return
        }

        await usuario.enviarSenha('senhaInicial')

        if (!usuario.valido) {
            req.flash('msgErro', `Erro ao enviar a senha por e-mail. Tente a opção "Recuperar senha"`)
            req.session.save( () => {
                res.redirect('/')
            })
            return
        }

        req.flash('msgSucesso',
         `Senha enviada! Remetente: sm-remetente@outlook.com". Verifique a pasta de Spam.`
         )
        req.session.save( () => {
            return res.redirect('/')
        })
        return

    } catch(e) {

        console.log(`CATCH de enviaSenhaInicial: ${e}`)
        req.flash('msgErro', `Erro ao enviar a senha por e-mail. Tente a opção "Recuperar senha"`)
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
    msgEmailSenhaInicial,
    enviaSenhaInicial
}