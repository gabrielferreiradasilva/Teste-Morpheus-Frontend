<template>
  <body>
    <input type="checkbox" id="botao" />
    <header>
      <nav id="cabecalho">
        <label for="botao" id="label" @click="controlamenu()">
          <div id="botao-menu">
            <div id="linha1"></div>
            <div id="linha2"></div>
            <div id="linha3"></div>
          </div>
        </label>
        <div><router-link to="/" id="logo">USUÁRIOS</router-link></div>
      </nav>
    </header>
    <main>
      <nav id="menu-aberto">
        <ul>
          <li><router-link to="/">INÍCIO</router-link></li>
          <li><router-link to="cadastrar">CADASTRAR</router-link></li>
          <li><router-link to="listar">LISTAR</router-link></li>
        </ul>
      </nav>
    </main>
  </body>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },

  methods: {
    verificasize() {
      if (document.getElementById("botao").checked === false && window.innerWidth < 700) {
        this.controlamenu();
        document.getElementById("botao").checked = true;
      }
      if (document.getElementById("botao").checked && window.innerWidth > 700) {
        this.controlamenu();
        document.getElementById("botao").checked = false;
      }
    },

    controlamenu() {
      if (document.getElementById("botao").checked) {
        document.getElementById("menu-aberto").style.left = "0px";
        document.getElementById("linha1").style.transform = "rotate(-45deg) translate(-8px, 8px)";
        document.getElementById("linha2").style.opacity = "0";
        document.getElementById("linha3").style.transform = "rotate(45deg) translate(-7px, -8px)";
        if (window.innerWidth > 700) {
          document.getElementById("main").style.paddingLeft = "240px";
        }
      } else {
        document.getElementById("menu-aberto").style.left = "-230px";
        document.getElementById("linha1").style.transform = "rotate(0deg) translate(0, 0)";
        document.getElementById("linha2").style.opacity = "1";
        document.getElementById("linha3").style.transform = "rotate(0deg) translate(0, 0)";
        document.getElementById("main").style.paddingLeft = "10px";
      }
    },
  },

  mounted() {
    this.verificasize();
    window.addEventListener("resize", this.verificasize);
  },
};
</script>

<style scoped>
#botao {
  display: none;
}

#botao-menu div {
  width: 32px;
  height: 3px;
  margin: 8px;
  background: black;
  transition: 0.3s;
}

header {
  background-color: blue;
  height: 55px;
  display: flex;
  padding-left: 10px;
}

#cabecalho {
  display: flex;
  align-items: center;
}

#logo {
  margin-left: 10px;
  font-size: 35px;
  font-weight: 600;
}

#menu-aberto {
  position: absolute;
  background-color: blue;
  min-height: calc(100% - 55px);
  width: 230px;
  padding: 5px 10px;
  transition: 0.3s ease-in;
  z-index: 1;
}

#botao-menu:hover {
  cursor: pointer;
}

#botao-menu:hover > div {
  background: #c4c4c4;
}

#linha1 {
  transform: rotate(-45deg) translate(-8px, 8px);
}

#linha2 {
  opacity: 0;
}

#linha3 {
  transform: rotate(45deg) translate(-7px, -8px);
}

ul li a {
  display: flex;
  font-size: 25px;
  padding: 30px 0;
}

ul li {
  border-bottom: 1px solid black;
}

ul {
  list-style: none;
}
</style>