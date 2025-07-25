
import { Button } from "@/components/ui/button";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-muted flex min-h-screen items-center justify-center">
          <div className="bg-background max-w-md rounded-lg p-8 text-center shadow-xl">
            <h1 className="text-destructive mb-4 text-6xl font-bold">Oops!</h1>
            <div className="mb-8">
              <div className="bg-destructive mx-auto my-4 h-1 w-16"></div>
              <h2 className="text-accent-foreground mb-4 text-2xl font-semibold">
                Ups, algo ha fallado...
              </h2>
              <p className="text-muted-foreground mb-4">
                Ha ocurrido un error inesperado. Nos pondremos a ello.
              </p>
              {this.state.error && (
                <p className="text-muted-foreground bg-muted mb-4 rounded-lg p-4 text-sm">
                  {this.state.error.message}
                </p>
              )}
            </div>
            <div className="space-x-4">
              <Button onClick={() => window.location.reload()}>
                Refrescar página
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
