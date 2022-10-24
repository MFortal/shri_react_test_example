import { ProductCard } from "./components/ProductCard";
import { useSelector } from "react-redux";

import styles from "./App.module.css";

export const App = () => {
  const bouquetList = useSelector((state) => state.card);
 
  return (
    <div className={styles.root}>
      <h1>Каталог</h1>
      <div className={styles.list}>
        {bouquetList.map((bouquet) => (
          <ProductCard key={bouquet.id} {...bouquet} />
        ))}
      </div>
    </div>
  );
};
