import { createRouter, createWebHistory } from "vue-router";
import MovieView from "@/views/MovieView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MovieView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
