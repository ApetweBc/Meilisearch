import { MeiliSearch } from 'meilisearch'
import movies from '../movies.json'

// Create client
const client = new MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: '_CILaq1dvB5JPFjsGOydvFOO5mwUGXO6As5kjiCSFAY'
  })
 
  // Add movies to the index
  client.index('movies').addDocuments(movies)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

  // Checj if the the indexes are created
    client.getTasks().then((res) => console.log(res))

   //Search for a movie
    let container = document.getElementById('container');

    client.index('movies').search('James bond').then((res) => {
        res.hits.forEach((hit) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h2>${hit.title}</h2>
                <img src="https://image.tmdb.org/t/p/w500${hit.poster}" class="image_size" />
                <p>${hit.overview}</p>
                <p>Release date: ${ new Date(hit.release_date) }</p>
                <p>Genres: ${hit.genres.join(', ')}</p>
            `;
            container.appendChild(div);
        })
    })
