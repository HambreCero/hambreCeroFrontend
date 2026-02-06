import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../components/recipes/RecipeForm';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { getRecipeById, updateRecipe } from '../services/recipeService';

export default function RecipeEdit() {
  const { id } = useParams(); // Saca el ID de la URL
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Carga los datos actuales de la receta para rellenar el formulario
  useEffect(() => {
    const load = async () => {
      try {
        // Reutiliza la función de detalle
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

  // Envía la actualización al backend
  const handleUpdate = async (payload) => {
    setSubmitting(true);
    try {
      await updateRecipe(id, payload);
      // Si todo va bien, nos lleva al detalle de la receta actualizada
      navigate(`/recipes/${id}`);
    } catch {
      setError('Could not update recipe');
      setSubmitting(false); 
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h2>Edit Recipe</h2>
      <RecipeForm 
        initialValues={item} 
        onSubmit={handleUpdate} 
        submitting={submitting} 
      />
    </section>
  );
}