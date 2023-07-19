<template>
  <div class="matchmaker">
    <h1>Create a match:</h1>
    <AutoComplete forceSelection v-model="input.winner" placeholder="Winner" :suggestions="filteredItems"
      :dropdown="true" :minLength="2" @complete="searchNames($event)" field="name" />
    <AutoComplete forceSelection v-model="input.looser" placeholder="Looser" :suggestions="filteredItems"
      :dropdown="true" :minLength="2" @complete="searchNames($event)" field="name" />

    <Button @click="submit()" label="Submit" icon="pi pi-check" iconPos="right" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import latinize from "latinize";
import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Matchmaking",
  data() {
    return {
      input: {
        winner: "",
        looser: "",
      },
      names: [{ name: "", id: Number }],
      filteredItems: [{}],
    };
  },
  mounted() {
    this.getNames();
  },
  methods: {
    getNames() {
      axios({
        method: "GET",
        url: "http://139.162.130.177:5000/v1/people",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }).then(
        (result) => {
          console.log(result);
          result.data.forEach((person: any) => {
            this.names.push({
              name: person.lastName + " " + person.firstName,
              id: person.id,
            });
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    submit() {
      const timestamp = this.getCurrentTime()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      var data = [
        {
          time: timestamp,
          winner: (this.input.winner as any).id,
          looser: (this.input.looser as any).id,
        },
      ];
      console.log(data);
      axios({
        method: "POST",
        url: "http://139.162.130.177:5000/v1/entries",
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        data: data,
      }).then(
        (result) => {
          console.log(result);
          this.input.winner = "";
          this.input.looser = "";
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getCurrentTime(): Date {
      var time = new Date();
      var offset = Math.abs(time.getTimezoneOffset() / 60);
      time.setHours(time.getHours() + offset);
      return time;
    },
    searchNames(event: any) {
      console.log(this.input);
      if (!event.query.trim().length) {
        this.filteredItems = [...this.names];
      } else {
        this.filteredItems = this.names.filter((item) => {
          return (
            latinize(item.name)
              .toLowerCase()
              .indexOf(latinize(event.query).toLowerCase()) >= 0
          );
        });
      }
    },
  },
  components: {
    AutoComplete,
    Button,
  },
});
</script>

<style lang="scss" scoped>
.matchmaker {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;

  .p-autocomplete {
    margin: 10px;
  }

  Button {
    margin: 10px;
  }
}
</style>