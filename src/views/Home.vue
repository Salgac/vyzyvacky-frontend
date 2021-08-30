<template>
  <div class="home">
    <div class="header">
      <AppHeader />
    </div>
    <div class="info-header">
      <HomeHeader />
    </div>
    <div class="table">
      <div class="row">
        <div class="row-50">
          <h1>Participants</h1>
          <TableComponent endpoint="/people" />
        </div>
        <div class="row-50">
          <h1>Duels</h1>
          <TableComponent endpoint="/entries" />
        </div>
      </div>
      <div class="row">
        <Matchmaker />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import HomeHeader from "@/components/HomeHeader.vue";
import TableComponent from "@/components/TableComponent.vue";
import Matchmaker from "@/components/Matchmaker.vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  components: {
    AppHeader,
    HomeHeader,
    TableComponent,
    Matchmaker,
  },
});
</script>

<style scoped lang="scss">
.home {
  width: 75%;
  padding: 1%;
  margin: auto;
  background: #ffffff;
}
</style>
