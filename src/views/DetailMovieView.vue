<template>
    <div class="container mb-2">
        <div class="row d-flex justify-content-center">
            <router-link :to="{ name: 'home' }">
                <div class="col-sm-1 col-md-3 col-lg-4 mt-5 p-3">
                    <button type="button" class="btn btn-success">
                        Volver al Inicio
                    </button>
                </div>
            </router-link>
        </div>
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-center">
            <!--Card de cada pelicula-->
            <div class="col col-12 mt-3 pt-3 pb-3">
                <div class="card p-2 mx-5 mb-5 d-flex align-items-center">
                    <img src="" alt="" class="card-img-top" />
                    <div class="card-body">
                        <img class="card-img-top" :src="getImage(detailMovie.backdrop_path)" alt="" />
                        <h5 class="card-title">{{ nombre }}</h5>
                        <hr />
                        <p class="card-text">
                            {{ formatDate() }}
                        </p>
                        <hr />
                        <button class="btn btn-outline-success mx-2" @click="goToSummary()">
                            Descripción
                        </button>
                        <button class="btn btn-outline-primary" @click="goToGenders()">
                            Géneros
                        </button>
                        <button class="btn btn-outline-dark mx-2" @click="goToProducer()">
                            País | Productoras
                        </button>
                        <button class="btn btn-outline-dark mx-2" @click="goToTrailer()">
                            Trailer
                        </button>
                    </div>
                </div>
                <!--End card-->
            </div>
        </div>
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-center">
            <div class="col col-12 mt-3 pt-3 pb-3">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { getDetailView } from "@/services/MovieServices";

export default {
    name: "ListMoviesView",

    data() {
        return {
            nombre: "",
            id: "",
            detailMovie: [],
            fecha: [],
        };
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
            return `https://image.tmdb.org/t/p/w500/${backdrop_path}`;
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

        goToSummary() {
            this.$router.push({
                name: "summary",
            });
        },

        goToGenders() {
            this.$router.push({
                name: "genders",
            });
        },

        goToProducer() {
            this.$router.push({
                name: "producer",
            });
        },

        goToTrailer() {
            this.$router.push({
                name: "trailer",
            });
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
        box-shadow: 3px 5px 10px #8e5347;
        background-color: whitesmoke;
        width: 500px;
        height: 500px;

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
