import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import '../styles/404Page.css';

export function Page404() {
  return (
    <div className="page404Wrapper">
      <img
        className="Page404Img"
        src="../src/assets/image/404-image.jpeg"
        alt="404-image"
      />
      <p className="Page404Text">
        The page you are looking for might be removed or is temporarily
        unavailable
      </p>
      <Link to="/">
        <Button variant="contained">Back To MainPage</Button>
      </Link>
    </div>
  );
}
