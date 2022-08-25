<template>
  <div class="poke-list">{{ poke.name }}</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "HomeView",
  props: ["poke"],

  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {},
});
</script>
<style scpoed>
.home {
  padding: 10vh 5vw;
}
</style>
