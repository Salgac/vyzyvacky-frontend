<template>
  <div class="home">
    <div class="info-header">
      <Header />
    </div>
    <div class="table">
      <div class="row">
        <div class="left">
          <TableComponent title="Participants" endpoint="/people" />
        </div>
        <div class="right">
          <TableComponent
            class="right"
            title="Log Entries"
            endpoint="/entries"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/HomeHeader.vue";
import TableComponent from "@/components/TableComponent.vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  components: {
    Header,
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

    .left {
      padding: 0.5%;
      width: 50%;
      display: table-cell;
    }

    .right {
      padding: 0.5%;
      width: 50%;
      display: table-cell;
    }
  }
}
</style>
