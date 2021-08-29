<template>
  <div class="setup">
    <div class="header">
      <AppHeader />
    </div>
    <div class="table">
      <InputComponent title="Teams" endpoint="/teams" />
    </div>
    <div class="table">
      <InputComponent title="Participants" endpoint="/people" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import InputComponent from "@/components/InputComponent.vue";

export default defineComponent({
  name: "Setup",
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  components: {
    AppHeader,
    InputComponent,
  },
});
</script>

<style scoped lang="scss">
.setup {
  width: 75%;
  padding: 1%;
  margin: auto;
  background: #ffffff;
}

.row {
  background: lightblue;
}
</style>
