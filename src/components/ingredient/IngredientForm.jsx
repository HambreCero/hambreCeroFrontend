import { useState } from 'react';

const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

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

  // Clase reutilizable para inputs para mantener la Ley de Semejanza
  const inputClasses = "w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all";
  const labelClasses = "block text-sm font-medium text-gray-700";

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        {initialValues ? 'Edit Ingredient' : 'New Ingredient'}
      </h2>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre - Campo principal (Figura/Fondo) */}
        <div>
          <label className={labelClasses}>Name</label>
          <input 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            className={inputClasses}
            placeholder="e.g. Fresh Spinach"
          />
        </div>

        {/* Rejilla para agrupar datos relacionados (Ley de Proximidad) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Season</label>
            <select name="season" value={form.season} onChange={handleChange} className={inputClasses}>
              {SEASONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className={labelClasses}>Calories (kcal)</label>
            <input type="number" name="calories" value={form.calories} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}>Price per kg (€)</label>
            <input type="number" step="0.01" name="priceKg" value={form.priceKg} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}>Carbon footprint (CO2)</label>
            <input type="number" step="0.01" name="carbonFootprint" value={form.carbonFootprint} onChange={handleChange} className={inputClasses} />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Harvest date</label>
          <input type="date" name="harvestDate" value={form.harvestDate} onChange={handleChange} className={inputClasses} />
        </div>

        {/* Checkbox con diseño moderno */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <input 
            type="checkbox" 
            name="isOrganic" 
            id="isOrganic"
            checked={form.isOrganic} 
            onChange={handleChange} 
            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="isOrganic" className="text-sm font-semibold text-gray-700 cursor-pointer">
            This ingredient is Organic
          </label>
        </div>

        {/* Botón de acción principal */}
        <button 
          disabled={submitting} 
          type="submit"
          className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all shadow-lg ${
            submitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700 active:transform active:scale-95'
          }`}
        >
          {submitting ? 'Saving...' : 'Save Ingredient'}
        </button>
      </form>
    </div>
  );
}