import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 

export default function Layout() {
  return (
    // min-h-screen -> asegura que el fondo cubra toda la pantalla
    <div className="min-h-screen bg-gray-50">
      <Navbar /> 
      
      {/* max-w-5xl y mx-auto centran el contenido (Ley de Cierre/Región Común) */}
      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}