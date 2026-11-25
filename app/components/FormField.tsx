interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  errorMessage?: string;
}

export default function FormField({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  errorMessage,
}: FormFieldProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label}
        <input
          type={type}
          name={name}
          required={required}
          defaultValue={defaultValue}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </label>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
}
