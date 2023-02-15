import React from 'react';
import { createTheme, Pagination, ThemeProvider } from '@mui/material';
import './CustomePagination.css';


const mytheme= createTheme({
    palette: {
        type: "dark",
    },
});

const CustomePagination = ({setPage,numofPages=10}) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    }

  return (
    <div className='pages'>
        <ThemeProvider theme={mytheme}>
            <Pagination 
                count={numofPages} 
                variant="outlined" shape="rounded"
                onChange={ (e) => handlePageChange(e.target.textContent) } 
                hideNextButton
                hidePrevButton
                color='primary'
            />
        </ThemeProvider>
      
    </div>
  );
};

export default CustomePagination;
