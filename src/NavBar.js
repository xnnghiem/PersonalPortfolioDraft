import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <ul>
      <li><Link to = '/'>Home</Link></li>
      <li><Link to = '/about'>About</Link></li>
      <li><Link to = '/resume'>Resume</Link></li>
      <li>
        <div class="dropdown">
          <Link to = '/code' class="dropbtn">Portfolio</Link>
          <div class="dropdown-content">
            <Link to = '/code'>Program Code</Link>
            <Link to = '/code'>Visual Arts</Link>
          </div>
        </div>
      </li>
      <li><Link to = '/shop'>Shop</Link></li>
      <li><Link to = '/contact'>Contact</Link></li>
    </ul>
  );
}

export default NavBar;
