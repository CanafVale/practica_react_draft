import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import { AuthProvider } from "./pages/auth/context";
import App from "./app";
import { ErrorBoundary } from "./pages/error/error-boundary";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider defaultIsLogged={!!accessToken}>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
