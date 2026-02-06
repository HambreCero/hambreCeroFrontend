import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
    return (
        <article style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <h3>{recipe.name}</h3>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Servings: {recipe.servings}</p>
            <p>Estimated Cost: {recipe.estimatedCost} €</p>
            <p>Vegetarian: {recipe.isVegetarian ? "Yes" : "No"}</p>

            <Link to={`/recipes/${recipe.id}`}>View detail</Link>
        </article>
    );
}