import React,{ CSSProperties, useContext } from "react";
import noImage from "../assets/no-image.jpg";
import styles from '../styles/styles.module.css'
import { ProductContext } from "./ProductCard";

export interface ProductImageProps {
  img?: string;
  className?: string;
  style?: CSSProperties;

}

export const ProductImage = ({ img = "", className, style}: ProductImageProps) => {
    const { product } = useContext(ProductContext);
    let imgToShow: string;
  
    if (img) {
        imgToShow = img;
    } else if (product.img) {
      imgToShow = product.img;
    } else {
      imgToShow = noImage;
    }
    return (
      <img
        className={`${styles.productImg} ${className}`}
        src={imgToShow}
        alt="Coffee mug"
        style={style}
      />
    );
  };