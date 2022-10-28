import { render, screen, fireEvent, within } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import styles from "./ProductCard.module.css";
import * as reduxHooks from "react-redux";
import React from "react";
import * as actions from "../store/cardReducer";

const cards = [
  {
    bouquetHeight: 100,
    bouquetWidth: 51,
    currentPrice: "87303",
    flowersCount: 8,
    id: "1",
    imageUrl: "https://loremflickr.com/400/400/nature?lock=5232",
    isFavorite: true,
    isHit: true,
    isSale: true,
    oldPrice: "37039",
    title: "Товар для маленькой такой компании",
  },
  {
    bouquetHeight: 0,
    bouquetWidth: 0,
    currentPrice: "87303",
    flowersCount: 0,
    id: "10",
    imageUrl: "https://loremflickr.com/400400/nature?lock=5232",
    isFavorite: false,
    isHit: false,
    isSale: false,
    title: "Товар для маленькой такой компании",
  },
];

jest.mock("react-redux");
const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");
const mockedInCartAction = jest.spyOn(actions, "inCartAction");

describe("Компонент «Карточка товара» (проверка наличия)", () => {
  it("Наличие плашки Хит и Скидка у товара", () => {
    render(<ProductCard {...cards[0]} />);
    const item = screen.getByTestId("product-card");
    expect(item).toBeInTheDocument();

    expect(within(item).getByTestId("hit")).toBeInTheDocument();
    expect(within(item).getByTestId("sale")).toBeInTheDocument();
  });

  it("Отметка выбранного сердечка у карточки товара", () => {
    render(<ProductCard {...cards[0]} />);
    const item = screen.getByTestId("product-card");
    expect(item).toBeInTheDocument();

    const favoriteBtn = within(item).getByTestId("favorite-btn");
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveClass(styles.isFavorite);
  });

  it("Наличие старой цены", () => {
    render(<ProductCard {...cards[0]} />);
    const item = screen.getByTestId("product-card");
    expect(item).toBeInTheDocument();

    const oldPrice = within(item).getByTestId("old-price");
    expect(oldPrice).toBeInTheDocument();
  });

  it("Способность нажать на 'В корзину' и 'Купить сразу'", () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    render(<ProductCard {...cards[0]} />);
    const item = screen.getByTestId("product-card");
    expect(item).toBeInTheDocument();

    const buyBtn = within(item).getByText(/в корзину/i);
    expect(buyBtn).toBeInTheDocument();
    fireEvent.click(buyBtn);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockedInCartAction).toHaveBeenCalledWith(cards[0].id);

    const buyNowBtn = within(item).getByText(/купить сразу/i);
    expect(buyNowBtn).toBeInTheDocument();
    fireEvent.click(buyNowBtn);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(mockedInCartAction).toHaveBeenCalledWith(cards[0].id);
  });

  it("Наличие параметров (высота, ширина, количество)", () => {
    render(<ProductCard {...cards[0]} />);
    const item = screen.getByTestId("product-card");
    expect(item).toBeInTheDocument();

    const height = within(item).getByTestId("height");
    expect(height).toBeInTheDocument();

    const width = within(item).getByTestId("width");
    expect(width).toBeInTheDocument();

    const count = within(item).getByTestId("count");
    expect(count).toBeInTheDocument();
  });
});

describe("Компонент «Карточка товара» (проверка отсутсвия)", () => {
  it("Отсутсвие плашки Хит и Скидка у товара", () => {
    render(<ProductCard {...cards[1]} />);
    const item = screen.getByTestId("product-card");
    expect(item).toBeInTheDocument();

    expect(within(item).queryByTestId("hit")).not.toBeInTheDocument();
    expect(within(item).queryByTestId("sale")).not.toBeInTheDocument();
  });

  it("Отсутвие сердечка у карточки товара", () => {
    render(<ProductCard {...cards[1]} />);
    const item = screen.getByTestId("product-card");
    expect(item).toBeInTheDocument();
    const favoriteBtn = within(item).getByTestId("favorite-btn");
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveClass(styles.noFavorite);
  });

  it("Отсутсвие старой цены", () => {
    render(<ProductCard {...cards[1]} />);
    const item = screen.getByTestId("product-card");
    expect(item).toBeInTheDocument();
    expect(within(item).queryByTestId("old-price")).not.toBeInTheDocument();
  });

  it("Отсутсвие возможность нажать на 'В корзину' и 'Купить сразу' (количество товара <= 0)", () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    render(<ProductCard {...cards[1]} />);
    const item = screen.getByTestId("product-card");
    expect(item).toBeInTheDocument();

    const buyBtn = within(item).getByText(/в корзину/i);
    expect(buyBtn).toBeInTheDocument();
    expect(buyBtn).toHaveClass(styles.btn_disabled);
    fireEvent.click(buyBtn);
    expect(dispatch).toHaveBeenCalledTimes(0);

    const buyNowBtn = within(item).getByText(/купить сразу/i);
    expect(buyNowBtn).toBeInTheDocument();
    fireEvent.click(buyNowBtn);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it("Отсутсвие параметров (высота, ширина, количество)", () => {
    render(<ProductCard {...cards[1]} />);
    const item = screen.getByTestId("product-card");
    expect(item).toBeInTheDocument();

    expect(within(item).queryByTestId("height")).not.toBeInTheDocument();
    expect(within(item).queryByTestId("width")).not.toBeInTheDocument();
    expect(within(item).queryByTestId("count")).not.toBeInTheDocument();
  });
});
