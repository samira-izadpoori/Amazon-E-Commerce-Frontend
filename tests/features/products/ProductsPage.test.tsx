import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import ProductsPage from "../../../src/features/products/ProductsPage";
import { fetchProducts } from "../../../src/api/products";
import { useCart } from "../../../src/features/cart/CartContext";
import type { Product } from "../../../src/types/product";

vi.mock("../../../src/api/products");
vi.mock("../../../src/features/cart/CartContext");

describe("ProductsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 1. Loading state
  it("renders the loading message while products are loading", () => {
    const queryClient = new QueryClient();

    const mockedFetchProducts = vi.mocked(fetchProducts);
    const mockedUseCart = vi.mocked(useCart);

    mockedFetchProducts.mockReturnValue(new Promise(() => {}));

    mockedUseCart.mockReturnValue({
      addItem: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ProductsPage />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  // 2. Success state
  it("renders products when the API returns data", async () => {
    const product: Product = {
      id: "1",
      title: "Test Product",
      description: "Test description",
      price: 99,
      image: "test-image.jpg",
      category: "test",
      stock: 10,
    };

    const queryClient = new QueryClient();

    const mockedFetchProducts = vi.mocked(fetchProducts);
    const mockedUseCart = vi.mocked(useCart);

    mockedFetchProducts.mockResolvedValue([product]);

    mockedUseCart.mockReturnValue({
      addItem: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(await screen.findByText("Test Product")).toBeInTheDocument();
  });

  // 3. Error state
  it("renders an error message when the API request fails", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const mockedFetchProducts = vi.mocked(fetchProducts);
    const mockedUseCart = vi.mocked(useCart);

    mockedFetchProducts.mockRejectedValue(new Error("Failed to load products"));

    mockedUseCart.mockReturnValue({
      addItem: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ProductsPage />
      </QueryClientProvider>,
    );

    expect(
      await screen.findByText("Failed to load products"),
    ).toBeInTheDocument();
  });

  // 4. Refetch after clicking Try again
  it("refetches products when the user clicks Try again", async () => {
    const user = userEvent.setup();

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const mockedFetchProducts = vi.mocked(fetchProducts);
    const mockedUseCart = vi.mocked(useCart);

    mockedFetchProducts.mockRejectedValue(new Error("Failed to load products"));

    mockedUseCart.mockReturnValue({
      addItem: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        ‹
        <ProductsPage />
      </QueryClientProvider>,
    );

    const tryAgainButton = await screen.findByRole("button", {
      name: /try again/i,
    });

    await user.click(tryAgainButton);

    expect(mockedFetchProducts).toHaveBeenCalledTimes(2);
  });

  // 5. Recovery: first request fails, second request succeeds
  it("renders products after a failed request is retried successfully", async () => {
    const product: Product = {
      id: "1",
      title: "Test Product",
      description: "Test description",
      price: 99,
      image: "test-image.jpg",
      category: "test",
      stock: 10,
    };

    const user = userEvent.setup();

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const mockedFetchProducts = vi.mocked(fetchProducts);
    const mockedUseCart = vi.mocked(useCart);

    // First request fails
    mockedFetchProducts.mockRejectedValueOnce(
      new Error("Failed to load products"),
    );

    // Second request succeeds
    mockedFetchProducts.mockResolvedValueOnce([product]);

    mockedUseCart.mockReturnValue({
      addItem: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const tryAgainButton = await screen.findByRole("button", {
      name: /try again/i,
    });

    await user.click(tryAgainButton);

    expect(await screen.findByText("Test Product")).toBeInTheDocument();
  });
  it("navigates to the product details route when the user clicks a product link", async () => {
    const product: Product = {
      id: "1",
      title: "Test Product",
      description: "Test description",
      price: 99,
      image: "test-image.jpg",
      category: "test",
      stock: 10,
    };

    function TestProductDetails() {
      const { id } = useParams();

      return <div>Product ID: {id}</div>;
    }
    // Arrange
    const user = userEvent.setup();

    const mockedFetchProducts = vi.mocked(fetchProducts);
    mockedFetchProducts.mockResolvedValue([product]);

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/products"]}>
          <Routes>
            <Route path="/products" element={<ProductsPage />} />

            <Route path="/products/:id" element={<TestProductDetails />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // Act
    const productLink = await screen.findByRole("link", {
      name: product.title,
    });

    await user.click(productLink);

    // Assert
    expect(
      await screen.findByText(`Product ID: ${product.id}`),
    ).toBeInTheDocument();
  });
});
