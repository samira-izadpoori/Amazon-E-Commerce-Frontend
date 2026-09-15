import { render, screen } from "@testing-library/react";
import DashboardCard from "../../../src/components/dashboard/DashboardCard";
import { describe, it, expect } from "vitest";

describe("DashboardCard", () => {
  it("renders title and value", () => {
    render(<DashboardCard title="Total Sales" value="$12,345" />);

    expect(screen.getByText(/total sales/i)).toBeInTheDocument();
    expect(screen.getByText(/\$12,345/)).toBeInTheDocument();
  });
});
