import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  ProductSchema,
  type ProductInput,
  type ProductOutput,
} from "../schemas/product";

type Props = {
  onSubmit: (data: ProductOutput) => void;
  defaultValues?: ProductInput;
};

export default function AdminProductForm({ onSubmit, defaultValues }: Props) {
  const { register, handleSubmit, formState, reset } = useForm<ProductInput>({
    resolver: zodResolver(ProductSchema),
    defaultValues,
  });

  function onFormSubmit(data: ProductInput) {
    onSubmit(data as ProductOutput);
    reset();
  }
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onFormSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <TextField
        sx={{ width: "100%" }}
        type="text"
        {...register("title")}
        placeholder="Titel"
        error={!!formState.errors.title}
        helperText={formState.errors.title?.message}
      />
      <TextField
        type="text"
        {...register("description")}
        placeholder="Beskrivning"
        error={!!formState.errors.description}
        helperText={formState.errors.description?.message}
      />
      <TextField
        type="number"
        {...register("price")}
        placeholder="Pris"
        error={!!formState.errors.price}
        helperText={formState.errors.price?.message}
      />
      <TextField
        type="text"
        {...register("imageUrl")}
        placeholder="Url"
        error={!!formState.errors.imageUrl}
        helperText={formState.errors.imageUrl?.message}
      />
      <TextField
        type="number"
        {...register("stock")}
        placeholder="Stock"
        error={!!formState.errors.stock}
        helperText={formState.errors.stock?.message}
      />
      <Button variant="outlined" type="submit">
        Skicka
      </Button>
    </Box>
  );
}
