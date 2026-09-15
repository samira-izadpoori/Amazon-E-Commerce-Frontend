import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../../../src/features/products/ProductCard";
import type { Product } from "../../../src/types/product";

describe("ProductCard", () => {
  const product: Product = {
    id: "1",
    title: "Test Product",
    description: "Test description",
    price: 99,
    image: "test-image.jpg",
    category: "test",
    stock: 10,
  };

  const onAddToCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the product title", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} onAddToCart={onAddToCart} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders the product price", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} onAddToCart={onAddToCart} />
      </MemoryRouter>,
    );

    expect(screen.getByText("$99.00")).toBeInTheDocument();
  });

  it("calls onAddToCart when the button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductCard product={product} onAddToCart={onAddToCart} />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await user.click(button);

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });

  it("disables the Add to Cart button when the product is out of stock", () => {
    const outOfStockProduct: Product = {
      ...product,
      stock: 0,
    };

    render(
      <MemoryRouter>
        <ProductCard product={outOfStockProduct} onAddToCart={onAddToCart} />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: /out of stock/i,
    });

    expect(button).toBeDisabled();
  });
});
