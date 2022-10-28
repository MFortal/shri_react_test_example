import cn from "classnames";
import { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
import { useDispatch } from "react-redux";
import { toggleFavoriteAction, inCartAction } from "../store/cardReducer";

export const ProductCard = (props) => {
  const {
    id,
    title,
    imageUrl,
    oldPrice,
    currentPrice,
    isFavorite,
    isHit,
    isSale,
    bouquetHeight,
    bouquetWidth,
    flowersCount,
  } = props;

  function toFormat(str) {
    return str
      .split("")
      .reverse()
      .join("")
      .match(/\d{0,3}/g)
      .join(" ")
      .split("")
      .reverse()
      .join("")
      .trim();
  }
  const dispatch = useDispatch();

  const toggleFavorite = (id) => {
    dispatch(toggleFavoriteAction(id));
  };

  const addCart = (id) => {
    dispatch(inCartAction(id));
  };

  const [url, setUrl] = useState("");
  useEffect(() => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((image) => {
        setUrl(URL.createObjectURL(image));
      });
  });

  const imgContainer = url ? (
    <img
      className={cn(styles.img)}
      src={url}
      alt=""
      data-testid="current-img"></img>
  ) : (
    <img
      className={cn(styles.img)}
      src="https://gosapteka22.ru/image/cache/catalog/no_photo-1000x1000.jpg"
      alt=""
      data-testid="plug-img"></img>
  );

  return (
    <div className={cn(styles.card)} data-testid="product-card">
      <div className={cn(styles.card_img)}>
        {imgContainer}
        <div className={cn(styles.header)}>
          <div className={cn(styles.header_labels)}>
            {Boolean(isHit) && (
              <span
                className={cn(styles.label, styles.header_hit)}
                data-testid="hit">
                Хит
              </span>
            )}
            {Boolean(isSale) && (
              <span
                className={cn(styles.label, styles.header_sale)}
                data-testid="sale">
                Скидка
              </span>
            )}
          </div>
          <span
            className={cn(
              styles.favorite,
              isFavorite ? styles.isFavorite : styles.noFavorite
            )}
            onClick={() => toggleFavorite(id)}
            data-testid="favorite-btn"></span>
        </div>
      </div>
      <div className={cn(styles.card_info)}>
        <p className={cn(styles.title)}>{title}</p>
        <div className={cn(styles.prices)}>
          {Boolean(oldPrice) && (
            <p
              className={cn(styles.price, styles.price_old)}
              data-testid="old-price">
              {toFormat(oldPrice)} ₽
            </p>
          )}
          <p className={cn(styles.price, oldPrice ? styles.price_through : "")}>
            {toFormat(currentPrice)} ₽
          </p>
        </div>
        <div className={cn(styles.info)}>
          {Boolean(flowersCount) && flowersCount > 0 && (
            <div
              className={cn(styles.info_text, styles.info_count)}
              data-testid="count">
              {flowersCount} шт
            </div>
          )}
          {Boolean(bouquetHeight) && bouquetHeight > 0 && (
            <div
              className={cn(styles.info_text, styles.info_height)}
              data-testid="height">
              {bouquetHeight} см
            </div>
          )}
          {Boolean(bouquetWidth) && bouquetWidth > 0 && (
            <div
              className={cn(styles.info_text, styles.info_width)}
              data-testid="width">
              {bouquetWidth} см
            </div>
          )}
        </div>
      </div>
      <div className={cn(styles.card_btns)}>
        <button
          className={cn(
            styles.btn,
            styles.btn_cart,
            flowersCount <= 0 ? styles.btn_disabled : ""
          )}
          onClick={() => (flowersCount > 0 ? addCart(id) : "")}>
          В корзину
        </button>
        <button
          className={cn(
            styles.btn,
            styles.btn_buy,
            flowersCount <= 0 ? styles.btn_disabled : ""
          )}
          onClick={() => (flowersCount > 0 ? addCart(id) : "")}>
          Купить сразу
        </button>
      </div>
    </div>
  );
};
