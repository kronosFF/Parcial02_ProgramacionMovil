<template>
    <div class="container mb-2">
        <div class="row d-flex justify-content-center">
            <router-link :to="{ name: 'home' }">
                <div class="col-sm-1 col-md-3 col-lg-4 mt-5 p-3">
                    <button type="button" class="btn btn-primary">Ir al inicio</button>
                </div>
            </router-link>
            <div class="col-sm-10 mt-5 p-2">
                <h1 class="text-center p-3">Populares</h1>
            </div>
        </div>
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
            <div class="col-sm-2 mt-3 pt-3 pb-3" v-for="movie in paginated_data" :key="movie.id">
                <div class="card p-2 mx-5 mb-5 d-flex align-items-center">
                    <div class="card-body">
                        <img :src="getImageUrl(movie.poster_path)" alt="Póster de la película" />
                        <div class="card-title">
                            <h2 class="card-title text-center">{{ movie.title }}</h2>
                        </div>
                        <p class="card-text">{{ movie.release_date }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!--pagination-->
        <div class="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li @click="getPreviousPage()" class="page-item">
                        <a class="page-link" href="#">Previous</a>
                    </li>
                    <li @click="getDataPage(pages)" class="page-item" :class="isActive(pages)"
                        v-for="pages in totalPages()">
                        <a class="page-link" href="#">{{ pages }}</a>
                    </li>
                    <li @click="getNextPage()" class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
        <!--End pagination-->
    </div>
</template>

<script>
import { getGenresMovies } from "@/services/MovieServices";

export default {
    name: "ListMoviesView",
    data() {
        return {
            movies: [],
            paginated_data: [],
            elemntsForPage: 4,
            actualPage: 1,
        };
    },
    async created() {
        this.movies = await this.getMovies();
    },
    mounted() {
        this.getDataPage(1);
    },
    methods: {
        async getMovies() {
            try {
                const genreId = this.$route.params.type;
                const response = await getGenresMovies(genreId);
                return response;
            } catch (error) {
                console.error("Error al obtener las películas:", error);
            }
        },
        getImageUrl(poster_path) {
            return `https://image.tmdb.org/t/p/w500/${poster_path}`;
        },

        //Metodo para calcular el total de páginas
        totalPages() {
            //Funcion ceil es para redondear el número en caso de que no sea una division exacta
            return Math.ceil(this.movies.length / this.elemntsForPage);
        },

        //Obtiene el numero de página
        getDataPage(pageNumber) {
            this.actualPage = pageNumber;
            this.paginated_data = [];
            let init = pageNumber * this.elemntsForPage - this.elemntsForPage;
            let end = pageNumber * this.elemntsForPage;

            this.paginated_data = this.movies.slice(init, end);
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
            return numberPage == this.actualPage ? "active" : "";
        },
    },
};
</script>

<style scoped lang="scss">
.container {
    max-width: 1450px;
    margin: 0 auto;
    background-color: #f5f5f5;

    .card {
        border: 1px solid #e2e2e2;
        border-radius: 5px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;

        &:hover {
            transform: translateY(-5px);
            transition: transform 0.3s;
        }

        .card-title {
            padding: 10px 0;
        }
    }

    h1 {
        color: #333;
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
        transform: scale(0.95);

        &:hover {
            background-color: #757f75;
            color: white;
        }
    }

    @media (max-width: 576px) {
        .col-sm-3 {
            flex: 0 0 100%;
            max-width: 100%;
        }
    }
}
</style>
