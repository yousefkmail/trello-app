import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components//ui/card";
import { Input } from "@/components/ui/input";
import { AnimatedPopup, AnimatedPopupProps } from "../animation/AnimatedPopup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  maxLength,
  required,
} from "@/lib/react-hook-form/validations/validations";

type CreateBoardProps = {
  name: string;
};

interface AddBoardPopupProps extends AnimatedPopupProps {
  onClose: () => void;
  onCreateBoard: (boardName: string) => void;
  titleInitialValue?: string;
  popupTitle?: string;
}

export default function AddBoardPopup({
  isShown = true,
  onClose,
  onCreateBoard,
  titleInitialValue = "",
  popupTitle = "New Board",
}: Partial<AddBoardPopupProps>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBoardProps>();

  const onSubmit = (data: CreateBoardProps) => {
    onCreateBoard?.(data.name);
  };

  useEffect(() => {
    if (!isShown) {
      reset();
    }
  }, [isShown]);

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("name", {
                ...required(),
                ...maxLength(20),
              })}
              defaultValue={titleInitialValue}
              name="name"
              type="text"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}

            <Button type="submit" className="w-full">
              Confirm
            </Button>
          </form>
        </CardContent>
      </Card>
    </AnimatedPopup>
  );
}
