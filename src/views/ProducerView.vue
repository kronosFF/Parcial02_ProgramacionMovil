<template>
    <div class="container mb-2">
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-center">
            <!--Card de cada pelicula-->
            <div class="col col-12">
                <div class="card d-flex align-items-center">
                    <div class="card-body">
<<<<<<< HEAD
                        <h3 class="title">Empresas Productoras</h3>
                        <ol class="list-group list-group" v-for="companies in production_companies" :key="companies.id">
                            <li class="list-group-item mt-2">{{ companies.name }}</li>
                        </ol>
                        <hr />
                        <h3 class="title">Pais de Producción</h3>
=======
                        <h3 class="title">
                            Empresas Productoras
                        </h3>
                        <ol class="list-group list-group" v-for="companies in production_companies" :key="companies.id">
                            <li class="list-group-item mt-2">{{ companies.name }}</li>
                        </ol>
                        <hr>
                        <h3 class="title">
                            Pais de Producción 
                        </h3>
>>>>>>> 8e47f2cdf0862bafc000fff044e51fddc1ef8819
                        <ol class="list-group list-group" v-for="country in production_countries" :key="country.id">
                            <li class="list-group-item mt-2">{{ country.name }}</li>
                        </ol>
                    </div>
                </div>
                <!--End card-->
            </div>
        </div>
    </div>
</template>

<script>
<<<<<<< HEAD
import { getDetailView } from "@/services/MovieServices";
import { useRoute } from "vue-router";

export default {
    name: "GendersView",
=======
import { getDetailView } from '@/services/MovieServices'
import { useRoute } from 'vue-router'

export default {
    name: 'GendersView',
>>>>>>> 8e47f2cdf0862bafc000fff044e51fddc1ef8819

    data() {
        return {
            production_companies: [],
            production_countries: [],
<<<<<<< HEAD
            nombre: "",
            id: "",
            detailMovie: [],
        };
=======
            nombre: '',
            id: '',
            detailMovie: [],
        }
>>>>>>> 8e47f2cdf0862bafc000fff044e51fddc1ef8819
    },

    async created() {
        const route = useRoute();
        this.nombre = route.params.name;
        this.id = route.params.id;

        this.detailMovie = await getDetailView(this.id);
<<<<<<< HEAD
        this.production_companies = this.detailMovie.production_companies;
        this.production_countries = this.detailMovie.production_countries;
    },
};
</script>
=======
        this.production_companies = this.detailMovie.production_companies
        this.production_countries = this.detailMovie.production_countries
    },
}
</script>
>>>>>>> 8e47f2cdf0862bafc000fff044e51fddc1ef8819
