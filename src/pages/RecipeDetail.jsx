import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteRecipe, getRecipeById } from '../services/recipeService';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    // Cargar receta
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError('');
                const data = await getRecipeById(id);
                setItem(data);
            } catch {
                setError('Recipe not found');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    // Manejador delete
    const handleDelete = async () => {
        const ok = window.confirm('¿Seguro que quieres eliminar esta receta?');
        if (!ok) return;

        try {
            setDeleting(true);
            await deleteRecipe(id);
            navigate('/recipes');
        } catch {
            setError('Could not delete recipe');
            setDeleting(false);
        }
    };

    // Loading, error, not found
    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    if (!item) return <ErrorMessage message="Recipe not found" />;

    return (
        <section>
            <h2>Recipe Detail</h2>

            <div style={{ marginBottom: '1rem' }}>
                <Link to="/recipes">← Back to list</Link>
            </div>

            <div
                style={{
             border: '1px solid #ddd',
             borderRadius: '8px',
             padding: '1rem',
             maxWidth: '520px',
        }}
      >
        <p><strong>ID:</strong> {item.id}</p>
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Difficulty:</strong> {item.difficulty}</p>
        <p><strong>Vegetarian:</strong> {item.vegetarian ? 'Yes' : 'No'}</p>
        <p><strong>Servings</strong> {item.servings}</p>
        <p><strong>Last modified:</strong> {item.lastModified}</p>
        <p><strong>Estimated Cost:</strong> €{item.estimatedCost} €</p>

      </div>

        {/* Lista de ingredientes */}

       <div>
            <strong>Ingredient IDs:</strong>
            <ul>
                {item.ingredientIds && item.ingredientIds.length > 0 ? (
                    item.ingredientIds.map(ingId => <li key={ingId}>Ingredient #{ingId}</li>)
                ) : (
                    <li>No ingredients linked</li>
                )}
            </ul>
        </div>

<div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
        {/* Botón Editar: Navega a la ruta de edición */}
        <Link to={`/recipes/${item.id}/edit`}>
          <button type="button">Edit</button>
        </Link>

        {/* Botón Borrar: Ejecuta la función handleDelete */}
        <button type="button" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </section>
  );
}
