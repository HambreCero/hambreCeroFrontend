import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/recipes/RecipeForm";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { getRecipeById, updateRecipe } from "../services/recipeService";

export default function RecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getRecipeById(id);
        setItem(data);
      } catch {
        setError("Recipe not found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (payload) => {
    setSubmitting(true);
    try {
      await updateRecipe(id, payload);
      navigate(`/recipes/${id}`);
    } catch {
      setError("Could not update recipe");
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-secondary">Edit Recipe</h2>
        <Link to={`/recipes/${id}`} className="text-sm text-secondary/80 hover:text-secondary transition">
          ← Back to detail
        </Link>
      </header>

      <div className="max-w-2xl bg-surface border border-border rounded-xl p-6 shadow-soft">
        <RecipeForm initialValues={item} onSubmit={handleUpdate} submitting={submitting} />
      </div>
    </section>
  );
}
