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
          <li className="contact__item"><PhoneIcon /><span>number</span></li>
          <li className="contact__item"><BusinessIcon /><span>address</span></li>
          <li className="contact__item"><EmailIcon /><span>email</span></li>
        </ul>
        <ul className="social__list">
          <li className="social__item"><a href="#"><FacebookIcon /><span>facebook</span></a></li>
          <li className="social__item"><a href="#"><InstagramIcon /><span>instagram</span></a></li>
          <li className="social__item"><a href="#"><YouTubeIcon /><span>youtube</span></a></li>
        </ul>
      </div>
      <div className="copyright">
        <p>RSSchool</p>
        <p>2024</p>
      </div>
    </footer>
  );
};

export default Footer;