import React from "react";
import { prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { generateSampleData } from "./helpers/helpers";
import userEvent from "@testing-library/user-event";
import SelectorDialog from "./SelectorDialog";

const onSave = jest.fn();
const onHide = jest.fn();

test("Matches the snapshot", () => {
  const { container } = render(
    <SelectorDialog
      options={generateSampleData(10)}
      onSave={onSave}
      onHide={onHide}
    />
  );
  expect(container).toMatchSnapshot();
});

test("Verifies that search filters the list correctly", async () => {
  render(
    <SelectorDialog
      // Generate a list of 10 elements for this test
      options={generateSampleData(10)}
      onSave={onSave}
      onHide={onHide}
    />
  );
  const searchElement = screen.getByTestId("mainSearchElement");
  userEvent.type(searchElement, "Element 5");
  expect(screen.getByText("Element 5")).toBeInTheDocument();
  expect(screen.queryByText("Element 4")).not.toBeInTheDocument();
  await userEvent.clear(searchElement);

  userEvent.type(searchElement, "1");
  expect(screen.getByText("Element 1")).toBeInTheDocument();
  expect(screen.getByText("Element 10")).toBeInTheDocument();
  expect(screen.queryByText("Element 4")).not.toBeInTheDocument();
  expect(screen.queryByText("Element 11")).not.toBeInTheDocument();
});

test("Verifies that filter works as expected and changes the list accordingly", () => {
  render(
    <SelectorDialog
      // Generate a list of 300 elements for this test
      options={generateSampleData(300)}
      onSave={onSave}
      onHide={onHide}
    />
  );
  const filterElement = screen.getByTestId("mainFilterElement");
  userEvent.selectOptions(filterElement, "Number &gt; 10");
  expect(screen.queryByText("Element 4")).not.toBeInTheDocument();
  expect(screen.queryByText("Element 10")).not.toBeInTheDocument();
  expect(screen.getByText("Element 11")).toBeInTheDocument();
  expect(screen.getByText("Element 200")).toBeInTheDocument();

  userEvent.selectOptions(filterElement, "Number &gt; 50");
  expect(screen.queryByText("Element 4")).not.toBeInTheDocument();
  expect(screen.queryByText("Element 10")).not.toBeInTheDocument();
  expect(screen.queryByText("Element 50")).not.toBeInTheDocument();
  expect(screen.getByText("Element 51")).toBeInTheDocument();
  expect(screen.getByText("Element 200")).toBeInTheDocument();

  userEvent.selectOptions(filterElement, "Number &gt; 100");
  expect(screen.queryByText("Element 4")).not.toBeInTheDocument();
  expect(screen.queryByText("Element 50")).not.toBeInTheDocument();
  expect(screen.queryByText("Element 100")).not.toBeInTheDocument();
  expect(screen.getByText("Element 101")).toBeInTheDocument();
  expect(screen.getByText("Element 200")).toBeInTheDocument();

  userEvent.selectOptions(filterElement, "No filters");
  expect(screen.getByText("Element 1")).toBeInTheDocument();
  expect(screen.getByText("Element 11")).toBeInTheDocument();
  expect(screen.getByText("Element 201")).toBeInTheDocument();
});

test("Verifies that element selection works, the black card is created for each selected element and elements can be removed", async () => {
  render(
    <SelectorDialog
      options={generateSampleData(10)}
      onSave={onSave}
      onHide={onHide}
    />
  );
  // Element selection assertations
  const element2 = screen.getByText("Element 2");
  const element5 = screen.getByText("Element 5");
  await userEvent.click(element2);
  expect(screen.getAllByText("Element 2")).toHaveLength(2);
  expect(screen.getByTestId("element-2-selector-option")).toBeInTheDocument();
  expect(screen.getAllByText("Element 5")).toHaveLength(1);
  expect(
    screen.queryByTestId("element-5-selector-option")
  ).not.toBeInTheDocument();

  await userEvent.click(element5);
  expect(screen.getAllByText("Element 2")).toHaveLength(2);
  expect(screen.getByTestId("element-2-selector-option")).toBeInTheDocument();
  expect(screen.getAllByText("Element 5")).toHaveLength(2);
  expect(screen.getByTestId("element-5-selector-option")).toBeInTheDocument();

  // Element de-selection assertations
  // By clicking again on the element
  await userEvent.click(element2);
  expect(screen.getAllByText("Element 2")).toHaveLength(1);
  expect(
    screen.queryByTestId("element-2-selector-option")
  ).not.toBeInTheDocument();
  // By clicking on black box's close button
  await userEvent.click(
    screen.getByTestId("element-5-selector-option-remove-button")
  );
  expect(screen.getAllByText("Element 5")).toHaveLength(1);
  expect(
    screen.queryByTestId("element-5-selector-option")
  ).not.toBeInTheDocument();
  expect(
    screen.getByText(/Selected elements will appear here/i)
  ).toBeInTheDocument();
});

test("Verifies that save and cancel buttons work and handlers are being called", async () => {
  render(
    <SelectorDialog
      options={generateSampleData(3)}
      onSave={onSave}
      onHide={onHide}
    />
  );

  const element1 = screen.getByText("Element 1");
  const element2 = screen.getByText("Element 2");
  const element3 = screen.getByText("Element 3");
  const saveButtonElement = screen.getByText(/Save/i);
  const cancelButtonElement = screen.getByText(/Cancel/i);

  await userEvent.click(element1);
  await userEvent.click(saveButtonElement);
  expect(onSave).toHaveBeenCalledWith([
    { isSelected: true, label: "Element 1", value: 1 },
    { isSelected: false, label: "Element 2", value: 2 },
    { isSelected: false, label: "Element 3", value: 3 },
  ]);

  await userEvent.click(element2);
  await userEvent.click(saveButtonElement);
  expect(onSave).toHaveBeenCalledWith([
    { isSelected: true, label: "Element 1", value: 1 },
    { isSelected: true, label: "Element 2", value: 2 },
    { isSelected: false, label: "Element 3", value: 3 },
  ]);

  await userEvent.click(element3);
  await userEvent.click(cancelButtonElement);
  expect(onSave).toHaveBeenCalledWith([
    { isSelected: true, label: "Element 1", value: 1 },
    { isSelected: true, label: "Element 2", value: 2 },
    { isSelected: false, label: "Element 3", value: 3 },
  ]);
  expect(onHide).toHaveBeenCalled();
});
