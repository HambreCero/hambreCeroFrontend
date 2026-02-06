import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteIngredient, getIngredientById } from '../services/ingredientService';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function IngredientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getIngredientById(id);
        setItem(data);
      } catch {
        setError('Ingredient not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    const ok = window.confirm('¿Seguro que quieres eliminar este ingrediente?');
    if (!ok) return;

    try {
      setDeleting(true);
      await deleteIngredient(id);
      navigate('/ingredients');
    } catch {
      setError('Could not delete ingredient');
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!item) return <ErrorMessage message="Ingredient not found" />;

  // Definimos la clase común basada en el estilo de "Back to list"
  const actionButtonStyle = "inline-block border border-gray-300 rounded-md px-4 py-2 text-gray-600 hover:border-green-500 hover:text-green-600 transition-all duration-200 text-sm font-medium";

  return (
    <section className="max-w-xl mx-auto p-4">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link to="/ingredients" className={actionButtonStyle}>
          ← Back to list
        </Link>
      </div>

      {/* Tarjeta de detalles */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">{item.name}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <p><strong className="text-gray-900">Calories:</strong> {item.calories} kcal</p>
          <p><strong className="text-gray-900">Season:</strong> {item.season}</p>
          <p><strong className="text-gray-900">Organic:</strong> {item.organic ? '✅ Sí' : '❌ No'}</p>
          <p><strong className="text-gray-900">Price/kg:</strong> {item.priceKg}€</p>
          <p><strong className="text-gray-900">Harvest date:</strong> {item.harvestDate}</p>
          <p><strong className="text-gray-900">Carbon footprint:</strong> {item.carbonFootprint} CO2</p>
        </div>
      </div>

      {/* Botones de acción unificados */}
      <div className="mt-8 flex gap-4">
        <Link to={`/ingredients/${item.id}/edit`}>
          <button type="button" className={actionButtonStyle}>
            Edit Ingredient
          </button>
        </Link>

        <button 
          type="button" 
          onClick={handleDelete} 
          disabled={deleting}
          className={`${actionButtonStyle} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </section>
  );
}