import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <h1 className="text-6xl font-serif font-bold italic tracking-tight text-primary">
        HambreCero
      </h1>

      <p className="max-w-md text-lg font-medium text-secondary/80">
        Artisanal management of recipes and ingredients for professional catering.
      </p>

      <Link
        to="/recipes"
        className="inline-flex items-center justify-center rounded-full px-8 py-3 font-bold tracking-wide
                   bg-primary text-primary-foreground shadow-soft hover:opacity-95 transition"
      >
        Explore Recipes
      </Link>
    </section>
  );
}