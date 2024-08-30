// Location: src/components/Header.js

import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="logo" onClick={() => window.location.href = '/'}>
        ContactAI
      </div>
      <nav>
        <ul>
          <li><a href="/signin">Sign In</a></li>
          <li><a href="/signup">Sign Up</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
