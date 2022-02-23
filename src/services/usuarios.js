import { http } from "./api"

export default {

    cadastrar: (usuario) => {
        return http.post('adicionar', usuario)
    },

    listar: (nome) => {
        return http.get('listar/' + nome)
    }
}