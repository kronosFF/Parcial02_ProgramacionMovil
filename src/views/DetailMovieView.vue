<template>
  <div class="container mb-2">
    <div class="row justify-content-center">
      <router-link :to="{ name: 'home' }">
        <div class="col-12 col-md-6 col-lg-4 mt-5 p-3">
          <button type="button" class="btn btn-success btn-block"><b>Volver al Inicio</b></button>
        </div>
      </router-link>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 justify-content-center">
      <!-- Card de cada película -->
      <div class="col mt-3 pt-3 pb-3">
        <div class="card">
          <img src="" alt="" class="card-img-top">
          <div class="card-body">
            <img class="card-img-top" :src="getImage(detailMovie.backdrop_path)" alt="">
            <h5 class="card-title">{{ nombre }}</h5>
            <hr>
            <p class="card-text">{{ formatDate() }}</p>
            <hr>
            <div class="btn-group" role="group">
              <button class="btn btn-outline-success" @click="goToSummary()">Descripción</button>
              <button class="btn btn-outline-primary" @click="goToGenders()">Géneros</button>
              <button class="btn btn-outline-dark" @click="goToProducer()">País | Productoras</button>
            </div>
          </div>
        </div>
      </div>
      <!-- End card -->
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 justify-content-center">
      <div class="col mt-3 pt-3 pb-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>



<script>
import { useRoute } from 'vue-router'
import { getDetailView } from '@/services/MovieServices'


export default {
    name: 'ListMoviesView',

    data() {
        return {
            nombre: '',
            id: '',
            detailMovie: [],
            fecha: [],
        }
    },

    //Metodo encargado de recibir el id del género que se manda por url, y ejecutar el servicio
    //de la Api que extrae las peliculas pertenecientes a ese id del genero
    async created() {
        const route = useRoute();
        this.nombre = route.params.name;
        this.id = route.params.id;

        this.detailMovie = await getDetailView(this.id);
        this.fecha = this.detailMovie.release_date;
    },

    methods: {
        getImage(backdrop_path) {
            return (`https://image.tmdb.org/t/p/w500/${backdrop_path}`)
        },

        formatDate() {
            var fecha = this.fecha;
            if (typeof fecha === 'string') {
                var components = fecha.split("-");
                var day = components[2];
                var monthNumber = parseInt(components[1]);
                var year = components[0];

                // Arreglo de nombres de meses
                var monthNames = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ];

                // Obtener el nombre del mes correspondiente
                var monthName = monthNames[monthNumber - 1]; // Restamos 1 porque los índices de los arreglos comienzan en 0

                return `${day} de ${monthName} de ${year}`;
            } else {
                return "Invalid date format";
            }
        },


        goToSummary(){
            this.$router.push(
                {
                    name: 'summary'
                }
            )
        },

        goToGenders(){
            this.$router.push(
                {
                    name: 'genders'
                }
            )
        },

        goToProducer(){
            this.$router.push(
                {
                    name: 'producer'
                }
            )
        }
    },

}

</script>

<style scoped lang="scss">
.container {
    background-color:black ;
    margin-top: 0px;
}

.card {
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s;
}

.card-title {
  padding: 10px 0;
}

.btn-group {
  margin-top: 10px;
}

.btn-group button {
  margin-right: 10px;
}
</style>