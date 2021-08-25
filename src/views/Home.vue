<template>
  <div class="home">
    <Header />
    <TableComponent title="Participants" endpoint="/people" />
    <TableComponent title="Log Entries" endpoint="/entries" />
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
  padding: 1% 1% 1%;
  margin: auto;
  background: #ffffff;
}
</style>
