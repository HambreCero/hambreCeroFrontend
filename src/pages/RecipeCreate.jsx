import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/recipes/RecipeForm';
import { createRecipe } from '../services/recipeService';

export default function RecipeCreate() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true);
      setError('');
      // Aquí se llama al servicio para crear la receta, pasando el payload con los datos del formulario
      const created = await createRecipe(payload);
      // Esto nos lleva al detalle de la nueva receta
      navigate(`/recipes/${created.id}`);
    } catch {
      setError('Could not create recipe');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h2>New Recipe</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <RecipeForm onSubmit={handleSubmit} submitting={submitting} />
    </section>
  );
}