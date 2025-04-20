import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { FormEvent } from "react";
import { AnimatedPopup, AnimatedPopupProps } from "../animation/AnimatedPopup";

interface AddColumnPopupProps extends AnimatedPopupProps {
  onClose: () => void;
  onAddColumn: (name: string) => void;
}

export default function AddColumnPopup({
  isShown = true,
  onClose,
  onAddColumn,
}: Partial<AddColumnPopupProps>) {
  return (
    <AnimatedPopup isShown={isShown}>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add a new column</h2>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              console.log(formData.get("name"));
              const name = formData.get("name");
              if (!name) return;
              onAddColumn?.(name.toString());
            }}
            className="space-y-4"
          >
            <Input name="name" type="text" placeholder="Column name" />
            <Button type="submit" className="w-full">
              Add Column
            </Button>
          </form>
        </CardContent>
      </Card>
    </AnimatedPopup>
  );
}
