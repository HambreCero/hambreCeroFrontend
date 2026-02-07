import { useState } from "react";

const SEASONS = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];

export default function IngredientForm({ initialValues, onSubmit, submitting }) {
  const [form, setForm] = useState({
    name: initialValues?.name ?? "",
    calories: initialValues?.calories ?? 0,
    season: initialValues?.season ?? "SPRING",
    // mantenemos tu lógica para leer ambos nombres
    isOrganic: initialValues?.organic ?? initialValues?.isOrganic ?? false,
    harvestDate: initialValues?.harvestDate ?? "",
    priceKg: initialValues?.priceKg ?? 0,
    carbonFootprint: initialValues?.carbonFootprint ?? 0,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Name is required");
    if (!form.season) return setError("Season is required");

    try {
      await onSubmit({
        name: form.name,
        calories: Number(form.calories),
        season: form.season,
        // enviamos el nombre esperado por el resto del proyecto/backend
        organic: Boolean(form.isOrganic),
        harvestDate: form.harvestDate,
        priceKg: Number(form.priceKg),
        carbonFootprint: Number(form.carbonFootprint),
      });
    } catch {
      setError("Could not save ingredient");
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
          <label className={labelBase}>Calories</label>
          <input type="number" name="calories" value={form.calories} onChange={handleChange} className={inputBase} />
        </div>

        <div>
          <label className={labelBase}>Season</label>
          <select name="season" value={form.season} onChange={handleChange} className={inputBase}>
            {SEASONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 flex items-center gap-3">
          <input
            id="isOrganic"
            type="checkbox"
            name="isOrganic"
            checked={form.isOrganic}
            onChange={handleChange}
            className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
          />
          <label htmlFor="isOrganic" className="text-sm font-bold text-secondary">
            Organic
          </label>
        </div>

        <div>
          <label className={labelBase}>Harvest date</label>
          <input type="date" name="harvestDate" value={form.harvestDate} onChange={handleChange} className={inputBase} />
        </div>

        <div>
          <label className={labelBase}>Price per kg</label>
          <input
            type="number"
            step="0.01"
            name="priceKg"
            value={form.priceKg}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelBase}>Carbon footprint</label>
          <input
            type="number"
            step="0.01"
            name="carbonFootprint"
            value={form.carbonFootprint}
            onChange={handleChange}
            className={inputBase}
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
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
