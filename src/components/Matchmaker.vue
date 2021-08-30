<template>
  <div class="matchmaker">
    <h1>Create a match:</h1>
    <input
      name="winner"
      type="number"
      placeholder="Winner"
      maxlength="20"
      v-model="input.winner"
    />
    <input
      name="winner"
      type="number"
      placeholder="Looser"
      maxlength="20"
      v-model="input.looser"
    />
    <button type="button" v-on:click="submit()">Submit</button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Matchmaking",
  data() {
    return {
      input: {
        winner: 0,
        looser: 0,
        time: "",
      },
    };
  },
  methods: {
    submit() {
      this.input.time = new Date().toISOString().slice(0, 19).replace("T", " ");

      axios({
        method: "POST",
        url: "http://139.162.130.177:3000/v1/entries",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        data: [this.input],
      }).then(
        (result) => {
          console.log(result);
          this.input.winner = 0;
          this.input.looser = 0;
          this.input.time = "";
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
});
</script>