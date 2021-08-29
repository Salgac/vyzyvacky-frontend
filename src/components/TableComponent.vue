<template>
  <div class="table">
    <table class="table-hover" v-if="dataArr">
      <thead>
        <tr class="table-head">
          <th>#</th>
          <!-- People specific fields -->
          <th v-if="arrHasKey('firstName')">First Name</th>
          <th v-if="arrHasKey('lastName')">Last Name</th>
          <th v-if="arrHasKey('age')">Age</th>
          <th v-if="arrHasKey('teamName')">Team</th>
          <th v-if="arrHasKey('teamColor')">Team Color</th>
          <!-- Entries specific fields -->
          <th v-if="arrHasKey('time')">Time</th>
          <th v-if="arrHasKey('winner')">Winner</th>
          <th v-if="arrHasKey('looser')">Looser</th>
          <!-- Scoreboard specific fields -->
          <th v-if="arrHasKey('score')">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataArr" :key="item">
          <td>{{ index + 1 }}</td>
          <!-- People specific fields -->
          <td v-if="item.firstName">{{ item.firstName }}</td>
          <td v-if="item.lastName">{{ item.lastName }}</td>
          <td v-if="item.age">{{ item.age }}</td>
          <td v-if="item.teamName">{{ item.teamName }}</td>
          <td v-if="item.teamColor">{{ item.teamColor }}</td>
          <!-- Entries specific fields -->
          <td v-if="item.time">{{ toReadableTime(item.time) }}</td>
          <td v-if="item.winner">{{ item.winner }}</td>
          <td v-if="item.looser">{{ item.looser }}</td>
          <!-- Scoreboard specific fields -->
          <td v-if="item.score">{{ item.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import moment from "moment";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Table",
  props: {
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
    toReadableTime(timestamp: string) {
      return moment(timestamp).format("DD.MM.YYYY, HH:mm");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table {
  width: 100%;
  background: #fafafa;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 30px;

  border-spacing: 1;
  border-radius: 10px;
  border-collapse: collapse;
  overflow: hidden;
  margin: 0 auto;
  position: relative;

  thead tr {
    color: white;
    font-size: 25px;
    line-height: 1.2;
    font-weight: unset;
    height: 60px;
    background: #36304a;
  }

  tbody tr {
    font-size: 20px;
    color: black;
    line-height: 1.2;
    font-weight: unset;
    height: 30px;

    &:nth-child(even) {
      background-color: #f5f5f5;
    }
  }
}
</style>
