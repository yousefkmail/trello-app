import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatedPopup, AnimatedPopupProps } from "../animation/AnimatedPopup";
import { useForm } from "react-hook-form";
import {
  maxLength,
  required,
} from "@/lib/react-hook-form/validations/validations";
import { useEffect } from "react";

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
  popupTitle = "New Column",
}: Partial<AddColumnPopupProps>) {
  type CreateColumnProps = {
    title: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateColumnProps>();

  const onSubmit = (data: CreateColumnProps) => {
    onAddColumn?.(data.title);
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
              defaultValue={initialColumnName}
              {...register("title", {
                ...required(),
                ...maxLength(20),
              })}
              type="text"
              placeholder="Title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
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
