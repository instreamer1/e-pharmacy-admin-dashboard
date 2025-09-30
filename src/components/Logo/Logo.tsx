import { Link } from 'react-router-dom';
import logoGreen from '../../assets/icons/logo.svg';
import css from './Logo.module.css';

const Logo = () => {


  return (
    <Link className={css.mainLogo} to='/'>
      <img src={logoGreen} alt='E-Pharmacy Logo' className={css.logo} />
      
    </Link>
  );
};

export default Logo;