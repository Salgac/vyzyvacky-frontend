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
          <TableComponent title="Participants" endpoint="/people" />
        </div>
        <div class="row-50">
          <TableComponent title="Duels" endpoint="/entries" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import HomeHeader from "@/components/HomeHeader.vue";
import TableComponent from "@/components/TableComponent.vue";

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
  },
});
</script>

<style lang="scss">
.home {
  width: 75%;
  padding: 1%;
  margin: auto;
  background: #ffffff;
}

.table {
  width: 100%;
  display: table;

  .row {
    width: 100%;
    display: table-row;

    .row-25 {
      padding: 0.5%;
      width: 25%;
      display: table-cell;
    }

    .row-50 {
      padding: 0.5%;
      width: 50%;
      display: table-cell;
    }

    .row-75 {
      padding: 0.5%;
      width: 75%;
      display: table-cell;
    }
  }
}
</style>
