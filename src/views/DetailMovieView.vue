<template>
    <div class="container mb-2">
        <div class="row d-flex justify-content-center">
            <router-link :to="{ name: 'home' }">
                <div class="col-sm-1 col-md-3 col-lg-4 mt-5 p-3 ">
                    <button type="button" class="btn ">Volver al Inicio</button>
                </div>
            </router-link>
        </div>
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-center">
            <!--Card de cada pelicula-->
            <div class="col col-12 mt-3 pt-3 pb-3">
                <div class="card p-2 mx-5  mb-5 d-flex align-items-center">
                    <img src="" alt="" class="card-img-top">
                    <div class="card-body">
                        <img class="card-img-top" :src="getImage(detailMovie.backdrop_path)" alt="">
                        <h5 class="card-title">{{ nombre }}</h5>
                        <hr>
                        <p class="card-text">
                            {{ fecha }}
                        </p>
                        <hr>
                        <button class="btn mx-2" @click="goToSummary()">Descripción</button>
                        <button class="btn " @click="goToGenders()">Géneros</button>
                        <button class="btn mx-2" @click="goToProducer()">País | Productoras</button>
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

        goToSummary() {
            this.$router.push(
                {
                    name: 'summary'
                }
            )
        },

        goToGenders() {
            this.$router.push(
                {
                    name: 'genders'
                }
            )
        },

        goToProducer() {
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
    max-width: 1450px;
    margin: 0 auto;

    .card {
        border-radius: 5px;
        box-shadow: 3px 5px 10px #8e5347;
        background-color: whitesmoke;
        width: 500px;
        height: 500px;

    }

    img {
        padding: 5px;
    }

    .card:hover {
        transform: translateY(-5px);
        transition: transform 0.3s;
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
    color: whitesmoke;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 5px;
    background-color: #8e5347;

    &:hover {
        background-color: whitesmoke;
        color: #8e5347;
        border: 2px solid #8e5347;
    }
}

}
</style>