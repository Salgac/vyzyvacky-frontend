<template>
  <header>
    <img src="../assets/logo.png" alt="logo" height="50" />
    <p>Vyzývačky 2.2</p>
    <nav>
      <ul>
        <li><router-link to="#">Add participants</router-link></li>
        <li><router-link to="#">Participant Scoreboard</router-link></li>
        <li><router-link to="#">Team Scoreboard</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </header>

  <div class="info">
    <qrcode-vue :value="JSON.stringify(qrValue)" />
    <h1>{{ gameCode }}</h1>
    <h1>{{ password }}</h1>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      gameCode: localStorage.getItem("code"),
      password: localStorage.getItem("password"),

      qrValue: {
        c: localStorage.getItem("code"),
        p: localStorage.getItem("password"),
      },
    };
  },
  components: {
    QrcodeVue,
  },
};
</script>

<style lang="scss">
header,
.info {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 1rem;

  p {
    margin-left: 1rem;
  }
}

nav {
  margin-left: auto;

  ul {
    list-style: none;
  }

  ul li {
    display: inline-flex;
    margin-left: 1rem;
  }
}
</style>