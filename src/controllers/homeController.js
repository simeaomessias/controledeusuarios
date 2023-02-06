// Importações
import UsuarioModel from "../models/UsuarioModel.js"
const Usuario = UsuarioModel.Usuario;

// Login

const formLogin = (req, res) => {
    res.render('home/formLogin', {layout: 'mainHome'});
    return;
}
const verificaLogin = async (req, res) => {

    const usuario = new Usuario()
    await usuario.verificarLogin(req.body.email, req.body.senha)

    if (!usuario.valido) {
        req.session.save( () => {
            res.render('home/formLogin', {
                layout: 'mainHome',
                email: req.body.email,
                senha: req.body.senha,
                erro: "E-mail e/ou senha incorretos."
            })
            return
        })
        return
    }

    return res.redirect(`/usuario`)
}

// Criar nova conta + Envio de senha inicial

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

// Home - Recuperar de senha
const formRecuperarSenha = (req, res) => {
    res.render('home/formRecuperarSenha', {layout: 'mainHome'});
    return;
}
const recuperaSenha = async (req, res) => {

    try {
        const usuario = new Usuario()
        await usuario.acharPorEmail(req.body.email)

        if (!usuario.valido) {
            req.session.save( () => {
                return res.render('home/formRecuperarSenha', {
                    layout: 'mainHome',
                    email: req.body.email,
                    erros: usuario.erros
                })
            })
            return
        }

        req.session.save( () => {
            return res.redirect(`/enviar-senha-recuperada/${usuario.usuario._id.toString()}`)
        })
        return


    } catch(e) {

        req.flash('msgErro', `Erro ao recuperar a senha. Tente novamente.`)
        req.session.save( () => {
            return res.redirect('/recuperar-senha')
        })
        return
    }
}
const msgEmailSenhaRecuperada = (req, res) => {

    res.render('home/msgEnviandoSenhaRecuperada', {
        layout: 'mainHome',
        id: req.params.id
    })
    return;

}
const enviaSenhaRecuperada = async (req, res) => {

    try {
        const usuario = new Usuario()
        await usuario.acharPorId(req.body.id)
    
        if (usuario.usuario === null) {
            req.flash('msgErro', "Erro ao enviar senha. E-mail não cadastrado.")
            req.session.save( () => {
                res.redirect('/recuperar-senha')
            })
            return
        }

        await usuario.enviarSenha('senhaRecuperada')

        if (!usuario.valido) {
            req.flash('msgErro', `Erro ao enviar a senha por e-mail. Tente novamente.`)
            req.session.save( () => {
                res.redirect('/recuperar-senha')
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

        req.flash('msgErro', `Erro ao enviar a senha por e-mail. Tente novamente.`)
        req.session.save( () => {
            return res.redirect('/recuperar-senha')
        })
        return
    }
}

export default {

    formLogin,
    verificaLogin,

    formCriarConta,
    criaConta,
    msgEmailSenhaInicial,
    enviaSenhaInicial,

    formRecuperarSenha,
    recuperaSenha,
    msgEmailSenhaRecuperada,
    enviaSenhaRecuperada
}