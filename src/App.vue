<template>
  <v-app>
    <v-app-bar app color="#2F2F2F" dark>
      <div class="logo">
        <router-link style="text-decoration: none" to="/"><img width="150" src="@/assets/poke-logo.png" /></router-link>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",

  data: () => ({}),
});
</script>
<style scoped>
.logo {
  margin-left: auto;
  margin-right: auto;
  text-align: -webkit-center;
}
</style>
