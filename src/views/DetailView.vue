<template>
  <div class="poke-detail">
    <v-card class="mx-auto" max-width="500">
      <h2>{{ pokemonName }}</h2>

      <v-container>
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="6"> <v-img width="250" :src="pictureFront"></v-img> </v-col>
          <v-col cols="12" sm="6" md="6"> <v-img width="250" :src="pictureBack"></v-img> </v-col> </v-row
        ><v-row
          ><v-col cols="12" sm="12" md="12">
            <div class="detail">
              Weight: {{ pokemonWeight }} <br /><v-btn @click="catchDisable">back to the listing page</v-btn>
            </div>
          </v-col></v-row
        >
      </v-container></v-card
    >
  </div>
</template>

<script lang="ts">
import { getPokeDetails } from "@/services/PokeService.service";

import Vue from "vue";
export default Vue.extend({
  name: "PokeDetailView",
  props: ["id", "disable"],
  data() {
    return {
      pokemonName: null,
      pokemonWeight: null,
      pictureFront: null,
      pictureBack: null,
    };
  },
  mounted() {
    getPokeDetails(this.id).then((response) => {
      this.pictureFront = response.data.sprites.front_default;
      this.pictureBack = response.data.sprites.back_default;
      this.pokemonName = response.data.name;
      this.pokemonWeight = response.data.weight;
    });
  },
  methods: {
    catchDisable: function () {
      const disabled = true;
      this.$emit("disable-event", disabled);
      console.log(disabled);
    },
  },
  components: {},
});
</script>
<style scpoed>
.poke-detail {
  text-align: -webkit-center;
  padding: 10vh 10vw;
}
.detail {
  font-size: 20px;
}
</style>
