import { NavLink } from 'react-router-dom';

export default function Navbar() {
    // Se define el estilo base y se repite código (Ley de Similitud)
    const linkClasses = ({ isActive }) => 
        `px-4 py-2 rounded-md transition-all duration-300 ${
            isActive 
            ? 'bg-green-100 text-green-700 font-bold underline' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
        }`;

    return (
        <nav className="flex items-center justify-center gap-6 p-4 bg-white shadow-md">
            <NavLink to="/" className={linkClasses}>
                Home
            </NavLink>            

            <NavLink to="/ingredients" className={linkClasses}>
                Ingredients
            </NavLink>

            <NavLink to="/recipes" className={linkClasses}>
                Recipes
            </NavLink>
        </nav>
    );
}