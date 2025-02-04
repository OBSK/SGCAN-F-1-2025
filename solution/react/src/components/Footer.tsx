import Link from 'next/link';
import styles from './css/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <Link href="/about">Sobre nosotros</Link>
          <Link href="/contact">Contacto</Link>
          <Link href="/privacy">Política de privacidad</Link>
        </div>
        <div className={styles.socialMedia}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div className={styles.copyRight}>
        <p>&copy; {new Date().getFullYear()} MiAplicación. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
