// Vendors
import { PropsWithChildren } from "react";

type FieldSetProps = PropsWithChildren<{
  legend: string;
}>;

export const FieldSet = ({ legend, children }: FieldSetProps) => (
  <fieldset className="border rounded-md p-4">
    <legend className="text-sm font-semibold px-2">{legend}</legend>
    <div className="flex flex-col space-y-4 gap-1">{children}</div>
  </fieldset>
);
