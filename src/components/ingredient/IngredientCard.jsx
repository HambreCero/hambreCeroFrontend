import { Link } from 'react-router-dom';

export default function IngredientCard({ ingredient }) {
  return (
    <article style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <h3>{ingredient.name}</h3>
      <p>Season: {ingredient.season}</p>
      <p>Calories: {ingredient.calories}</p>
      <p>Organic: {ingredient.organic ? 'Yes' : 'No'}</p>
      <Link to={`/ingredients/${ingredient.id}`}>View detail</Link>
    </article>
  );
}
