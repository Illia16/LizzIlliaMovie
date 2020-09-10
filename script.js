const app = {};
app.idsForReview = [];

app.resultsToDisplay = [];
app.reviews= [];

// getting all genres
app.genresCall = () => {
    $.ajax({
    url: `https://api.themoviedb.org/3/genre/movie/list`,
    method: 'GET',
    data: {
        api_key: `4b0a04de3275456e960df5811ac4bafd`,
        }
    }).then((res) => {
        //console.log("1st call", res);
        app.displayGenres(res.genres);
    })
};

app.movieCall = async (genreID) => {
    await $.ajax({
    url: `https://api.themoviedb.org/3/discover/movie`,
    method: 'GET',
    data: {
        api_key: `4b0a04de3275456e960df5811ac4bafd`,
        with_genres: genreID,
        //primary_release_year: '1999',
        }
    }).then((res) => {
        //console.log("2nd call", res);

        app.displayMovies(res.results);

        res.results.forEach(function(el) {
            //console.log(el.id);
            app.idsForReview.push(el.id);
        });
    })

    app.callingReviews();
};

app.callingReviews = () => {
    for (i=0; i<app.idsForReview.length; i++) {
        //console.log(app.idsForReview[i], app.idsForReview.length);
        app.reviewsCall(app.idsForReview[i]);
    }
}

app.reviewsCall = (movieID) => {
    $.ajax({
    url: `https://api.themoviedb.org/3/movie/${movieID}/reviews`,
    method: 'GET',
    data: {
        api_key: `4b0a04de3275456e960df5811ac4bafd`,
        }
    }).then((res) => {
        //console.log("3rd call", res);

        const resRev =  res.results.map( (review) => {
            // console.log(review.author, review.content);
            return [review.author, review.content];
        });

        app.reviews.push(resRev);

        for(i=0; i<app.resultsToDisplay.length; i++) {
            if (app.reviews[i].length === 0) {
                null
            } else {
                app.resultsToDisplay[i].author = app.reviews[i][0][0];
                app.resultsToDisplay[i].content = app.reviews[i][0][1];
            };
        };

        console.log(app);

        app.resultsToDisplay.map((el) => {
            const everyMovie =
            `
            <div class="everyMovie">
                <h3>${el.title}</h3>
                <div>
                    <img src=https://image.tmdb.org/t/p/w300/${el.poster_path} alt='${el.title}'/>
                </div>
                <p>Overview:${el.overview}</p>
                <p>Released:${el.release_date}</p>
                <div class="review">
                    <p>Author:${el.author}</p>
                    <p>Review post:${el.content}</p>
                </div>
            </div>
            `
            return $('.moviesResults').append(everyMovie);
        }); 
    });
};

app.displayMovies = (movies) => {
    movies.map( (oneMovie) => {
        //console.log(oneMovie);

        app.resultsToDisplay.push({title: oneMovie.title, poster_path: oneMovie.poster_path, overview: oneMovie.overview, release_date:oneMovie.release_date  });
    })
}


app.displayGenres = (genres) => {
    genres.forEach(function(genreName) {
        const option =
        `<option value="${genreName.id}">${genreName.name}</option>`
        $('#genres').append(option);
    });
};

app.changingID = () => {
    // changing id with
    $('#genres').on('change', function() {
        app.selectedID = this.value;
        //console.log(app.selectedID);
    });
}

app.searchMovies = () => {
    // looking for a movie with ID
    $('#submit').on('click', function(e) {
        e.preventDefault();

        $('.moviesResults').empty();
        app.movieCall(app.selectedID);        
    });
}

app.init = function() {
    app.changingID();
    app.searchMovies();
    app.genresCall();
}

//Document ready
$(function() {
    app.init();
})