import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteIngredient, getIngredientById } from "../services/ingredientService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

export default function IngredientDetail() {
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

  const handleDelete = async () => {
    const ok = window.confirm("¿Seguro que quieres eliminar este ingrediente?");
    if (!ok) return;

    try {
      setDeleting(true);
      await deleteIngredient(id);
      navigate("/ingredients");
    } catch {
      setError("Could not delete ingredient");
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!item) return <ErrorMessage message="Ingredient not found" />;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-secondary">Ingredient Detail</h2>
        <Link to="/ingredients" className="text-sm text-secondary/80 hover:text-secondary transition">
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
            <dt className="font-bold text-secondary">Calories</dt>
            <dd className="text-secondary/80">{item.calories}</dd>
          </div>

          <div>
            <dt className="font-bold text-secondary">Season</dt>
            <dd className="text-secondary/80">{item.season}</dd>
          </div>

          <div>
            <dt className="font-bold text-secondary">Organic</dt>
            <dd className="text-secondary/80">{item.organic ? "Yes" : "No"}</dd>
          </div>

          <div>
            <dt className="font-bold text-secondary">Harvest date</dt>
            <dd className="text-secondary/80">{item.harvestDate}</dd>
          </div>

          <div>
            <dt className="font-bold text-secondary">Price/kg</dt>
            <dd className="text-secondary/80">{item.priceKg}</dd>
          </div>

          <div>
            <dt className="font-bold text-secondary">Carbon footprint</dt>
            <dd className="text-secondary/80">{item.carbonFootprint}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to={`/ingredients/${item.id}/edit`}
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
