import { useState } from "react"

export const SearchMovie = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '42685bbe6bb0e98fa5de8f0393043665'

    const [searcher, setSearcher] = useState('')
    const [movies, setMovies] = useState([])

    const handleInputChange = (e) => {
        setSearcher(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${searcher}&api_key=${API_KEY}`)
            const data = await response.json()
            setMovies(data.results)
        } catch (error) {
            console.error('There was an error: ', error);
        }
    }

    return (
        <div>
            <h1 className="title">Movie Searcher</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="What movie are you looking for?"
                    value={searcher}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">Search</button>
            </form>


            <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
