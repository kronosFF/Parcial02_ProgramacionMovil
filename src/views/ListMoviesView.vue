<template>
    <div class="container mb-2">
        <div class="row d-flex justify-content-center">
            <div class="col-sm-12">
                <h2 class="text-center text-color-primary p-3">Listado de películas del género {{ nombre }}</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2 col-lg-4 mt-3 pt-3 pb-3">
                <div class="card p-2 mb-5 d-flex align-items-center">
                    <img src="" alt="" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">{{ name_movie }}</h5>
                        <hr>
                        <p class="card-text">
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col d-flex justify-content-center">
        <button class="btn me-5">CARTELERA</button>
        <button class="btn me-5">MEJOR CALIFICADAS</button>
        <button class="btn">POPULARES</button>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { getListByGender } from '@/services/MovieServices'

export default {
    name: 'ListMoviesView',

    data() {
        return {
            nombre: '',
            name_movie: '',
            listMovies: [],
        }
    },

    async created() {
        const route = useRoute();
        this.nombre = route.params.type 

        this.listMovies = await getListByGender(this.nombre)
        this.name_movie = this.listMovies.target
        console.log(this.listMovies)
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
