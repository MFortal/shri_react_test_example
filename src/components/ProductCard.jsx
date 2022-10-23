import cn from "classnames";
import styles from "./ProductCard.module.css";
import { useState } from "react";

export const ProductCard = (props) => {
  const {
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

  const [favoriteFlag, changeFavorite] = useState(isFavorite);

  return (
    <div className={cn(styles.card)} data-testid="product-card">
      <div className={cn(styles.card_img)}>
        <img className={cn(styles.img)} src={imageUrl} alt=""></img>
        <div className={cn(styles.header)}>
          <div className={cn(styles.header_labels)}>
            {Boolean(isHit) && (
              <span className={cn(styles.label, styles.header_hit)}>Хит</span>
            )}
            {Boolean(isSale) && (
              <span className={cn(styles.label, styles.header_sale)}>
                Скидка
              </span>
            )}
          </div>
          <span
            className={cn(
              styles.favorite,
              favoriteFlag ? styles.isFavorite : styles.noFavorite
            )}
            onClick={() => changeFavorite(!favoriteFlag)}></span>
        </div>
      </div>
      <div className={cn(styles.card_info)}>
        <p className={cn(styles.title)}>{title}</p>
        <div className={cn(styles.prices)}>
          {Boolean(oldPrice) && (
            <p className={cn(styles.price, styles.price_old)}>
              {toFormat(oldPrice)} ₽
            </p>
          )}
          <p className={cn(styles.price, oldPrice ? styles.price_through : "")}>
            {toFormat(currentPrice)} ₽
          </p>
        </div>
        <div className={cn(styles.info)}>
          <div className={cn(styles.info_text, styles.info_count)}>
            {flowersCount} шт
          </div>
          <div className={cn(styles.info_text, styles.info_height)}>
            {bouquetHeight} см
          </div>
          <div className={cn(styles.info_text, styles.info_width)}>
            {bouquetWidth} см
          </div>
        </div>
      </div>
      <div className={cn(styles.card_btns)}>
        <button className={cn(styles.btn, styles.btn_cart)}>В корзину</button>
        <button className={cn(styles.btn, styles.btn_buy)}>Купить сразу</button>
      </div>
    </div>
  );
};
