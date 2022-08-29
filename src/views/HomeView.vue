<template>
  <div class="home">
    <v-breadcrumbs :items="item" divider=">" large></v-breadcrumbs>
    <div v-if="disable == true">
      <v-container v-for="align in alignments" :key="align" class="poke-list">
        <v-row :align="align" no-gutters>
          <v-col v-for="(poke, index) in pokes" :key="poke.name">
            <v-card
              max-width="250"
              @click="
                id = index + 1;
                disable = false;
              "
            >
              <v-img width="250" :src="pokePictureURL[index]"></v-img>
              <v-divider class="mx-4"></v-divider>
              <v-card-title style="justify-content: center"> {{ poke.name }} </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div v-if="disable == false">
      <PokemonDetail :id="id" :disable="disable" @disable-event="disableDecision"></PokemonDetail>
    </div>
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
import PokemonDetail from "@/views/DetailView.vue";

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
          disabled: true,
        },
      ],
      pokes: [] as IPokeModel[],
      pokePictureURL: [] as IPokeDetailsModel[],
      id: 1,
      disable: true,
    };
  },
  mounted() {
    console.log(this.disable);
    getPokeList().then((response) => {
      this.pokes = response.data.results;

      this.getPokeDetailss(this.pokes.length);
    });
  },
  methods: {
    getPokeDetailss(length: number) {
      for (let i = 1; i <= length; i++) {
        getPokeDetails(i).then((response) => {
          this.pokePictureURL.push(response.data.sprites.front_default);
        });
      }
    },
    clickEvent() {
      this.disable = true;
    },
    disableDecision(decision: boolean) {
      this.disable = decision;
    },
  },
  components: {
    PokeCategory,
    DetailView,
    PokemonDetail,
  },
});
</script>
<style scpoed>
.home {
  padding: 10vh 5vw;
}
.poke-list {
  text-align: -webkit-center;
}
.v-card {
  margin: 2vh 0vw;
}
</style>
