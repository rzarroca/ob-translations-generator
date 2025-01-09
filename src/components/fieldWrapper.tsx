// Vendors
import { PropsWithChildren } from "react";

export const FieldWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col space-y-1.5">{children}</div>
);
