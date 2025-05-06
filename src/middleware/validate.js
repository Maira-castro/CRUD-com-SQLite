
//next -> para quando a requisição der certo ele passar pro agente responsavel.
export function validate(schema) {
    return (req, res, next) => {
        try {//se tudo der certo

            /*1 - validar o corpo da requisição com o que está no schema fornecido */
            const validateData = schema.parse(req.body) //retorna um objeto com os dados validados

            /*2 - substituir o body pelos dados validados */
            req.body = validateData

            /*3 - chama o proximo agente(middleware) */
            next()

        } catch (error) {//se der algum erro
            return res.status(400).json({
                message: "Erro de validação",
                erros: error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message
                }))
            })
        }
    }
}