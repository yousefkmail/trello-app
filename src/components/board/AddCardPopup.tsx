import { AnimatedPopup, AnimatedPopupProps } from "../animation/AnimatedPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  maxLength,
  required,
} from "@/lib/react-hook-form/validations/validations";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type CreateCardProps = {
  title: string;
  description?: string;
};

interface AddCardPopupProps extends AnimatedPopupProps {
  onAddCard: (title: string, description?: string) => void;
  onClose: () => void;
  titleInitialValue: string;
  popupTitle: string;
  descriptionInitialValue: string;
}

export default function AddCardPopup({
  isShown,
  onClose,
  onAddCard,
  popupTitle = "New Card",
  titleInitialValue,
  descriptionInitialValue,
}: Partial<AddCardPopupProps>) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateCardProps>();

  const onSubmit = (card: CreateCardProps) => {
    onAddCard?.(card.title, card.description);
  };

  useEffect(() => {
    if (!isShown) reset();
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
              defaultValue={titleInitialValue}
              {...register("title", { ...required(), ...maxLength(30) })}
              type="text"
              placeholder="Title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
            <Input
              defaultValue={descriptionInitialValue}
              {...register("description", { ...maxLength(100) })}
              type="text"
              placeholder="Description"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
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
