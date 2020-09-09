const app = {};

// getting all genres
app.getGenres = () => {
    $.ajax({
    url: `https://api.themoviedb.org/3/genre/movie/list`,
    method: 'GET',
    data: {
        api_key: `4b0a04de3275456e960df5811ac4bafd`,
        }
    }).then((res) => {
        console.log("1st call", res);
    })
};


app.getMovies = () => {
    $.ajax({
    url: `https://api.themoviedb.org/3/discover/movie`,
    method: 'GET',
    data: {
        api_key: `4b0a04de3275456e960df5811ac4bafd`,
        with_genres: '12',
        //primary_release_year: '1999',
        }
    }).then((res) => {
        console.log("2nd call", res);
    })
};

app.getReviews = () => {
    $.ajax({
    url: `https://api.themoviedb.org/3/movie/337401/reviews`,
    method: 'GET',
    data: {
        api_key: `4b0a04de3275456e960df5811ac4bafd`,
        }
    }).then((res) => {
        console.log("3rd call", res);
    })
};


app.init = function() {
    app.getGenres();
    app.getMovies();
    app.getReviews();
}

//Document ready
$(function() {
    app.init();
})