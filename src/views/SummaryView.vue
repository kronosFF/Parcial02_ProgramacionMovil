<template>
    <div class="container mb-2">
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-2 justify-content-center">
            <!--Card de cada pelicula-->
            <div class="col col-12">
                <div class="card d-flex align-items-center tarjeta">
                    <div class="card-body">
                        <p class="text">
                            {{ summary }}
                        </p>
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
    name: "SummaryView",

    data() {
        return {
            summary: "",
            nombre: "",
            id: "",
            detailMovie: [],
        };
=======
import { getDetailView } from '@/services/MovieServices'
import { useRoute } from 'vue-router'

export default {
    name: 'SummaryView',

    data() {
        return {
            summary: '',
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
        this.summary = this.detailMovie.overview;
    },
};
</script>
=======
        this.summary = this.detailMovie.overview
    },
}
</script>
<<<<<<< HEAD
>>>>>>> 8e47f2cdf0862bafc000fff044e51fddc1ef8819
=======

<style scoped lang="scss">
.tarjeta{
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
</style>
>>>>>>> 5a7e3316ecea703a032cbba23b9b90b97509bb4a
