<template>
    <div class="container mb-2">
        <div class="row d-flex justify-content-center">
            <router-link :to="{ name: 'home' }">
                <div class="col-sm-1 col-md-3 col-lg-4 mt-5 p-3 ">
                    <button type="button" class="btn btn-primary">Ir al inicio</button>
                </div>
            </router-link>
            <div class="col-sm-10 mt-5 p-2">
                <h2 class="text-color-primary">Listado de películas del género {{ nombre }}</h2>
            </div>
        </div>
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
            <!--Card de cada pelicula-->
            <div class="col mt-3 pt-3 pb-3" v-for="lista in paginated_data" :key="lista.id">
                <div class="card p-2 mx-5  mb-5 d-flex align-items-center">
                    <img src="" alt="" class="card-img-top">
                    <div class="card-body">
                        <img class="card-img-top" :src="getImage(lista.backdrop_path)" alt="">
                        <h5 class="card-title">{{ lista.title }}</h5>
                        <hr>
                        <p class="card-text">
                            {{ lista.release_date }}
                        </p>
                        <hr>
                        <button class="btn btn-success">Ver detalle</button>
                    </div>
                </div>
            </div>
            <!--End card-->
        </div>

        <!--pagination-->
        <div class="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li @click="getPreviousPage()" class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li @click="getDataPage(pages)" class="page-item" :class="isActive(pages)" v-for="pages in totalPages()"><a class="page-link" href="#">{{ pages }}</a></li>
                    <li @click="getNextPage()" class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
        <!--End pagination-->

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
            id: '',
            listMovies: [],
            paginated_data: [],
            elemntsForPage: 4,
            actualPage: 1,
        }
    },

    //Metodo encargado de recibir el id del género que se manda por url, y ejecutar el servicio
    //de la Api que extrae las peliculas pertenecientes a ese id del genero
    async created() {
        const route = useRoute();
        this.nombre = route.params.type;
        this.id = route.params.id;

        this.listMovies = await getListByGender(this.id);
    },

    mounted() {
        this.getDataPage(1);
    },


    methods: {
        //Metodo para extraer la imagen de cada pelicula
        getImage(backdrop_path) {
            return (`https://image.tmdb.org/t/p/w500/${backdrop_path}`)
        },

        //Metodo para calcular el total de páginas
        totalPages() {
            //Funcion ceil es para redondear el número en caso de que no sea una division exacta
            return Math.ceil(this.listMovies.length / this.elemntsForPage)
        },

        //Obtiene el numero de página
        getDataPage(pageNumber) {
            this.actualPage = pageNumber;
            this.paginated_data = [];
            let init = (pageNumber * this.elemntsForPage) - this.elemntsForPage;
            let end = (pageNumber * this.elemntsForPage);

            this.paginated_data = this.listMovies.slice(init, end)
        },

        getPreviousPage() {
            if (this.actualPage > 1) {
                this.actualPage--;
            }
            this.getDataPage(this.actualPage);
        },

        getNextPage() {
            if (this.actualPage < this.totalPages()) {
                this.actualPage++;
            }
            this.getDataPage(this.actualPage);
        },

        isActive(numberPage){
            //Funcion ternaria
            return numberPage == this.actualPage ? 'active' : '';
        }
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
