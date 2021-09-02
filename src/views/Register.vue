<template>
  <div class="register">
    <div class="form">
      <h1>Vyzývačky</h1>
      <input
        name="code"
        type="text"
        placeholder="game code"
        maxlength="6"
        v-model="input.code"
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        v-model="input.password"
      />
      <input
        name="password"
        type="password"
        placeholder="repeat password"
        v-model="input.password_confirmation"
      />
      <button type="button" v-on:click="login()">Register</button>
      <p class="message">
        Already registered?
        <router-link to="/">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      input: {
        code: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    login() {
      if (this.input.code != "" && this.input.password != "") {
        axios({
          method: "POST",
          url: "http://139.162.130.177:3000/v1/sign_up",
          data: this.input,
          headers: {
            "content-type": "application/json",
          },
        }).then(
          (result) => {
            localStorage.setItem("code", result.data.game_code);
            localStorage.setItem("password", this.input.password);
            localStorage.setItem("token", result.data.auth_token);
            this.$router.push("Setup");
          },
          (error) => {
            //console.log(error);
            console.log(error.data);
          }
        );
      }
    },
  },
};
</script>

<style lang="scss">
.register {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
</style>