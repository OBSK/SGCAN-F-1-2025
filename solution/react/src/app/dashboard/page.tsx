import ProtectedRoute from '../../components/ProtectedRoute';

const Dashboard: React.FC = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Bienvenido al Dashboard</h1>
        <p>Contenido protegido solo accesible para usuarios autenticados</p>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;