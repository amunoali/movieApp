// const apiKey = 'api_key=4cdc9076ed9c0eca9602fb15316dca56'
// const baseUrl = 'https://api.themoviedb.org/3/'
// const apiUrl = baseUrl + '/discover/movie?sort_by=popularity.desc&' + apiKey

const imgUrl = 'https://image.tmdb.org/t/p/w500'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=4cdc9076ed9c0eca9602fb15316dca56'

const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4cdc9076ed9c0eca9602fb15316dca56'

getMovies(apiUrl)

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        showMovies(data.results)
    })
}

function showMovies(data){
    main.innerHTML = ''

    data.forEach(movie =>{
        const {title, poster_path, vote_average, overview} = movie
        const movieE1 = document.createElement('div')
        movieE1.classList.add('movie')
        movieE1.innerHTML = `
        <img src="${imgUrl + poster_path}" alt="${title}">
            <div class="movieInfo">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieE1)
    })
} 

function getColor(vote_average){
    if(vote_average >= 7){
        return 'green'
    }else if (vote_average >= 4){
        return 'orange'
    }else{
        return 'red'
    }

}

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm){
        getMovies(searchUrl+'&query='+searchTerm)
    }else{
        getMovies(apiUrl)
    }
})