import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  ProductSchema,
  type ProductInput,
  type ProductOutput,
} from "../schemas/product";

type Props = {
  onSubmit: (data: ProductOutput) => void;
};

export default function AdminProductForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState, reset } = useForm<ProductInput>({
    resolver: zodResolver(ProductSchema),
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
      <Box>
        <TextField type="text" {...register("title")} placeholder="Titel" />
        {formState.errors.title && (
          <Typography>{formState.errors.title.message}</Typography>
        )}
      </Box>
      <Box>
        <TextField
          type="text"
          {...register("description")}
          placeholder="Beskrivning"
        />
        {formState.errors.description && (
          <Typography>{formState.errors.description.message}</Typography>
        )}
      </Box>
      <Box>
        <TextField type="number" {...register("price")} placeholder="Pris" />
        {formState.errors.price && (
          <Typography>{formState.errors.price.message}</Typography>
        )}
      </Box>
      <Box>
        <TextField type="text" {...register("imageUrl")} placeholder="Url" />
        {formState.errors.imageUrl && (
          <Typography>{formState.errors.imageUrl.message}</Typography>
        )}
      </Box>
      <Box>
        <TextField type="number" {...register("stock")} placeholder="Stock" />
        {formState.errors.stock && (
          <Typography>{formState.errors.stock.message}</Typography>
        )}
      </Box>
      <Button sx={{ border: "0.1rem solid grey" }} type="submit">
        Skicka
      </Button>
    </Box>
  );
}
