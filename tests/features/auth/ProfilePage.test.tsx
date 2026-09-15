import { render, screen } from "@testing-library/react";
import ProfilePage from "../../../src/features/auth/ProfilePage";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../src/features/auth/AuthContext";

describe("ProfilePage", () => {
  it("renders the profile heading", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ProfilePage />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /profile/i }),
    ).toBeInTheDocument();
  });
});
