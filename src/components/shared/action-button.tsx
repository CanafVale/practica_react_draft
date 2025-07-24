import type { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type ButtonProps = ComponentProps<typeof Button>;

type ActionButtonProps = ButtonProps & {
  loading?: boolean;
};

export default function ActionButton({
  loading,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <Button {...props}>
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
}
