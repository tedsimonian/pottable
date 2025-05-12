import React, { useContext, createContext, type ReactNode } from "react";
import { type ZodObject, type ZodRawShape } from "zod";

// Make the context generic
const FormSchemaContext = createContext<ZodObject<ZodRawShape> | null>(null);

type FormSchemaProviderProps<T extends ZodRawShape> = {
  schema: ZodObject<T>;
  children: ReactNode;
};

export function FormSchemaProvider<T extends ZodRawShape>({
  schema,
  children,
}: FormSchemaProviderProps<T>) {
  return (
    <FormSchemaContext.Provider value={schema}>
      {children}
    </FormSchemaContext.Provider>
  );
}

export function useSchema<T extends ZodRawShape>() {
  const context = useContext(FormSchemaContext);
  if (!context) {
    throw new Error("useSchema must be used within a FormSchemaProvider");
  }
  return context as ZodObject<T>;
}
