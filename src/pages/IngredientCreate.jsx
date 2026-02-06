import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientForm from '../components/ingredient/IngredientForm';
import { createIngredient } from '../services/ingredientService';

export default function IngredientCreate() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true);
      setError('');
      const created = await createIngredient(payload);
      navigate(`/ingredients/${created.id}`);
    } catch {
      setError('Could not create ingredient');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h2>New Ingredient</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <IngredientForm onSubmit={handleSubmit} submitting={submitting} />
    </section>
  );
}
