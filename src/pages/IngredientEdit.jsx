import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import IngredientForm from "../components/ingredient/IngredientForm";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { getIngredientById, updateIngredient } from "../services/ingredientService";

export default function IngredientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getIngredientById(id);
        setItem(data);
      } catch {
        setError("Ingredient not found");
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
    } catch {
      setError("Could not update ingredient");
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-secondary">Edit Ingredient</h2>
        <Link to={`/ingredients/${id}`} className="text-sm text-secondary/80 hover:text-secondary transition">
          ← Back to detail
        </Link>
      </header>

      <div className="max-w-2xl bg-surface border border-border rounded-xl p-6 shadow-soft">
        <IngredientForm initialValues={item} onSubmit={handleUpdate} submitting={submitting} />
      </div>
    </section>
  );
}
