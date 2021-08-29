<template>
  <div class="input">
    <h1>{{ title }}</h1>
    <div class="row">
      <div class="row-50">
        <h3>Add new:</h3>
        <!-- Team -->
        <div v-if="title == 'Teams'">
          <input
            name="name"
            type="text"
            placeholder="Team name"
            maxlength="10"
            v-model="team.name"
          />
          <input name="color" type="color" v-model="team.color" />
          <button type="button" v-on:click="send(team)">Add</button>
          <br />
        </div>
        <!-- Participants -->
        <div v-else>
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            maxlength="20"
            v-model="participant.firstName"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            maxlength="20"
            v-model="participant.lastName"
          />
          <input
            name="age"
            type="number"
            min="3"
            max="100"
            v-model="participant.age"
          />
          <select name="team" v-model="participant.team">
            <option v-for="team in teams" v-bind:key="team.name">
              {{ team.name }}
            </option>
          </select>
          <button type="button" v-on:click="send([participant])">Add</button>
          <br />
        </div>

        <p>Newly added: {{ tableUpdater }}</p>
      </div>
      <div class="row-50">
        <TableComponent :key="tableUpdater" v-bind:endpoint="endpoint" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import TableComponent from "@/components/TableComponent.vue";

export default defineComponent({
  name: "Input",
  props: {
    title: String,
    endpoint: String,
  },
  data() {
    return {
      //input objects
      team: {
        name: "",
        color: "#000000",
      },
      participant: {
        firstName: "",
        lastName: "",
        age: 10,
        team: "",
      },
      //teams array
      teams: [{}],

      //updater
      tableUpdater: 0,
    };
  },
  mounted() {
    this.populateSelect();
  },
  methods: {
    send(object: unknown) {
      axios({
        method: "POST",
        url: "http://139.162.130.177:3000/v1" + this.endpoint,
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        data: object,
      }).then(
        (result) => {
          console.log(result);
          this.tableUpdater += 1;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    populateSelect() {
      axios({
        method: "GET",
        url: "http://139.162.130.177:3000/v1/teams",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }).then(
        (result) => {
          console.log(result);
          this.teams = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  components: {
    TableComponent,
  },
});
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.row {
  display: flex;
}
</style>