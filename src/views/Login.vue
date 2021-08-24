<template>
  <div class="login">
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
      <button type="button" v-on:click="login()">Login</button>
      <p class="message">Not registered? <a href="#">Create an account</a></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      input: {
        code: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      if (this.input.code != "" && this.input.password != "") {
        axios({
          method: "POST",
          url: "http://139.162.130.177:3000/v1/sign_in",
          data: this.input,
          headers: {
            "content-type": "application/json",
          },
        }).then(
          (result) => {
            this.$parent.code = result.data.code;
            this.$parent.token = result.data.auth_token;
            this.$router.push("Home");
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

  input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    outline: 0;
    background: #09a9f3;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #ffffff;
    font-size: 16px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
      background: #068cca;
    }
  }

  .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;

    a {
      color: #09a9f3;
      text-decoration: none;
    }
  }
}
</style>