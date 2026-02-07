import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, getRecipeById } from "../services/recipeService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
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

  const handleDelete = async () => {
    const ok = window.confirm("¿Seguro que quieres eliminar esta receta?");
    if (!ok) return;

    try {
      setDeleting(true);
      await deleteRecipe(id);
      navigate("/recipes");
    } catch {
      setError("Could not delete recipe");
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!item) return <ErrorMessage message="Recipe not found" />;

 
  const vegetarian = item.vegetarian ?? item.isVegetarian;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-secondary">Recipe Detail</h2>
        <Link to="/recipes" className="text-sm text-secondary/80 hover:text-secondary transition">
          ← Back to list
        </Link>
      </header>

      <div className="max-w-2xl bg-surface border border-border rounded-xl p-6 shadow-soft">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <dt className="font-bold text-secondary">Name</dt>
            <dd className="text-secondary/80">{item.name}</dd>
          </div>

          <div>
            <dt className="font-bold text-secondary">Difficulty</dt>
            <dd className="text-secondary/80">{item.difficulty}</dd>
          </div>

          <div>
            <dt className="font-bold text-secondary">Servings</dt>
            <dd className="text-secondary/80">{item.servings}</dd>
          </div>

          <div>
            <dt className="font-bold text-secondary">Vegetarian</dt>
            <dd className="text-secondary/80">{vegetarian ? "Yes" : "No"}</dd>
          </div>

          <div>
            <dt className="font-bold text-secondary">Estimated Cost</dt>
            <dd className="text-secondary/80">€{item.estimatedCost}</dd>
          </div>

          <div>
            <dt className="font-bold text-secondary">Last modified</dt>
            <dd className="text-secondary/80">{item.lastModified}</dd>
          </div>
        </dl>
      </div>

      <div className="max-w-2xl bg-surface border border-border rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-serif font-bold text-primary mb-3">Ingredients</h3>

        <ul className="list-disc pl-5 space-y-1 text-sm text-secondary/80">
          {item.ingredientIds && item.ingredientIds.length > 0 ? (
            item.ingredientIds.map((ingId) => (
              <li key={ingId}>Ingredient #{ingId}</li>
            ))
          ) : (
            <li>No ingredients linked</li>
          )}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to={`/recipes/${item.id}/edit`}
          className="inline-flex items-center justify-center rounded-xl px-5 py-3
                     bg-primary text-primary-foreground font-bold shadow-soft
                     hover:opacity-95 transition"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center justify-center rounded-xl px-5 py-3
                     border border-border bg-surface text-secondary font-bold shadow-soft
                     hover:bg-muted transition disabled:opacity-60"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </section>
  );
}
