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
                <!-- Entries specific fields -->
                <th v-if="arrHasKey('time')">Time</th>
                <th v-if="arrHasKey('winner')">Winner</th>
                <th v-if="arrHasKey('looser')">Looser</th>
                <!-- Scoreboard specific fields -->
                <th v-if="arrHasKey('score')">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataArr" :key="index">
                <td>{{ index + 1 }}</td>
                <!-- People specific fields -->
                <td v-if="item.firstName">{{ item.firstName }}</td>
                <td v-if="item.lastName">{{ item.lastName }}</td>
                <td v-if="item.age">{{ item.age }}</td>
                <td v-if="item.teamName" class="colorBox" :style="{ 'background': `${item.teamColor}` }">
                  {{ item.teamName }}
                </td>
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
    refresh: Boolean,
    filter: Boolean
  },
  data() {
    return {
      dataArr: [{}] as any[],
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.getData();

      //refresh?
      if (this.refresh) {
        //30 seconds
        setInterval(() => {
          this.getData;
        }, 30000)
      }
    },
    getData() {
      axios({
        method: "GET",
        url: "http://139.162.130.177:5000/v1" + this.endpoint,
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }).then(
        (result) => {
          console.log(result);
          this.dataArr = this.filterData(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    filterData(data: any[]) {
      if (this.filter) {
        return data.filter(d =>
          d.teamName !== "Veľrada" &&
          d.teamName !== "Animátori" &&
          d.teamName !== "Makači" &&
          d.teamName !== "Inštruktori"
        );
      }
      return data;
    },
    arrHasKey(keyName: string) {
      return this.dataArr[0] ? (keyName in this.dataArr[0]) : false;
    },
    toReadableTime(timestamp: string) {
      var time = new Date(timestamp);
      var offset = Math.abs(time.getTimezoneOffset() / 60);
      time.setHours(time.getHours() - offset);

      return moment(time).format("DD.MM.YYYY, HH:mm");
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

.colorBox {
  width: 300px;
  height: 100%;
  border: solid grey 1px;
}
</style>
