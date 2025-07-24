import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { type ComponentProps, type ReactNode } from "react";

type ButtonProps = ComponentProps<typeof Button>;

type ConfirmationButtonProps = Omit<ButtonProps, "onClick"> & {
  confirmation: ReactNode;
  confirmButton: ReactNode;
};

export default function ConfirmationButton({
  confirmation,
  confirmButton,
  ...props
}: ConfirmationButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button {...props} />
      </PopoverTrigger>
      <PopoverContent className="flex items-center gap-4">
        {confirmation}
        {confirmButton}
      </PopoverContent>
    </Popover>
  );
}
