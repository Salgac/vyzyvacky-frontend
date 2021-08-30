<template>
  <div class="scoreboard">
    <TableComponent v-bind:endpoint="endpoint" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableComponent from "@/components/TableComponent.vue";

export default defineComponent({
  name: "Scoreboard",
  props: {
    endpoint: String,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  components: {
    TableComponent,
  },
});
</script>

<style scoped lang="scss">
.scoreboard {
  display: block;
  width: 80%;
  margin: auto;
  margin-top: 5%;
}
</style>
