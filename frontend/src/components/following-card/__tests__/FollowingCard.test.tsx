import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FollowingCard } from "../FollowingCard";

describe("FollowingCard component", () => {
  it("renders the correct name", () => {
    render(<FollowingCard name="José" avatar="url_avatar" />);
    expect(screen.getByText("José")).toBeInTheDocument();
  });
});
