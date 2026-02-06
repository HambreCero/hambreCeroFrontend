import { useEffect, useState } from 'react';
import { getIngredients } from '../services/ingredientService';
import IngredientCard from '../components/ingredient/IngredientCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { Link } from 'react-router-dom';

export default function IngredientList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getIngredients();
        setItems(data);
      } catch {
        setError('Could not load ingredients');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="space-y-8">
      {/* Cabecera: Ley de Continuidad y Proximidad */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Ingredients
        </h2>
        <Link 
          to="/ingredients/new" 
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
        >
          + New ingredient
        </Link>
      </div>

      {/* Grid: Ley de Semejanza y Cierre */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <IngredientCard key={i.id} ingredient={i} />
        ))}
      </div>
      
      {/* Estado vacío: Ley de la Figura y Fondo */}
      {items.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">No ingredients found. Start by adding one!</p>
        </div>
      )}
    </section>
  );
}