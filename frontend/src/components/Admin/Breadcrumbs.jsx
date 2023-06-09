import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function IconBreadcrumbs() {
  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='menus'>
          <MenuBookIcon />
          Menus
        </Link>
        <Link to='foods'>
          <RamenDiningIcon />
          Foods
        </Link>
        <Link to='orders'>
          <BookmarkBorderIcon />
          Orders
        </Link>
      </Breadcrumbs>
    </div>
  );
}
