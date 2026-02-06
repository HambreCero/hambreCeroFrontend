import { useState } from 'react';

const SEASONS = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];

export default function IngredientForm({ initialValues, onSubmit, submitting }) {
  const [form, setForm] = useState({
    name: initialValues?.name ?? '',
    calories: initialValues?.calories ?? 0,
    season: initialValues?.season ?? 'SPRING',
    isOrganic: initialValues?.organic ?? initialValues?.isOrganic ?? false,
    harvestDate: initialValues?.harvestDate ?? '',
    priceKg: initialValues?.priceKg ?? 0,
    carbonFootprint: initialValues?.carbonFootprint ?? 0,
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

    if (!form.name.trim()) return setError('Name is required');
    if (!form.season) return setError('Season is required');

    try {
      await onSubmit({
        ...form,
        calories: Number(form.calories),
        priceKg: Number(form.priceKg),
        carbonFootprint: Number(form.carbonFootprint),
      });
    } catch {
      setError('Could not save ingredient');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ingredient</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <label>Name</label><br />
      <input name="name" value={form.name} onChange={handleChange} /><br /><br />

      <label>Calories</label><br />
      <input type="number" name="calories" value={form.calories} onChange={handleChange} /><br /><br />

      <label>Season</label><br />
      <select name="season" value={form.season} onChange={handleChange}>
        {SEASONS.map((s) => <option key={s} value={s}>{s}</option>)}
      </select><br /><br />

      <label>
        <input type="checkbox" name="isOrganic" checked={form.isOrganic} onChange={handleChange} />
        Organic
      </label><br /><br />

      <label>Harvest date</label><br />
      <input type="date" name="harvestDate" value={form.harvestDate} onChange={handleChange} /><br /><br />

      <label>Price per kg</label><br />
      <input type="number" step="0.01" name="priceKg" value={form.priceKg} onChange={handleChange} /><br /><br />

      <label>Carbon footprint</label><br />
      <input type="number" step="0.01" name="carbonFootprint" value={form.carbonFootprint} onChange={handleChange} /><br /><br />

      <button disabled={submitting} type="submit">
        {submitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
