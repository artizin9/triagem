export function MessageError(error){
    if (error.response) return {
            error: error.response.data,
            message: error.response.data.message || 'Erro inesperado'
        }

    if (error.request) return {
            error: "Erro na requisição",
            message: 'Não foi possível conectar ao servidor'
        }

    return {
        error: 'Erro inesperado',
        message: 'Tente novamente mais tarde'
    }

}