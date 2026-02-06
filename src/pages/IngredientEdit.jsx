import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IngredientForm from '../components/ingredient/IngredientForm';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { getIngredientById, updateIngredient } from '../services/ingredientService';

export default function IngredientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
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

  const handleUpdate = async (payload) => {
    setSubmitting(true);
    try {
      await updateIngredient(id, payload);
      navigate(`/ingredients/${id}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return <IngredientForm initialValues={item} onSubmit={handleUpdate} submitting={submitting} />;
}
