import { Link } from 'react-router-dom';

export default function IngredientCard({ ingredient }) {
  return (
    <div className="bg-white border-2 border-earth/20 p-6 rounded-xl shadow-[4px_4px_0px_rgba(139,94,52,0.1)] hover:shadow-md transition-all">
  <h3 className="text-forest text-2xl font-serif font-bold italic border-b border-moss pb-2">
    {ingredient.name}
  </h3>

<ul className="mt-4 space-y-1 text-earth/70 font-medium">
        <li>
          <span className="font-bold text-earth">Temporada:</span> {ingredient.season}
        </li>
        <li>
          <span className="font-bold text-earth">Calorías:</span> {ingredient.calories}
        </li>
        <li>
          <span className="font-bold text-earth">Orgánico:</span> {ingredient.organic ? 'Sí' : 'No'}
        </li>
      </ul>

      {/* Enlace de acción: Estilizado con subrayado suave */}
      <Link 
        to={`/ingredients/${ingredient.id}`} 
        className="mt-6 inline-block text-earth font-bold text-sm underline decoration-earth/30 hover:text-forest transition-colors"
      >
        Ver detalle
      </Link>
    </div>
  );
}
