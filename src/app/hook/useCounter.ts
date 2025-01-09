// Vendors
import { useCallback, useState } from "react";

export const useCounter = () => {
  const [counter, setCounter] = useState<number>(1);

  const handleAddTranslation = useCallback(
    () => setCounter((prev) => prev + 1),
    []
  );

  return {
    counter,
    handleAddTranslation,
  };
};
