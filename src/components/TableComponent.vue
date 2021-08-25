<template>
  <div class="table">
    <h1>{{ title }}</h1>
    <table class="table-hover" v-if="dataArr">
      <thead>
        <tr>
          <th>#</th>
          <!-- People specific fields -->
          <th v-if="arrHasKey('firstName')">First Name</th>
          <th v-if="arrHasKey('lastName')">Last Name</th>
          <th v-if="arrHasKey('age')">Age</th>
          <th v-if="arrHasKey('name')">Team</th>
          <th v-if="arrHasKey('color')">Team Color</th>
          <!-- Entries specific fields -->
          <th v-if="arrHasKey('winner_id')">Winner</th>
          <th v-if="arrHasKey('looser_id')">Looser</th>
          <th v-if="arrHasKey('time')">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataArr" :key="item">
          <td>{{ index + 1 }}</td>
          <!-- People specific fields -->
          <td v-if="item.firstName">{{ item.firstName }}</td>
          <td v-if="item.lastName">{{ item.lastName }}</td>
          <td v-if="item.age">{{ item.age }}</td>
          <td v-if="item.name">{{ item.name }}</td>
          <td v-if="item.color">{{ item.color }}</td>
          <!-- Entries specific fields -->
          <td v-if="item.winner_id">{{ item.winner_id }}</td>
          <td v-if="item.looser_id">{{ item.looser_id }}</td>
          <td v-if="item.time">{{ item.time }}</td>
        </tr>
      </tbody>
    </table>
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
      dataArr: [{}],
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
          this.dataArr = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    arrHasKey(keyName: string) {
      if (keyName in this.dataArr[0]) return true;
      else return false;
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
