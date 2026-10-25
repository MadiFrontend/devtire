import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="font-display text-3xl font-bold">404</h1>
      <p className="mt-2 text-muted-foreground">Page not found</p>
      <Link href="/" className="mt-6 inline-block text-accent underline-offset-4 hover:underline">
        Home
      </Link>
    </div>
  );
}
