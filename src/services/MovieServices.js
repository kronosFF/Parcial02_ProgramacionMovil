import axios from "axios";

const API_KEY = "492d218f089fd8c20e9c3a945b482a9f";
const LANGUAGE = "es-CO";

export const getGenres = async () => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`
        );
        return response.data.genres;
    } catch (error) {
        throw new Error("Error al obtener los géneros de películas");
    }
};

export const getMoviesInCartelera = async (pageNumber) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?page=${pageNumber}&api_key=${API_KEY}&language=${LANGUAGE}`
        );
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener las películas en cartelera");
    }
};

export const getPopularMovies = async (pageNumber) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?page=${pageNumber}&api_key=${API_KEY}&language=${LANGUAGE}`
        );
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener las películas populares");
    }
};

export const getTopRatedMovies = async (pageNumber) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?page=${pageNumber}&api_key=${API_KEY}&language=${LANGUAGE}`
        );
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener las películas mejor calificadas");
    }
};

export const getNextReleases = async (pageNumber) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?page=${pageNumber}&api_key=${API_KEY}&language=${LANGUAGE}`
        );
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener las películas mejor calificadas");
    }
};

export const getDetailView = async (movieId) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?&api_key=${API_KEY}&language=${LANGUAGE}`
        );
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener las películas mejor calificadas");
    }
};

//Servicio que filtra las peliculas segun el genero
export const getListByGender = async (gender_id) => {
    try{
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&with_genres=${gender_id}`
        );
        return response.data;
    }catch(error) {
        throw new error('No se pudo obtener las peliculas del genero seleccionado')
    }
}
