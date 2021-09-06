<template>
  <div class="input">
    <h1>{{ title }}</h1>
    <div class="row">
      <div class="row-50">
        <h3>Add new:</h3>
        <!-- Team -->
        <div v-if="title == 'Teams'" class="p-fluid">
          <span class="p-float-label">
            <InputText
              id="teamName"
              name="teamName"
              type="text"
              maxlength="10"
              v-model="team.name"
            />
            <label for="teamName">Team name</label>
          </span>
          <ColorPicker name="color" v-model="team.color" />
          <Button label="Add team" v-on:click="send(team)" />
        </div>
        <!-- Participants -->
        <div v-else class="p-fluid">
          <span class="p-float-label">
            <InputText
              id="firstName"
              name="firstName"
              type="text"
              maxlength="10"
              v-model="participant.firstName"
            />
            <label for="firstName">First name</label>
          </span>
          <span class="p-float-label">
            <InputText
              id="lastName"
              name="lastName"
              type="text"
              maxlength="20"
              v-model="participant.lastName"
            />
            <label for="lastName">Last name</label>
          </span>
          <span class="p-float-label">
            <InputNumber
              id="age"
              :min="3"
              :max="100"
              v-model="participant.age"
            />
            <label for="age">Age</label>
          </span>
          <span class="p-float-label">
            <Dropdown
              id="team"
              name="team"
              :options="teams"
              optionLabel="teamName"
              optionValue="teamName"
              v-model="participant.team"
            />
            <label for="team">Team</label>
          </span>
          <Button type="button" v-on:click="send([participant])">Add</Button>
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
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import ColorPicker from "primevue/colorpicker";
import Button from "primevue/button";

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
        age: null,
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
    InputText,
    InputNumber,
    Dropdown,
    ColorPicker,
    Button,
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

span {
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: left;
}

.p-fluid {
  padding-left: 25px;
  padding-right: 25px;
}
</style>