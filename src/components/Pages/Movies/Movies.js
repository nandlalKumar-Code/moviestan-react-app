import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomePagination  from '../../Pagination/CustomePagination';
import SingleContent from '../../SingleContent/SingleContent';
import Genres from '../../Genres';
import useGenres from '../../hooks/useGenre';


const Movies = () => {

  const [page,setPage]= useState(1);
  const [content,setContent] = useState([]);
  const [numofPages,setNumofPages]= useState();
  const [selectedGenres,setSelectedGenres]=useState([]);
  const [genres,setGenres]=useState([]);
  const genreforURL=useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
  
    setContent(data.results);
    setNumofPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0,0);
    fetchMovies();
    // eslint-disable-next-line
  },[page,genreforURL]);

  return (
    <div>
      <span className='pageTitle'>Movies</span>
      <Genres 
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
       />
      <div className='trending'>
        {
          content && content.map((c) => (
            < SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.release_date || c.first_air_date}
                media_type="movie"
                vote_average={c.vote_average}
            />

          ))
        }
      </div>
      {numofPages > 1 && (
          <CustomePagination setPage= {setPage} numofPages={ numofPages }/>
      )}
    </div>
  )
}

export default Movies;
