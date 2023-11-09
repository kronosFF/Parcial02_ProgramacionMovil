import { createRouter, createWebHistory } from "vue-router";
import MovieView from "@/views/MovieView.vue";
import ListMoviesView from "@/views/ListMoviesView.vue";
import DetailMovieView from "@/views/DetailMovieView.vue";
import SummaryView from "@/views/SummaryView.vue";
import gendersView from "@/views/gendersView.vue";
import ProducerView from "@/views/ProducerView.vue";
import TrailerView from "@/views/TrailerView.vue";
import MoviesInCartelera from "@/views/MoviesInCarteleraView.vue";
import PopularMovies from "@/views/PopularView.vue";
import MejorCalificadas from "@/views/MejorCalificadasView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MovieView,
  },
  // Ruta para la lista de películas con un filtro para especificar el tipo de película
  {
    path: "/list-movies/:type/:id",
    name: "listMovies",
    component: ListMoviesView,
  },
  // Ruta para la vista detallada de una película con rutas hijas
  {
    path: "/detail-movie/:name/:id",
    name: "Detailmovie",
    component: DetailMovieView,
    children: [
      {
        path: "summary",
        name: "summary",
        component: SummaryView,
      },
      {
        path: "genders",
        name: "genders",
        component: gendersView,
      },
      {
        path: "producer",
        name: "producer",
        component: ProducerView,
      },
      {
        path: "trailer",
        name: "trailer",
        component: TrailerView,
      },
    ],
  },

  {
    path: "/moviesInCartelera/:id",
    name: "moviesInCartelera",
    component: MoviesInCartelera,
  },

  {
    path: "/movies-Populares/:id",
    name: "movies-Populares",
    component: PopularMovies,
  },

  {
    path: "/top-rated/:id",
    name: "top-rated",
    component: MejorCalificadas,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
