'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav>
      <ul>
        {!token ? (
          <>
            <li><Link href="/login">Iniciar Sesión</Link></li>
            <li><Link href="/register">Registrar</Link></li>
          </>
        ) : (
          <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
        )}
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;