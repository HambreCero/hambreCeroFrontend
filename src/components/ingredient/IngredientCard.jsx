import { Link } from 'react-router-dom';

export default function IngredientCard({ ingredient }) {
  return (
    
    <article className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-2">
      
      {/* Jerarquía visual: El nombre destaca más que los detalles */}
      <h3 className="text-xl font-bold text-gray-800 capitalize">
        {ingredient.name}
      </h3>
      
      {/* Ley de Proximidad: Agrupamos los datos técnicos */}
      <div className="text-sm text-gray-600 space-y-1">
        <p><span className="font-semibold text-green-700">Season:</span> {ingredient.season}</p>
        <p><span className="font-semibold text-green-700">Calories:</span> {ingredient.calories} kcal</p>
        <p>
          <span className="font-semibold text-green-700">Organic:</span> 
          {ingredient.organic ? ' ✅' : ' ❌'}
        </p>
      </div>

      <Link 
        to={`/ingredients/${ingredient.id}`}
        className="mt-4 inline-block text-center bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
      >
        View detail
      </Link>
    </article>
  );
}