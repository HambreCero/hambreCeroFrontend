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
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Ingredients</h2>
        <Link to="/ingredients/new">+ New ingredient</Link>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((i) => (
          <IngredientCard key={i.id} ingredient={i} />
        ))}
      </div>
    </section>
  );
}
