import { Control, Controller, FieldValues, Path } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>,
  type?: "text" | "email" | "password" | "file",
  name: Path<T>,
  label: string,
  placeholder?: string 
}

function FormField({
  control,
  name,
  type="text",
  label,
  placeholder
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="input"
              placeholder={placeholder}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormField