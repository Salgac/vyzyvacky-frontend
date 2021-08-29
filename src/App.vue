<template>
  <div id="app">
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "App",
  data() {
    return {
      code: "#",
      password: "",
      token: "",
    };
  },
  mounted() {
    if (this.token == "") {
      //this.$router.replace({ name: "login" });
    }
  },
  methods: {
    logout() {
      this.token = "";
    },
  },
  components: {
    AppFooter,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: linear-gradient(to left, #29b6f6, #5bc3f3);
  min-width: 1000px;
}

.table {
  width: 100%;
  display: table;

  .row {
    width: 100%;
    display: table-row;

    .row-25 {
      padding: 0.5%;
      width: 25%;
      display: table-cell;
    }

    .row-50 {
      padding: 0.5%;
      width: 50%;
      display: table-cell;
    }

    .row-75 {
      padding: 0.5%;
      width: 75%;
      display: table-cell;
    }
  }
}
</style>
