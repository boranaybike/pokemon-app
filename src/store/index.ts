import { IPokeModel } from "@/models/PokemonModel.interface";
import Vue from "vue";
import Vuex from "vuex";
import { getPokeList } from "@/services/PokeService.service";
import { getPokeDetails } from "@/services/PokeService.service";
import { IPokeDetailsModel } from "@/models/PokemonDetailModel.interface";

Vue.use(Vuex);
interface State {
  pokeList: IPokeModel[];
  pokeDetails: IPokeDetailsModel[];
}
const state: State = {
  pokeList: [],
  pokeDetails: [],
};

export default new Vuex.Store({
  state: state,

  getters: {},
  mutations: {
    SET_POKES(state: State, pokes: IPokeModel[]) {
      state.pokeList = pokes;
    },
    SET_POKE_DETAILS(state: State, pokeDetails: IPokeDetailsModel[]) {
      state.pokeDetails = pokeDetails;
    },
  },
  actions: {
    loadPokeList({ commit }) {
      let pokes: IPokeModel[] = [];
      getPokeList()
        .then((response) => {
          pokes = response.data.results;
          commit("SET_POKES", pokes);
        })
        .catch((error) => console.log(error));
    },
    loadPokeDetails({ commit }) {
      let pokeDetails: IPokeDetailsModel[] = [];
      getPokeDetails(1).then((response) => {
        pokeDetails = response.data.results.url.sprites;
        commit("SET_POKE_DETAILS", pokeDetails);
      });
    },
  },
  modules: {},
});
