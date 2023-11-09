import axios from "axios";

const API_KEY = "492d218f089fd8c20e9c3a945b482a9f";
const LANGUAGE = "es-CO";

function formatRelaseDate(original_date){
    let months = [
        { id: 1, nombre: 'Enero' },
        { id: 2, nombre: 'Febrero' },
        { id: 3, nombre: 'Marzo' },
        { id: 4, nombre: 'Abril' },
        { id: 5, nombre: 'Mayo' },
        { id: 6, nombre: 'Junio' },
        { id: 7, nombre: 'Julio' },
        { id: 8, nombre: 'Agosto' },
        { id: 9, nombre: 'Septiembre' },
        { id: 10, nombre: 'Octubre' },
        { id: 11, nombre: 'Noviembre' },
        { id: 12, nombre: 'Diciembre' },
    ]

    let array_date = original_date.split("-");
    let year = array_date[0]
    let month_id = array_date[1]
    let month = months.find(element => {return element.id == month_id})
    let day = array_date[2]
    return '${day} de ${month.name} de ${year}'
}

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
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${LANGUAGE
        }&with_genres=${gender_id}`
         
        );
        return response.data.results;
    }catch(error) {
        throw new error('No se pudo obtener las peliculas del genero seleccionado')
    }
}
