<template>
    <div class="container mb-2 body">
        <div class="row d-flex justify-content-center">
            <router-link :to="{ name: 'home' }">
                <div class="col-sm-1 col-md-3 col-lg-4 mt-5 p-3 ">
                    <button type="button" class="btn">Ir al inicio</button>
                </div>
            </router-link>
            <div class="col-sm-10 mt-5 p-2">
                <h2 class="text-color-primary">Listado de películas del género {{ nombre }}</h2>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col col-sm-2 col-md-2 col-lg-3 justify-content-center" v-for="lista in listMovies" :key="lista.id">
                <div class="card mb-4" style="width: 20rem;">
                    <img :src="getImage(lista.backdrop_path)" class="card-img-top" alt="...">
                    <div class="card-body">
                        <hr>
                        <h5 class="card-title">{{ lista.title }}</h5>
                        <hr>
                        <router-link :to="{ name: 'Detailmovie', params:{name: lista.title, id: lista.id} }">
                            <button class="btn">Ver detalle</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!--pagination-->
        <div class="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li @click="getPreviousPage()" class="page-item"><a class="page-link pagination-button"
                            href="#">Previous</a></li>
                    <li @click="getDataPage(pages)" class="page-item"
                        v-for="pages in totalPages()"><a class="page-link page-number" href="#">{{ pages }}</a></li>
                    <li @click="getNextPage()" class="page-item"><a class="page-link pagination-button" href="#">Next</a>
                    </li>
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
        console.log(this.listMovies)
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

        isActive(numberPage) {
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
}

.body {
    background-color: #fbf6f5;
}

.card {
    border-radius: 5px;
    box-shadow: 3px 5px 10px #8e5347;
    background-color: whitesmoke;

}
img {
    padding: 5px;
}

.card:hover {
    transform: translateY(-5px);
    transition: transform 0.3s;
}

h2 {
    color: black;
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

.pagination-button {
    padding: 10px 20px;
    background-color: #8e5347;
    color: whitesmoke;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s;
}

.pagination-button:hover {
    background-color: whitesmoke;
    color: #8e5347;
    border:2px solid #8e5347;
}

.page-number {
    padding: 10px 15px;
    background-color: #8e5347;
    color: whitesmoke;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s;

}

.page-number:hover {
    background-color: whitesmoke;
    color: #8e5347;
    border:2px solid #8e5347;
}
</style>
