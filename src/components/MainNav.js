import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { useNavigate } from 'react-router-dom';


export default function SimpleBottomNavigation() {

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();


  React.useEffect(() => {
    if(value === 0)
        navigate("/");
    else if(value === 1)
        navigate("/Searches");
    else if(value === 2)
        navigate("/Movies");
    else if(value === 3)
        navigate("/Series");
        

  }, [value,navigate]);

  return (
  <BottomNavigation
        sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            backgroundColor: '#293462',
            zIndex: 100
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
    >
            <BottomNavigationAction 
                style= {{color: "white" }}
                label="Trending" 
                icon={<WhatshotIcon />} 
            />

            <BottomNavigationAction 
                style= {{color: "white"}}
                label="SEARCH" 
                icon={<SearchIcon />} 
            />

            <BottomNavigationAction 
                style= {{color: "white"}}
                label="MOVIES" 
                icon={<MovieIcon />} 
            />

            <BottomNavigationAction 
                style= {{color: "white"}}
                label="TV SERIES" 
                icon={<TvIcon />} 
            />

    </BottomNavigation>
  );
}
