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

    const inputBase =
    "w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground " +
    "focus:outline-none focus:ring-2 focus:ring-ring";

  const labelBase = "text-sm font-bold text-secondary";

   return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-border bg-muted p-3 text-sm font-semibold text-secondary">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelBase}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} className={inputBase} />
        </div>

        <div>
          <label className={labelBase}>Difficulty (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className={labelBase}>Servings</label>
          <input
            type="number"
            min="1"
            name="servings"
            value={form.servings}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-2 flex items-center gap-3">
          <input
            id="vegetarian"
            type="checkbox"
            name="vegetarian"
            checked={form.vegetarian}
            onChange={handleChange}
            className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
          />
          <label htmlFor="vegetarian" className="text-sm font-bold text-secondary">
            Vegetarian
          </label>
        </div>

        <div>
          <label className={labelBase}>Estimated Cost (€)</label>
          <input
            type="number"
            step="0.01"
            name="estimatedCost"
            value={form.estimatedCost}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className={labelBase}>Last Modified (Date)</label>
          <input
            type="date"
            name="lastModified"
            value={form.lastModified}
            max={today}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelBase}>Ingredient IDs (comma separated, e.g: 1, 2)</label>
          <input
            type="text"
            name="ingredientIds"
            value={form.ingredientIds}
            placeholder="1, 2, 5"
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelBase}>Image</label>
          <input
            type="file"
            name="image"
            disabled
            className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm text-secondary/70"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          disabled={submitting}
          type="submit"
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-bold
                     bg-primary text-primary-foreground shadow-soft hover:opacity-95 transition
                     disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save Recipe"}
        </button>
      </div>
    </form>
  );
}