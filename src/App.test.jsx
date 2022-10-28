import { render, screen } from "@testing-library/react";
import { App } from "./App";
import React from "react";
import { Provider } from "react-redux";
import { initStore } from "./store/index";

const store = initStore();

describe("Компонент App", () => {
  const application = (
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );

  it("Отображает заголовок «Каталог»", () => {
    render(application);
    expect(screen.getByText("Каталог")).toBeInTheDocument();
  });

  it("Отображает карточки товаров", () => {
    render(application);
    expect(screen.queryAllByTestId("product-card").length).toBeGreaterThan(0);
  });
});
