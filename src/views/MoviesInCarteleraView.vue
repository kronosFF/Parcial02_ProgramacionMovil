<template>
    <div class="container mb-2">
        <div class="row d-flex justify-content-center">
            <router-link :to="{ name: 'home' }">
                <div class="col-sm-1 col-md-3 col-lg-4 mt-5 p-3 ">
                    <button type="button" class="btn btn-success">Ir al inicio</button>
                </div>
            </router-link>
            <div class="col-sm-10 mt-5 p-2">
                <h2 class="text-color-primary">Cartelera</h2>
            </div>
        </div>
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
            <!--Card de cada pelicula-->
            <div class="col mt-3 pt-3 pb-3" v-for="lista in cartelera" :key="lista.id">
                <div class="card p-2 mx-5  mb-5 d-flex align-items-center">
                    <img src="" alt="" class="card-img-top">
                    <div class="card-body">
                        <img class="card-img-top" :src="getImage(lista.backdrop_path)" alt="">
                        <h5 class="card-title">{{ lista.title }}</h5>
                        <hr>
                        <!-- <router-link :to="{name: 'Detailmovie',params:{name:lista.title, id:lista.id}}">
                            <button class="btn btn-success">Ver detalle</button>
                        </router-link> -->
                    </div>
                </div>
            </div>
            <!--End card-->
        </div>

    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { getMoviesInCartelera } from '@/services/MovieServices'

export default {
    name: 'MoviesInCarteleraView',

    data() {
        return {
            cartelera: {},
            id:'',
        }
    },

    //Metodo encargado de recibir el id del género que se manda por url, y ejecutar el servicio
    //de la Api que extrae las peliculas pertenecientes a ese id del genero
    async created() {
        const route = useRoute()
        this.id = route.params.id;

        this.cartelera = await getMoviesInCartelera(this.id);
        console.log(this.cartelera)
    },

    methods: {
        //Metodo para extraer la imagen de cada pelicula
        getImage(backdrop_path) {
            return (`https://image.tmdb.org/t/p/w500/${backdrop_path}`)
        },
    },
}

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
