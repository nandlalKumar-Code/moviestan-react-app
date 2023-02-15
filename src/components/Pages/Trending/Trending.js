import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Trending.css';
import SingleContent from '../../SingleContent/SingleContent';
import CustomePagination from '../../Pagination/CustomePagination';

const Trending = () => {

  const [page,setPage]= useState(1);
  const [content,setContent]= useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    
    setContent(data.results);
  
  };

  useEffect(() =>{
    window.scroll(0,0);
    fetchTrending();
    // eslint-disable-next-line
  },[page]);


  return (
    <div>
      <span className='pageTitle'>Trending Week</span>
      <div className='trending'>
        {
          content && content.map((c) => (
            < SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.release_date || c.first_air_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
            />

          ))
        }
      </div>
      <CustomePagination setPage= {setPage} />
    </div>
  )
}

export default Trending;
