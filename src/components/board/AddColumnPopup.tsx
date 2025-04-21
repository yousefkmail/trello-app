import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { FormEvent } from "react";
import { AnimatedPopup, AnimatedPopupProps } from "../animation/AnimatedPopup";

interface AddColumnPopupProps extends AnimatedPopupProps {
  onClose: () => void;
  onAddColumn: (name: string) => void;
  popupTitle: string;
  initialColumnName: string;
}

export default function AddColumnPopup({
  isShown = true,
  onClose,
  onAddColumn,
  initialColumnName,
  popupTitle = "Add a new column",
}: Partial<AddColumnPopupProps>) {
  return (
    <AnimatedPopup isShown={isShown}>
      <Card className="p-0">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{popupTitle}</h2>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get("name");
              if (!name) return;
              onAddColumn?.(name.toString());
            }}
            className="space-y-4"
          >
            <Input
              defaultValue={initialColumnName}
              name="name"
              type="text"
              placeholder="Name"
            />
            <Button type="submit" className="w-full">
              Confirm
            </Button>
          </form>
        </CardContent>
      </Card>
    </AnimatedPopup>
  );
}
