import React,{useState, useEffect,useCallback} from 'react';
import './App.css';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
function App() {
  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  const getMoviesHandler = useCallback(async()=>{
    setIsLoading(true);
    try {
      const response =  await fetch('https://react-hhtp-34deb-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');
      setError(null);
      if(!response.ok){
        throw new Error("Something went worng!");
      }
      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id : key,
          title : data[key].title,
          releaseDate : data[key].releaseDate,
          openingText: data[key].openingText
        })
      }
      setMovies(loadedMovies);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  let content = <p>Found No Movies!</p>;
  if(movies.length > 0){
    content = <MoviesList movies={movies}></MoviesList>
  }

  if(isLoading){
    content =<p>Loding...</p>;
  }

  if(error){
    content = <p>{error}</p>;
  }
  async function addMovieHandler(movie) {
    console.log(movie);
    try {
      const response =  await fetch('https://react-hhtp-34deb-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
      {
        "method": "POST",
        "body": JSON.stringify(movie),
        "headers":{
          "content-type":"application-json"
        }
      });
      if(!response.ok){
        throw new Error("Something went worng!");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(()=>{
    getMoviesHandler();
  },[getMoviesHandler]);
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
