// ValinaJS, Fetch dan Asyhc Await
const searchBtn = document.querySelector('.btn-search');
searchBtn.addEventListener('click', async () =>{
    try{
        const inputSearch = document.querySelector('.input-keyword');
        const movies = await getMovies(inputSearch.value);
        updateUI(movies);
    }catch(err){
        alert(err);
    }  
});
const getMovies = (keyword) =>{
    return fetch('http://www.omdbapi.com/?apikey=90535a46&s=' + keyword)
    .then((response) => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then((response) => {
        if(response.Response === "False"){
            throw new Error(response.Error);
        }
        return response.Search;
    });
}
const updateUI = (movies) =>{
    let cards = '';
    movies.forEach((m) =>{
        cards += cetakCards(m);
    });
    const mvContainer = document.querySelector('.movies-container');
    mvContainer.innerHTML = cards;
}

document.addEventListener('click', async (e) =>{
    try{
        if(e.target.classList.contains('submit-detail')){
            const imdbID = e.target.dataset.imdbid;
            const movieDetails = await getDetails(imdbID);
            updateDetails(movieDetails);
    }
    }catch(err){
        alert(err);
    }
});

const getDetails = (id) =>{
    return fetch('http://www.omdbapi.com/?apikey=90535a46&i=' + id)
    .then((response) => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then((m) => {
        if(m.Response === "False"){
            throw new Error(m.statusText);
        }
        return m;
    });
}

const updateDetails = (m) =>{
    const details = cetakDetail(m);
    const BodyModal = document.querySelector('.modal-body');
    BodyModal.innerHTML = details;
}






//JQUERY AJAX
// $('.btn-search').on('click', function(){
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=90535a46&s=' + $('.input-keyword').val(),
//         success: (hasil) =>{
//             const movies = hasil.Search;
//             let cards = '';
//             movies.forEach((m) =>{
//                 cards += cetakCards(m);
//             });
//             $('.movies-container').html(cards);
//             $('.submit-detail').on('click', function(){
//                 console.log($(this).data('imdbid'));
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=90535a46&i='+ $(this).data('imdbid'),
//                     success: m =>{
//                         console.log(m);
//                         const view = cetakDetail(m);
//                     $('.modal-body').html(view);
//                     },
//                     error: (e) =>{
//                         console.log(e.responseText);
//                     }
//                 });
//             });
//         },
//         error: (e) =>{
//             console.log(e.responseText);
//         }
//     });
// });

// //VANNILA JS FETCH
// const btnSearch = document.querySelector('.btn-search');
// btnSearch.addEventListener('click', function(){
//     const inputSearch = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=90535a46&s=' +inputSearch.value)
//     .then((movie) => movie.json())
//     .then((movie) => {
//         const movies = movie.Search;
//         let cards = '';
//         movies.forEach((m) =>{
//             cards += cetakCards(m);
//         });
//         const viewCards = document.querySelector('.movies-container');
//         viewCards.innerHTML = cards;

//         const btnDetail = document.querySelectorAll('.submit-detail');
//         btnDetail.forEach(btn =>{
//             btn.addEventListener('click', function(){
//                 const imdbID = this.dataset.imdbid;
//                 fetch('http://www.omdbapi.com/?apikey=90535a46&i=' + imdbID)
//                 .then((response) => response.json())
//                 .then((m) =>{
//                     const detailView = cetakDetail(m);
//                     const modalBody = document.querySelector('.modal-body');
//                     modalBody.innerHTML = detailView;
//                 })
//             })
//         });
//     });
// });

const cetakCards = (m) =>{
    return `<div class="col-md-3 my-3">
    <div class="card">
    <img src="${m.Poster}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${m.Title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
      <a href="#" class="btn btn-primary submit-detail" data-toggle="modal" data-target="#viewData" data-imdbid="${m.imdbID}">Show Detail</a>
    </div>
  </div>
</div>`;
}

const cetakDetail = (m) =>{
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-6">
            <img src="${m.Poster}" class="img-fluid img-responsive"/>
        </div>
        <div class="col-md-6">
          <ul class="list-group">
              <li class="list-group-item"><strong>Title: </strong>${m.Title}</li>
              <li class="list-group-item"><strong>Year: </strong>${m.Year}</li>
              <li class="list-group-item"><strong>Genre: </strong>${m.Genre}</li>
              <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
              <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
              <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
              <li class="list-group-item"><strong>Plot: </strong><br/> ${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`;
}