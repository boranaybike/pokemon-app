<template>
  <div class="home">
    <v-breadcrumbs :items="item" divider=">" large></v-breadcrumbs>

    <v-container v-for="align in alignments" :key="align" class="poke-list">
      <v-row :align="align" no-gutters>
        <v-col v-for="(poke, index) in pokes" :key="poke.name">
          <v-card class="mx-auto my-12" max-width="250">
            <v-img width="9250" :src="pokePictureURL[index]"></v-img>
            <v-divider class="mx-4"></v-divider>
            <v-card-title style="justify-content: center"> {{ poke.name }} </v-card-title>
            <v-btn @click="item[1].disabled = false">details</v-btn>
            <v-btn @click="item[1].disabled = true">less detail</v-btn>
            <div v-if="!item[1].disabled"><DetailView v-bind:poke="poke" /></div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PokeCategory from "@/components/PokemonCategory.vue";
import { getPokeDetails } from "@/services/PokeService.service";
import { getPokeList } from "@/services/PokeService.service";
import { IPokeModel } from "@/models/PokemonModel.interface";
import { IPokeDetailsModel } from "@/models/PokemonDetailModel.interface";
import DetailView from "./DetailView.vue";
export default Vue.extend({
  name: "HomeView",
  data() {
    return {
      alignments: ["start", "center", "end"],
      item: [
        {
          text: "Pokemon List",
          disabled: false,
        },
        {
          text: "Pokemon Detail",
          disabled: false,
        },
      ],
      pokes: [] as IPokeModel[],
      pokePictureURL: [] as IPokeDetailsModel[],
    };
  },
  mounted() {
    getPokeList().then((response) => {
      this.pokes = response.data.results;

      this.getPokeDetailss(this.pokes.length);
    });
  },
  methods: {
    getPokeDetailss(length: number) {
      for (let i = 0; i < length; i++) {
        getPokeDetails(i).then((response) => {
          this.pokePictureURL.push(response.data.sprites.front_default);
        });
      }
    },
    clickEvent() {
      this.item[1].disabled = true;
    },
  },
  components: {
    PokeCategory,
    DetailView,
  },
});
</script>
<style scpoed>
.home {
  padding: 10vh 5vw;
}
</style>
