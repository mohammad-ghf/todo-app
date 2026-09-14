import * as yup from "yup";

export const todoSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(15, "Title must be at most 15 characters"),

  description: yup
    .string()
    .max(120, "Description must be at most 100 characters"),
});
