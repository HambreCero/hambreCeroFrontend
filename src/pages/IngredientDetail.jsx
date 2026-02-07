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

  return (
    <section>
      <h2>Ingredient Detail</h2>

      <div style={{ marginBottom: '1rem' }}>
        <Link to="/ingredients">← Back to list</Link>
      </div>

      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '1rem',
          maxWidth: '520px',
        }}
      >
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Calories:</strong> {item.calories}</p>
        <p><strong>Season:</strong> {item.season}</p>
        <p><strong>Organic:</strong> {item.organic ? 'Yes' : 'No'}</p>
        <p><strong>Harvest date:</strong> {item.harvestDate}</p>
        <p><strong>Price/kg:</strong> {item.priceKg}</p>
        <p><strong>Carbon footprint:</strong> {item.carbonFootprint}</p>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
        <Link to={`/ingredients/${item.id}/edit`}>
          <button type="button">Edit</button>
        </Link>

        <button type="button" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </section>
  );
}
