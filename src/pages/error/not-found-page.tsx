
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="bg-muted flex min-h-screen items-center justify-center">
      <div className="bg-background max-w-md rounded-lg p-8 text-center shadow-xl">
        <h1 className="text-accent-foreground text-9xl font-bold">404</h1>
        <div className="mb-8">
          <div className="bg-primary mx-auto my-4 h-1 w-16"></div>
          <h2 className="text-accent-foreground mb-4 text-2xl font-semibold">
            Página no encontrada
          </h2>
          <p className="text-muted-foreground">
            Oops! La página que estás buscando no existe o ha sido movida.
          </p>
        </div>
        <Button asChild>
          <Link to="/adverts">Volver a inicio</Link>
        </Button>
      </div>
    </div>
  );
}
