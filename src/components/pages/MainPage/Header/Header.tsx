import './Header.scss';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  return (
    <header className="header container">
      <a className='link' href="/" >
        <img src="../../../../../public/shop.svg" alt="logo" />
        <h1 className="header__title">
          simple clothes
        </h1>
      </a>
      <ul className="icons">
        <li className='icons__item'>
          <a className='icons__link' href="/login">
            <PersonIcon fontSize="large" />
            <span className="icon-text">login</span>
          </a>
        </li>
        <li className='icons__item'>
          <a className='icons__link' href="/shop">
            <ShoppingCartIcon fontSize="large" />
            <span className="icon-text">shop</span>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;