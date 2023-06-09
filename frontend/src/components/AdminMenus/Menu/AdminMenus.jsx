import { useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdminStyles from './AdminMenus.module.css';
import { Link } from 'react-router-dom';

function AdminMenus() {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(undefined);
  const [selectedMenu, setSelectedMenu] = useState('');

  const handleChange = (e) => {
    setSelectedMenu(e.target.value);
  };

  const menusURL = 'http://localhost:3000/menus';

  useEffect(() => {
    try {
      axios.get(menusURL).then((res) => setMenus(res.data));
    } catch {
      setError(error.data.response.error);
    }
  });

  const menusJSX = menus.map((menu) => {
    return (
      <MenuItem key={menu.menuName} value={menu._id}>
        {menu.menuName}
      </MenuItem>
    );
  });

  return (
    <div className={AdminStyles.container}>
      <div>Manage Menus</div>
      <div className={AdminStyles.select}>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id='demo-simple-select-autowidth-label'>Name</InputLabel>
          <Select
            labelId='demo-simple-select-autowidth-label'
            id='demo-simple-select-autowidth'
            onChange={handleChange}
            autoWidth
            label='Name'
            value={selectedMenu}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {menusJSX}
          </Select>
        </FormControl>
      </div>
      <div className={AdminStyles.links}>
        <Link to='add'>Add</Link>
        <Link to={`edit/${selectedMenu}`}>Edit</Link>
        <Link to={`delete/${selectedMenu}`}>Delete</Link>
      </div>
    </div>
  );
}

export default AdminMenus;
