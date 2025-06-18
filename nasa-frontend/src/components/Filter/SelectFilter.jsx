import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SelectFilter = ({onFilterChange}) => {

  const [filter, setFilter] = useState('W');

useEffect (() => {
onFilterChange(filter);
  },[filter,onFilterChange]);
  
  const handleChange = (event) => {
    setFilter(event.target.value);
  };


  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120}}>
        <Select
         sx={{ backgroundColor:'rgb(0 0 0 / 29%)' , color:'white', '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },'& .MuiSvgIcon-root': {
            color: 'white',
          },}}        
          labelId="simple-select-helper-label"
          id="simple-select-helper"
          value={filter}
        inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChange}
        >
         <MenuItem value="W">All</MenuItem>
        <MenuItem value="WL6">Wind less than 6 m/s</MenuItem>
        <MenuItem value="WG6">Wind greater than 6 m/s</MenuItem>
        </Select>
      <FormHelperText sx={{ color: 'white' }}>
  Choose wind Filter options
</FormHelperText>

      </FormControl>
    </div>
  );
}

export default SelectFilter;