import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SingleContent from '../../SingleContent/SingleContent';
import CustomePagination from '../../Pagination/CustomePagination';
import axios from 'axios';

const mytheme= createTheme({
  palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
  },
});

const Search = () => {
  const [type,setType]=useState(0);
  const [page,setPage]=useState(1);
  const [searchText,setSearchText]=useState("");
  const [content,setContent]=useState();
  const [numofPages,setNumofPages]=useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adults=false`);
  
    setContent(data.results);
    setNumofPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0,0);
    fetchSearch();
    // eslint-disable-next-line
  },[type,page]);

  return (
    <div>
      <span className='pageTitle'>Search</span>
        <ThemeProvider theme={mytheme}>
          <div style={{display: "flex" , margin: "12px 10"}}>
            <TextField 
                style={{ flex: 1 }}
                className="SearchBox"
                label="Search"
                variant="filled"
                onChange={(e)=>setSearchText(e.target.value)}
            />
            <Button variant='contained' style={{ marginLeft: 10}} onClick={fetchSearch}>
                <SearchIcon/>
            </Button>
          </div>

          <Tabs
              value={type}
              indicatorColor="primary"
              textColor="primary"
              onChange={(event,newValue)=>{
                setType(newValue);
                setPage(1);
              }}
              style={{paddingBottom: 5}}
          >
              <Tab style={{width: "50%"}} label="MOVIES" />
              <Tab style={{width: "50%"}} label="TV SERIES"/>
          </Tabs>
        </ThemeProvider>
        <div className='trending'>
        {
          content && content.map((c) => (
            < SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.release_date || c.first_air_date}
                media_type={type? "tv":"movie"}
                vote_average={c.vote_average}
            />

          ))
        }

        {searchText && 
            (!content) &&
            (type? <h2>NO SERIES Found</h2>:<h2>NO MOVIES FOUND</h2>)
        }

      </div>
      {numofPages > 1 && (
          <CustomePagination setPage= {setPage} numofPages={ numofPages }/>
      )}
    </div>
  )
}

export default Search
