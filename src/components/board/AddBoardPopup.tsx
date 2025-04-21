import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { FormEvent } from "react";
import { AnimatedPopup, AnimatedPopupProps } from "../animation/AnimatedPopup";

interface AddBoardPopupProps extends AnimatedPopupProps {
  onClose: () => void;
  onCreateBoard: (boardName: string) => void;
}

export default function AddBoardPopup({
  isShown = true,
  onClose,
  onCreateBoard,
}: Partial<AddBoardPopupProps>) {
  return (
    <AnimatedPopup isShown={isShown}>
      <Card className="p-0">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">New board</h2>
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
              onCreateBoard?.(name.toString());
            }}
            className="space-y-4"
          >
            <Input name="name" type="text" placeholder="Name" />
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </AnimatedPopup>
  );
}
