import { type ChangeEvent, type FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./context";
import { login } from "./service";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { isApiClientError } from "@/api/error";
import FormField from "@/components/shared/form-field";
import ActionButton from "@/components/shared/action-button";
import Logo from "@/components/shared/nodepop-react";
import type { Credentials } from "./types";

function LoginForm({
  onSubmit,
}: {
  onSubmit: (form: Credentials & { remember: boolean }) => Promise<void>;
}) {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials((credentials) => ({
      ...credentials,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const remember = !!formData.get("remember");
    try {
      setSubmitting(true);
      await onSubmit({ ...credentials, remember });
    } catch (error) {
      if (isApiClientError(error)) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const { email, password } = credentials;
  const canSubmit = email && password;

  return (
    <div>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <FormField>
          Tu email:
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            autoComplete="off"
          />
        </FormField>
        <FormField>
          Y tu contraseña:
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            autoComplete="off"
          />
        </FormField>
        <FormField className="flex py-2">
          <Switch name="remember" value="remember" />
          Recuérdame!
        </FormField>
        <ActionButton
          disabled={!canSubmit || submitting}
          loading={submitting}
          className="w-full"
        >
          {submitting
            ? "Estamos en ello, un momentito..."
            : canSubmit
              ? "Log in en Anapop"
              : "Introduce tus datos para entrar"}
        </ActionButton>
      </form>
      <Toaster position="bottom-center" richColors />
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { onLogin } = useAuth();

  return (
    <div className="mx-auto h-dvh max-w-md">
      <div className="grid gap-8 px-6 py-6 pt-12">
        <header className="grid justify-items-center gap-4">
          <Logo className="h-24 w-24" />
          <h1 className="text-center text-3xl font-bold sm:text-4xl">
            Bienvenido a AnaPop
          </h1>
          <p className="text-center text-muted-foreground text-sm">
            Publica, busca o vende... con estilo.
          </p>
        </header>
        <LoginForm
          onSubmit={async ({ remember, ...credentials }) => {
            await login(credentials, remember);
            onLogin();
            navigate(location.state?.from ?? "/", { replace: true });
          }}
        />
      </div>
    </div>
  );
}
