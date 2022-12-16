//https://jsonapi.org/format/#errors-processing ver dps e atualizar

class Errors {
    static lastId = 0;
    id;    

    constructor(){
        this.id = ++Errors.lastId
    }

    createError(_title: string, _detail: string, _status: number){
        return {
            id: this.id,
            title: _title,
            detail: _detail,
            status: _status,
        }
    }
}

/*
 * create
 * get
 * update
 * delete
 * not found
 * ?already exists
 */

//User
export const errCreateUser = new Errors().createError("Falha no cadastro", "Um erro ocorreu ao cadastrar um usuario", 500)

export const errGetUser = new Errors().createError("Falha na requisição", "Ocorreu um erro ao receber o(s) usuário(s)", 500)

export const errUpdateUser = new Errors().createError("Falha na requisição", "Um erro ocorreu ao editar um usuário", 500)

export const errDeleteUser = new Errors().createError("Falha na requisição", "Um erro ocorreu ao deletar um usuário", 500)

export const errUserNotFound = new Errors().createError("ERR_USER_NOT_FOUND", "Nenhum usuário foi encontrado", 404)

export const errUserAlreadyExists = new Errors().createError("ERR_USER_EXISTS", "Este e-mail ja está cadastrado.", 500)

export const errUserIncorrect = new Errors().createError("ERR_USER_INCORRECT", "E-mail ou senha incorretos!", 404)

export const errActionsLikeSomeoneElse = new Errors().createError("Falha na requisição", "Você não pode realizar ações como outro usuário!", 500)

export const errIncorrectData = new Errors().createError("ERR_INCORRECT_DATA", "Respeite o formato de requisição", 422)

//Provider
export const errCreateProvider = new Errors().createError("ERR_CREATE_PROVIDER", "Um erro ocorreu ao cadastrar um fornecedor", 500)

export const errGetProvider = new Errors().createError("ERR_GET_PROVIDER", "Ocorreu um erro ao receber o(s) fornecedor(es)", 500)

export const errUpdateProvider = new Errors().createError("ERR_UPDATE_PROVIDER", "Um erro ocorreu ao editar um fornecedor", 500)

export const errDeleteProvider = new Errors().createError("ERR_DELETE_PROVIDER", "Um erro ocorreu ao deletar um fornecedor", 500)

export const errProviderNotFound = new Errors().createError("ERR_PROVIDER_NOT_FOUND", "Nenhum fornecedor foi encontrado", 404)

export const errProviderAlreadyExists = new Errors().createError("ERR_PROVIDER_EXISTS", "Este fornecedor ja está cadastrado.", 500)

//Product
export const errCreateProduct = new Errors().createError("ERR_CREATE_PRODUCT", "Um erro ocorreu ao cadastrar um produto", 500)

export const errGetProduct = new Errors().createError("ERR_GET_PRODUCT", "Ocorreu um erro ao receber o(s) produto(s)", 500)

export const errUpdateProduct = new Errors().createError("ERR_UPDATE_PRODUCT", "Um erro ocorreu ao editar um produto", 500)

export const errDeleteProduct = new Errors().createError("ERR_DELETE_PRODUCT", "Um erro ocorreu ao deletar um produto", 500)

export const errProductNotFound = new Errors().createError("ERR_PRODUCT_NOT_FOUND", "Nenhum produto foi encontrado", 404)

export const errProductAlreadyExists = new Errors().createError("ERR_PRODUCT_EXISTS", "Este produto ja está cadastrado.", 500)

//Payment
export const errGetPayment = new Errors().createError("ERR_GET_PAYMENT", "Ocorreu um erro ao receber o(s) método(s) de pagamento", 500)

export const errPaymentNotFound = new Errors().createError("ERR_PAYMENT_NOT_FOUND", "Nenhum método de pagamento foi encontrado", 404)

export const errPaymentInstallments = new Errors().createError("ERR_PAYMENT_INSTALLMENTS", "Número de parcelas incorreta", 422)

//Product
export const errCreateOrder = new Errors().createError("ERR_CREATE_ORDER", "Um erro ocorreu ao cadastrar um pedido", 500)

export const errGetOrder = new Errors().createError("ERR_GET_ORDER", "Ocorreu um erro ao receber o(s) pedido(s)", 500)

export const errUpdateOrder = new Errors().createError("ERR_UPDATE_ORDER", "Um erro ocorreu ao editar um pedido", 500)

export const errDeleteOrder = new Errors().createError("ERR_DELETE_ORDER", "Um erro ocorreu ao deletar um pedido", 500)

export const errOrderNotFound = new Errors().createError("ERR_ORDER_NOT_FOUND", "Nenhum pedido foi encontrado", 404)

export const errInvalidOrderItem = new Errors().createError("ERR_INVALID_ORDER_ITEM", "Insira produtos válidos em seu pedido", 422)

//Token
export const errNeedsToken = new Errors().createError("ERR_NEEDS_TOKEN", "Insira um token para prosseguir", 401)

export const errUserTokenNotFound = new Errors().createError("ERR_USER_TOKEN_NOT_FOUND", "Usuário ou Token não encontrado", 404)

export const errTokenInvalid = new Errors().createError("ERR_TOKEN_INVALID", "Este token ja expirou ou não existe, tente logar novamente!", 401)

export const errCreateToken = new Errors().createError("ERR_CREATE_TOKEN", "Ocorreu um erro ao criar seu token!", 500)

export const errLogIn = new Errors().createError("ERR_LOGIN", "Ocorreu um erro ao realizar o login!", 500)

//Application
export const errUnauthorized = new Errors().createError("ERR_UNAUTHORIZED", "Sem autorização!", 401)

export const errApplication = new Errors().createError("ERR_APPLICATION", "Ocorreu um erro ao processar sua requisição", 500)

export const errInvalidData = new Errors().createError("ERR_INVALID_DATA", "Existem campos em branco", 422)

export const errFunctionNotDone = new Errors().createError("ERR_FUNCTION_NOT_DONE", "Esta função não foi concluída, avise aos colaboradores!", 500)

//Requests
export const errRequestNotFound = new Errors().createError("ERR_REQUEST_NOT_FOUND", "Nenhuma requisição encontrada", 404)

export const errGetRequest = new Errors().createError("ERR_GET_REQUEST", "Ocorreu um erro ao receber a(s) requisições", 500)