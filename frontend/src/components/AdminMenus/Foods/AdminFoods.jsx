import { useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdminStyles from './AdminFoods.module.css';
import { Link } from 'react-router-dom';

function AdminFoods() {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(undefined);
  const [selectedFood, setSelectedFood] = useState('');

  const handleChange = (e) => {
    setSelectedFood(e.target.value);
  };

  const foodsURL = 'http://localhost:3000/foods';

  useEffect(() => {
    try {
      axios.get(foodsURL).then((res) => setFoods(res.data));
    } catch {
      setError(error.data.response.error);
    }
  });

  const foodsJSX = foods.map((food) => {
    return (
      <MenuItem key={food.foodName} value={food._id}>
        {food.foodName}
      </MenuItem>
    );
  });

  return (
    <div className={AdminStyles.container}>
      <div>Manage Foods</div>
      <div className={AdminStyles.select}>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id='demo-simple-select-autowidth-label'>Name</InputLabel>
          <Select
            labelId='demo-simple-select-autowidth-label'
            id='demo-simple-select-autowidth'
            onChange={handleChange}
            autoWidth
            label='Name'
            value={selectedFood}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {foodsJSX}
          </Select>
        </FormControl>
      </div>
      <div className={AdminStyles.links}>
        <Link to='add'>Add</Link>
        <Link to={`edit/${selectedFood}`}>Edit</Link>
        <Link to={`delete/${selectedFood}`}>Delete</Link>
      </div>
    </div>
  );
}

export default AdminFoods;
