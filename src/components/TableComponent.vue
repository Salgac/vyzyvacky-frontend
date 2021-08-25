<template>
  <div class="table">
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="item in people" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Table",
  props: {
    title: String,
    endpoint: String,
  },
  data() {
    return {
      people: [],
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      axios({
        method: "GET",
        url: "http://139.162.130.177:3000/v1" + this.endpoint,
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }).then(
        (result) => {
          console.log(result);
          this.people = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
