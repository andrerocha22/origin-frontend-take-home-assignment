import * as React from 'react';
import './styles.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <a href="/">
        <img
          className="logoIMG"
          src={require('~/assets/image/logo.svg')}
          alt="Logo-Origin"
        />
      </a>
    </header>
  );
};

export default Header;
