import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, { message: "Нэр дор хаяж 2 тэмдэгттэй байна." }),
  email: z.string().email({ message: "Зөв и-мэйл хаяг оруулна уу" }),
});

export type UserSchemaType = z.infer<typeof userSchema>;
