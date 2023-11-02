<template>
  <div class="container mb-2">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-12">
        <h2 class="text-center p-3">Géneros de películas</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3 mt-3 pt-3 pb-3" v-for="genero in generos" :key="genero.id">
        <router-link :to="{name:'listMovies', params:{type:genero.name}}">
          <div class="card p-2 d-flex align-items-center" @click="ListMoviesView">
            <div class="card-title">
              <h3 class="text-center">{{ genero.name }}</h3>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="col d-flex justify-content-center">
      <button class="btn me-5">CARTELERA</button>
      <button class="btn me-5">MEJOR CALIFICADAS</button>
      <button class="btn">POPULARES</button>
    </div>
  </div>
</template>

<script>
import { getGenres } from "@/services/MovieServices";
import ListMoviesView from "./ListMoviesView.vue";

export default {
  name: "Inicio",
  data() {
    return {
      generos: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.generos = await getGenres();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  max-width: 1450px;
  margin: 0 auto;

  .card {
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-5px);
      transition: transform 0.3s;
    }

    .card-title {
      padding: 10px 0;
    }
  }

  h2 {
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;

    .col-sm-3 {
      flex: 0 0 25%;
      max-width: 25%;
      padding-right: 15px;
      padding-left: 15px;

      @media (max-width: 768px) {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }
  }

  .btn {
    padding: 10px 20px;
    border: 2px solid gray;
    background-color: white;
    color: gray;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s;

    &:hover {
      background-color: #757f75;
      color: white;
    }
  }
}
</style>
