<template>
  <main id="main">
    <div class="introducao">Bem Vindo ao sistema de <b>Usuários</b>!</div>
    <br />
    <br />
    <div class="indicacao">
      Esta é a tela inicial, por favor escolha abaixo, ou pelo menu, a ação que
      deseja executar.
    </div>
    <br />
    <nav id="links">
      <a href="/cadastrar"><button>Cadastrar novo usuário.</button></a>
      <a href="/listar"><button>Listar usuários cadastrados.</button></a>
    </nav>
  </main>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>

<style scoped>
main {
  height: calc(100vh - 55px);
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  padding-left: 240px;
  padding-right: 10px;
}

.introducao {
  font-size: 30px;
  text-align: justify;
}

.indicacao {
  font-size: 18px;
  text-align: justify;
}

a button {
  font-size: 20px;
  border: none;
  border-radius: 10px;
  padding: 8px;
  background-color: rgb(25, 0, 255);
  margin-right: 20px;
  margin-top: 25px;
  width: 300px;
}

#links {
  display: flex;
  margin-top: 8px;
  flex-wrap: wrap;
}

button:hover {
  cursor: pointer;
  color: #c4c4c4;
}

@media (max-width: 700px) {
  main {
    padding-left: 10px;
  }
}
</style>