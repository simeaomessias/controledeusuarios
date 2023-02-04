const global = (req, res, next) => {

    // Variáveis para mensagens rápidas
    res.locals.msgSucesso = req.flash("msgSucesso")
    res.locals.msgErro = req.flash("msgErro")

    next()
}

export default {
    global
}