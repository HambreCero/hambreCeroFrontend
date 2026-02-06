import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../services/recipeService';
import RecipeCard from '../components/recipes/RecipeCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function RecipeList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
        try {
            const data = await getRecipes();
            setItems(data);
        } catch {
            setError('Could not load recipes');
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
                <h2>Recipes</h2>
                <Link to="/recipes/new">+ New recipe</Link>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
                {items.map((i) => (
                    <RecipeCard key={i.id} recipe={i} />
                ))}
            </div>
        </section>
    );
}