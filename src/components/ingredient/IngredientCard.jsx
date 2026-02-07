import { Link } from "react-router-dom";

export default function IngredientCard({ ingredient }) {
  return (
    <article className="bg-surface border border-border rounded-xl p-6 shadow-soft">
      <header className="space-y-2">
        <h3 className="text-2xl font-serif font-bold text-primary leading-tight">
          {ingredient.name}
        </h3>

        <p className="text-sm text-secondary/80">
          Temporada:{" "}
          <span className="font-semibold text-secondary">{ingredient.season}</span> ·{" "}
          Calorías:{" "}
          <span className="font-semibold text-secondary">{ingredient.calories}</span>
        </p>

        <p className="text-sm text-secondary/80">
          Orgánico:{" "}
          <span className="font-semibold text-secondary">
            {ingredient.organic ? "Sí" : "No"}
          </span>
        </p>
      </header>

      <div className="mt-5 flex justify-end">
        <Link
          to={`/ingredients/${ingredient.id}`}
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-bold
                     border border-border bg-surface text-secondary
                     shadow-soft hover:bg-muted transition"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
