import { useState } from 'react';

export default function RecipeForm({ initialValues, onSubmit, submitting }) {

    // Obtenemos la fecha de hoy para usarla como valor por defeto
  const getTodayString = () => new Date().toISOString().split('T')[0];
  const today = getTodayString();

  const [form, setForm] = useState({
    name: initialValues?.name ?? '',
    difficulty: initialValues?.difficulty ?? 1,
    vegetarian: initialValues?.vegetarian ?? false,
    estimatedCost: initialValues?.estimatedCost ?? 0,
    lastModified: initialValues?.lastModified ?? today,
    servings: initialValues?.servings ?? 1,
    ingredientIds: initialValues?.ingredientIds?.join(',') ?? '', // Convertimos el array de IDs a un string separado por comas para el input
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación de campos
    if (!form.name.trim()) return setError('Name is required');
    if (form.difficulty < 1 || form.difficulty > 5) return setError('Difficulty must be between 1 and 5');
    // Validación para que la fecha no sea futura
    if (form.lastModified > today) {
        return setError('Date cannot be in the future');
    }
    try {
      // Convertir los campos numéricos y el array de ingredientIds antes de enviar el formulario
      await onSubmit({
        ...form,
        difficulty: Number(form.difficulty),
        estimatedCost: Number(form.estimatedCost),
        servings: Number(form.servings),
        // Convertir el string de ingredientIds a un array de números, filtrando valores no válidos
        ingredientIds: form.ingredientIds
            ? form.ingredientIds.toString().split(',').map(id => Number(id.trim())).filter(id => !isNaN(id) && id > 0)
            : []
      });
    } catch {
      setError('Could not save recipe');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <label>Name</label><br />
      <input name="name" value={form.name} onChange={handleChange} /><br /><br />

      <label>Difficulty (1-5)</label><br />
      <input type="number" min="1" max="5" name="difficulty" value={form.difficulty} onChange={handleChange} /><br /><br />

      <label> Vegetarian </label>
      <input type="checkbox" name="vegetarian" checked={form.vegetarian} onChange={handleChange} /> <br /><br />

      <label>Estimated Cost (€)</label><br />
      <input type="number" step="0.01" name="estimatedCost" value={form.estimatedCost} onChange={handleChange} /><br /><br />

      <label>Last Modified (Date)</label><br />
      <input 
        type="date" 
        name="lastModified" 
        value={form.lastModified} 
        max={today} 
        onChange={handleChange} 
      /><br /><br />

      <label>Servings</label><br />
      <input type="number" min="1" name="servings" value={form.servings} onChange={handleChange} /><br /><br />

      <label>Ingredient IDs (comma separated, e.g: 1, 2)</label><br />
      <input type="text" name="ingredientIds" value={form.ingredientIds} placeholder="1, 2, 5" onChange={handleChange} /><br /><br />

      <button disabled={submitting} type="submit">
        {submitting ? 'Saving...' : 'Save Recipe'}
      </button>
    </form>
  );
}