import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { Button } from "@/components/ui/button";

const tripSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
});

type TripFormData = z.infer<typeof tripSchema>;

export default function TripForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
  });

  const onSubmit = (data: TripFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <InputField
        label="Title"
        type="text"
        placeholder="Japan Trip"
        {...register("title")}
        error={errors.title}
      />

      <InputField
        label="Description"
        placeholder="Trip Description"
        as="textarea"
        {...register("description")}
        error={errors.description}
      />

      <InputField
        label="Start Date"
        type="date"
        {...register("startDate")}
        error={errors.startDate}
      />

      <InputField
        label="End Date"
        type="date"
        {...register("endDate")}
        error={errors.endDate}
      />

      <Button type="submit" className="cursor-pointer">
        Submit
      </Button>
    </form>
  );
}
