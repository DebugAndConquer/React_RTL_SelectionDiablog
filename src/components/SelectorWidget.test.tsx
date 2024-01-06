import React from "react";
import { render, screen } from "@testing-library/react";
import SelectorWidget from "./SelectorWidget";
import { generateSampleData } from "./helpers/helpers";
import userEvent from "@testing-library/user-event";

test("Verifies that the dialog opens, its content is visible and then matches the snapshot", async () => {
  const { container } = render(
    <SelectorWidget options={generateSampleData(10)} />
  );
  const modalButtonElement = screen.getByText(/Change my selection/i);
  await userEvent.click(modalButtonElement);
  const saveButtonElement = screen.getByText(/Save/i);
  expect(saveButtonElement).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
