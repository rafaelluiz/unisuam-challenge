import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Avatar } from "../Avatar";

describe("Avatar component", () => {
  it("renders the correct url avatar", () => {
    render(
      <Avatar
        url="https://avatars.githubusercontent.com/u/1178427?v=4"
        width="w-24"
      />
    );
    const img = screen.getByRole("img"); // busca a tag <img>
    expect(img).toHaveAttribute(
      "src",
      "https://avatars.githubusercontent.com/u/1178427?v=4"
    );
  });
});
