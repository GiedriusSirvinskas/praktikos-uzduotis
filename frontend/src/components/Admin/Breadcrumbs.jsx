import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function IconBreadcrumbs() {
  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb' sx={{fontSize: '2rem'}}>
        <Link to='menus'>
          <MenuBookIcon fontSize='2rem'/>
          Menus
        </Link>
        <Link to='foods'>
          <RamenDiningIcon fontSize='2rem'/>
          Foods
        </Link>
        <Link to='orders'>
          <BookmarkBorderIcon fontSize='2rem'/>
          Orders
        </Link>
      </Breadcrumbs>
    </div>
  );
}
