import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    [
      "text-sm font-semibold transition-colors",
      "px-3 py-2 rounded-lg",
      isActive
        ? "bg-primary text-primary-foreground shadow-soft"
        : "text-secondary/80 hover:text-secondary hover:bg-muted",
    ].join(" ");

  return (
    <nav className="bg-surface border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-2xl font-serif font-bold italic text-primary hover:opacity-80 transition-opacity"
        >
          Hambre Cero
        </NavLink>

        <div className="flex items-center gap-3">
          <NavLink to="/recipes" className={linkClass}>
            Recipes
          </NavLink>

          <NavLink to="/ingredients" className={linkClass}>
            Ingredients
          </NavLink>

          <button
            type="button"
            className="ml-2 px-5 py-2 rounded-lg border border-border bg-surface text-secondary font-bold text-xs
                       shadow-soft hover:bg-muted transition active:translate-y-0.5"
          >
            About us
          </button>
        </div>
      </div>
    </nav>
  );
}
