<template>
  <main id="main">
    <div id="titulo">Listar Usuários</div>
    <br />
    <div id="subtitulo">Aqui você pode ver os usuários cadastrados.</div>
    <br />
    <br />
    <nav id="barra-pesquisa">
      <form @submit.prevent="buscarDados">
        <input
          type="search"
          id="pesquisa"
          v-model="nome"
          placeholder="Pesquisa por nome."
          @keyup="buscarDados()"
          autocomplete="off"
        />
        <input type="submit" id="submit" value="Buscar" />
      </form>
    </nav>
    <br />
    <table border="1">
      <thead>
        <tr>
          <th id="th1">Id</th>
          <th id="th2">Nome / Razão Social</th>
          <th id="th3">Telefone</th>
          <th id="th4">CPF / CNPJ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuarios of usuarios" :key="usuarios.id">
          <td class="corpo" id="id">{{ usuarios.id }}</td>
          <td id="nome">{{ usuarios.nome }}</td>
          <td class="corpo" id="telefone">{{ usuarios.telefone }}</td>
          <td class="corpo" id="cpf">{{ usuarios.cpf }}</td>
        </tr>
      </tbody>
    </table>
    <div id="verificado">
      <p>Nenhum usuário encontrado</p>
    </div>
  </main>
</template>

<script>
import Usuarios from "../services/usuarios";

export default {
  name: "Listar",

  data() {
    return {
      nome: "",
      usuario: [],
      usuarios: [],
      lista: {
        id: "",
        nome: "",
        telefone: "",
        cpf: "",
      },
    };
  },

  methods: {
    verificaArray(array) {
      if (!array.length) {
        document.getElementById("verificado").style.display = "flex";
        return true;
      } else {
        document.getElementById("verificado").style.display = "none";
        return false;
      }
    },

    transforma() {
      this.usuarios = {};
      for (let index = 0; index < this.usuario.length; index++) {
        this.lista = {};
        this.lista.id = this.usuario[index].id;
        this.lista.nome = this.usuario[index].nome;
        if (this.usuario[index].telefone.length === 10) {
          this.lista.telefone = this.usuario[index].telefone.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        } else {
          this.lista.telefone = this.usuario[index].telefone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
        if (this.usuario[index].cpf.length === 11) {
          this.lista.cpf = this.usuario[index].cpf.replace( /^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        } else {
          this.lista.cpf = this.usuario[index].cpf.replace( /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        }
        this.usuarios[index] = this.lista;
      }
    },

    buscarDados() {
      Usuarios.listar(this.nome)
        .then((resposta) => {
          this.verificaArray(resposta.data);
          this.usuario = resposta.data;
          this.transforma();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.buscarDados();
  },
};
</script>

<style scoped>
main {
  position: absolute;
  max-height: calc(100% - 55px);
  width: 100%;
  padding-top: 30px;
          
  display: flex;
  flex-direction: column;
  padding-left: 240px;
  padding-right: 10px;
}

#titulo {
  font-size: 30px;
}

#subtitulo {
  font-size: 18px;
}

#pesquisa {
  background: none;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 16px;
  padding: 2px 5px;
  width: 80%;
}

#submit {
  border: none;
  border-radius: 8px;
  background-color: blue;
  width: 20%;
  padding: 4px;
  font-size: 17px;
  cursor: pointer;
  border-color: black;
}

#submit:hover {
  color: #c4c4c4;
}

table {
  width: 100%;
  margin-top: 5px;
  border-color: black;
  border: black;
  font-size: 15px;
  margin-bottom: 10px;
}

th {
  height: 30px;
  padding: 0px 5px;
}

td {
  height: 30px;
  padding: 0px 5px;
}

.corpo {
  text-align: center;
}

#verificado {
  display: flex;
  padding-top: 20px;
  opacity: 0.5;
  font-size: 20px;
  justify-content: center;
}

@media (max-width: 700px) {
  main {
    padding-left: 10px;
  }
  table {
    font-size: 12px;
  }
}
</style>