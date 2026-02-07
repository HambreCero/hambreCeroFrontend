import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <article className="bg-surface border border-border rounded-xl p-6 shadow-soft">
      <header className="space-y-2">
        <h3 className="text-2xl font-serif font-bold text-primary leading-tight">
          {recipe.name}
        </h3>

        <p className="text-sm text-secondary/80">
          Difficulty: <span className="font-semibold text-secondary">{recipe.difficulty}</span> ·{" "}
          Servings: <span className="font-semibold text-secondary">{recipe.servings}</span>
        </p>

        <p className="text-sm text-secondary/80">
          Estimated Cost: <span className="font-semibold text-secondary">€{recipe.estimatedCost}</span> ·{" "}
          Vegetarian: <span className="font-semibold text-secondary">{recipe.isVegetarian ? "Yes" : "No"}</span>
        </p>
      </header>

      <div className="mt-5 flex justify-end">
        <Link
          to={`/recipes/${recipe.id}`}
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
