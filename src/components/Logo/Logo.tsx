import { Link } from 'react-router-dom';
import logoGreen from '../../assets/icons/logo.svg';
import css from './Logo.module.css';

const Logo = () => {


  return (
    <Link className="w-8 h-8  md:w-10 md:h-10" to='/'>
      <img src={logoGreen} alt='E-Pharmacy Logo'  />
      
    </Link>
  );
};

export default Logo;