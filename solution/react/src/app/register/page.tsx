'use client';
import { useState } from 'react';
import axiosInstance from '../libs/axios';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axiosInstance.post('/auth/register', { email, password, username });
            router.push('/login');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError('Error al registrar el usuario: ' + err.message);
            } else {
                setError('Credenciales incorrectas');
            }
        }
    };

    return (
        <div>
            <h1>Registrar</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nombre de usuario"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                {error && <p>{error}</p>}
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
