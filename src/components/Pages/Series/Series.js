import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Genres from '../../Genres';
import useGenres from '../../hooks/useGenre';
import CustomePagination from '../../Pagination/CustomePagination';
import SingleContent from '../../SingleContent/SingleContent';

const Series = () => {
  const [page,setPage]= useState(1);
  const [content,setContent] = useState([]);
  const [numofPages,setNumofPages]= useState();
  const [selectedGenres,setSelectedGenres]=useState([]);
  const [genres,setGenres]=useState([]);
  const genreforURL=useGenres(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
  
    setContent(data.results);
    setNumofPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0,0);
    fetchSeries();
    // eslint-disable-next-line
  },[page,genreforURL]);


  return (
    <div>
      <span className='pageTitle'>TV Series</span>
      <Genres
          type="tv"
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
                media_type='tv'
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

export default Series
