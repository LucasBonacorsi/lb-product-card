import styles from "../styles/styles.module.css";
import { useProduct } from "../hooks/useProduct";
import React,{ createContext, CSSProperties, } from "react";
import {
  InitialValues,
  OnChangeArgs,
  Product,
  ProductCardHandlers,
  ProductContextProps,
} from "../interfaces/interfaces";
import { ProductImage } from "./ProductImage";
import { ProductTitle } from "./ProductTitle";
import ProductButtons from "./ProductButtons";

export const ProductContext = createContext({} as ProductContextProps);

export interface ProductCardProps {
  product: Product;
  children: ((args: ProductCardHandlers) => JSX.Element);
  className?: string;
  style?: CSSProperties;
  onChange?: (args: OnChangeArgs) => void;
  value?: number;
  initialValues?: InitialValues;
}

export const ProductCard = ({
  product,
  children,
  className,
  style,
  onChange,
  value,
  initialValues,
}: ProductCardProps) => {
  const { counter, increaseBy,
    isMaxCountReached,reset} = useProduct({
    onChange,
    product,
    value,
    initialValues
  });

  return (
    <ProductContext.Provider
      value={{
        counter,
        increaseBy,
        product,
        maxCount: initialValues?.maxCount
      }}
    >
      <div className={`${styles.productCard} ${className}`} style={style}>
        {children({
          count: counter,
          isMaxCountReached,
          reset,
          maxCount: initialValues?.maxCount,
          product,
          increaseBy
        })}
      </div>
    </ProductContext.Provider>
  );
};

ProductCard.Title = ProductTitle;
ProductCard.Image = ProductImage;
ProductCard.Button = ProductButtons;
