import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Matches the snapshot", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
test("renders a component and verifies that main elements are displayed", () => {
  render(<App />);
  const headerElement = screen.getByText(/Element selection/i);
  const modalButtonElement = screen.getByText(/Change my selection/i);
  expect(headerElement).toBeInTheDocument();
  expect(modalButtonElement).toBeInTheDocument();
});
