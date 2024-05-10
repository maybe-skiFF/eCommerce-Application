import './Footer.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <footer className="footer container">
      <div className="info">
        <ul className="contact__list">
          <li className="contact__item"><a href="+375291234567"><PhoneIcon /><span>our phone number: +375 29 123-45-67</span></a></li>
          <li className="contact__item"><a href="mailto:example@gmail.com"><EmailIcon /><span>our email: example@gmail.com</span></a></li>
          <li className="contact__item"><a href=""><BusinessIcon /><span>our address: Minsk, Station Square, 3</span></a></li>
        </ul>
        <ul className="social__list">
          <li className="social__item"><a target='blank' href="https://www.facebook.com/"><FacebookIcon /><span>facebook</span></a></li>
          <li className="social__item"><a target='blank' href="https://www.instagram.com/"><InstagramIcon /><span>instagram</span></a></li>
          <li className="social__item"><a target='blank' href="https://www.youtube.com/"><YouTubeIcon /><span>youtube</span></a></li>
        </ul>
      </div>
      <div className="copyright">
        <p className='copyright__text'><a target='blank' href="https://rs.school/">RSSchool</a></p>
        <p className='copyright__text'>2024</p>
      </div>
    </footer>
  );
};

export default Footer;