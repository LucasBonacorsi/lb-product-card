import { useEffect, useRef, useState } from "react";
import { InitialValues, OnChangeArgs, Product } from "../interfaces/interfaces";

interface UseProductArgs {
  product: Product;
  onChange?: (args: OnChangeArgs) => void;
  value?: number;
  initialValues?: InitialValues;
}
export const useProduct = ({
  onChange,
  product,
  value = 0,
  initialValues,
}: UseProductArgs) => {
  const [counter, setCounter] = useState(initialValues?.count ?? value);
  const isMounted = useRef(false);

  const reset = () => { 
    setCounter(initialValues?.count || value);
   }

  useEffect(() => {
    if (!isMounted.current) return;

    setCounter(value);
  }, [value]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const increaseBy = (value: number) => {
    const newValue = Math.max(counter + value, 0);
    setCounter(
      Math.max(
        Math.min(
          counter + value,
          initialValues?.maxCount || Number.POSITIVE_INFINITY
        ),
        0
      )
    );
    onChange && onChange({ product, count: newValue });
  };

  return {
    counter,
    
    maxCount: initialValues?.maxCount,
    isMaxCountReached:
      !!initialValues?.maxCount && initialValues.maxCount === counter,
      increaseBy,
      reset
  };
};
