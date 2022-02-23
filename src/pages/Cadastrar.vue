<template>
  <main id="main">
    <div id="titulo">Cadastrar Usuários</div>
    <br />
    <div id="subtitulo">Insira os dados do usuário a ser cadastrado.</div>
    <br />
    <div id="obrigatorio">Os campos marcados com * são obrigatórios.</div>
    <br />
    <br />
    <form @submit.prevent="salvar">
      <div class="caixa">
        <input
          type="text"
          id="nome"
          class="caixatexto"
          maxlength="60"
          v-model="inputs.nome"
          @keyup="verificanome()"
          required
        />
        <label for="nome" id="descnome" class="descricao">{{ descnome }}</label>
      </div>
      <br /><br />
      <div class="caixa">
        <input
          type="tel"
          id="telefone"
          class="caixatexto"
          v-model="inputs.telefone"
          v-mask="['(##) ####-####', '(##) #####-####']"
          @keyup="verificatel()"
          required
        />
        <label for="telefone" id="desctel" class="descricao">{{ desctel }}</label>
      </div>
      <br /><br />
      <div class="caixa">
        <input
          type="text"
          id="cpf"
          class="caixatexto"
          v-model="inputs.cpf"
          v-mask="['###.###.###-##', '##.###.###/####-##']"
          autocomplete="off"
          @keyup="verificacpf()"
          required
        />
        <label for="cpf" id="desccpf" class="descricao">{{ desccpf }}</label>
      </div>
      <br />
      <input type="submit" id="submit" />
    </form>
  </main>
</template>

<script>
import Usuarios from "../services/usuarios.js";

export default {
  name: "Cadastrar",
  data() {
    return {
      descnome: "Nome ou Razão Social*",
      desctel: "Telefone*",
      desccpf: "CPF ou CNPJ*",
      erronome: false,
      errotel: false,
      errocpf: false,
      inputs: {
        nome: "",
        telefone: "",
        cpf: "",
      },
      cadastro: {
        nome: "",
        telefone: "",
        cpf: "",
      },
    };
  },

  methods: {
    desc(texto) {
      document.getElementById(texto).style.color = "blue";
      if (texto === "descnome") {
        document.getElementById(texto).innerHTML = this.descnome;
      } else if (texto === "desctel") {
        document.getElementById(texto).innerHTML = this.desctel;
      } else {
        document.getElementById(texto).innerHTML = this.desccpf;
      }
    },

    edesc(texto) {
      if (document.getElementById(texto).innerHTML.length < 30) {
        document.getElementById(texto).style.color = "red";
        if (texto === "descnome") {
          document.getElementById(texto).innerHTML += " (Não pode ser vazio)";
        } else if (texto === "desctel") {
          document.getElementById(texto).innerHTML += " (Deve ter 14 ou 15 caracteres)";
        } else {
          document.getElementById(texto).innerHTML += " (Deve ter 14 ou 18 caracteres)";
        }
      }
    },

    verificanome() {
      if (!this.inputs.nome.trim()) {
        this.edesc("descnome");
        this.erronome = true;
      } else {
        this.desc("descnome");
        this.erronome = false;
      }
    },

    verificatel() {
      if (!(this.inputs.telefone.length === 14 || this.inputs.telefone.length === 15)) {
        this.edesc("desctel");
        this.errotel = true;
      } else {
        this.desc("desctel");
        this.errotel = false;
      }
    },

    verificacpf() {
      if (!(this.inputs.cpf.length === 14 || this.inputs.cpf.length === 18)) {
        this.edesc("desccpf");
        this.errocpf = true;
      } else {
        this.desc("desccpf");
        this.errocpf = false;
      }
    },

    verificaerros() {
      this.verificanome();
      this.verificatel();
      this.verificacpf();
    },

    transforma() {
      this.cadastro.nome = this.inputs.nome;
      this.cadastro.telefone = this.inputs.telefone.replace(/\D/g, "");
      this.cadastro.cpf = this.inputs.cpf.replace(/\D/g, "");
    },

    salvar() {
      this.verificaerros();
      if (this.erronome === false && this.errotel === false && this.errocpf === false) {
        this.transforma();
        Usuarios.cadastrar(this.cadastro)
          .then(() => {
            alert("Cadastrado com sucesso!")
            window.location.reload()
          })
          .catch((e) => {
            alert(e.response.data.mensagemGeral)
          });
      }
    },
  },
};
</script>

<style scoped>
main {
  height: calc(100vh - 55px);
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

.caixa {
  position: relative;
}

.caixatexto {
  background: none;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 16px;
  width: 90%;
  padding: 5px;
}

.descricao {
  position: absolute;
  top: 5px;
  left: 2px;
  pointer-events: none;
  transition: 0.5s;
}

.caixatexto:focus ~ .descricao,
.caixatexto:valid ~ .descricao {
  top: -16px;
  font-size: 13px;
  color: blue;
}

.caixatexto:valid {
  border-color: black;
}

#submit {
  margin-top: 7px;
  background-color: blue;
  width: 200px;
  border: none;
  padding: 7px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 10px;
}

#submit:hover {
  color: #c4c4c4;
}

</style>