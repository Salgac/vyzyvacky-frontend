<template>
  <footer>
      <p>Copyright &copy; {{ year }}, Dominik Šalgovič</p>
  </footer>
</template>

<script>
import { computed } from "vue";
export default {
  setup() {
    const year = computed(() => "2021 - " + new Date().getFullYear());
    return { year };
  },
};
</script>

<style lang="scss">
p {
  color: white;
  font-weight: bold;
}
</style>
