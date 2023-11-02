import { createRouter, createWebHistory } from "vue-router";
import MovieView from "@/views/MovieView.vue";
import ListMoviesView from "@/views/ListMoviesView.vue";
import DetailMovieView from "@/views/DetailMovieView.vue";
import SummaryView from "@/views/SummaryView.vue";
import gendersView from "@/views/gendersView.vue";
import ProducerView from "@/views/ProducerView.vue";
import TrailerView from "@/views/TrailerView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MovieView,
  },
  // Ruta para la lista de películas con un filtro para especificar el tipo de película
  {
    path: "/list-movies/:type",
    name: "listMovies",
    component: ListMoviesView,
  },
  // Ruta para la vista detallada de una película con rutas hijas
  {
    path: "/detail-movie/:id",
    name: "Detailmovie",
    component: DetailMovieView,
    children: [
      {
        path: "summary",
        name: "Summary",
        component: SummaryView,
      },
      {
        path: "genders",
        name: "Genders",
        component: gendersView,
      },
      {
        path: "Producers",
        name: "Producers",
        component: ProducerView,
      },
      {
        path: "Trailer",
        name: "Trailer",
        component: TrailerView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
