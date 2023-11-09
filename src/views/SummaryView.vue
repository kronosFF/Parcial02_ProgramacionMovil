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
    },

    async created() {
        const route = useRoute();
        this.nombre = route.params.name;
        this.id = route.params.id;

        this.detailMovie = await getDetailView(this.id);
        this.summary = this.detailMovie.overview
    },
}
</script>

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