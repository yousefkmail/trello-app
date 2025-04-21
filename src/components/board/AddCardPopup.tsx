import { FormEvent } from "react";
import { AnimatedPopup, AnimatedPopupProps } from "../animation/AnimatedPopup";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

interface AddCardPopupProps extends AnimatedPopupProps {
  onAddCard: (title: string, description: string) => void;
  onClose: () => void;
  titleInitialValue: string;
  popupTitle: string;
  descriptionInitialValue: string;
}
export default function AddCardPopup({
  isShown,
  onClose,
  onAddCard,
  popupTitle = "Add a new card",
  titleInitialValue,
  descriptionInitialValue,
}: Partial<AddCardPopupProps>) {
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
              const title = formData.get("title");
              const description = formData.get("description");
              if (!title || !description) return;
              onAddCard?.(title.toString(), description.toString());
            }}
            className="space-y-4"
          >
            <Input
              defaultValue={titleInitialValue}
              name="title"
              type="text"
              placeholder="Title."
            />
            <Input
              defaultValue={descriptionInitialValue}
              name="description"
              type="text"
              placeholder="Description"
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
