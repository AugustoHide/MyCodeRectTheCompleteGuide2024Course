import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Testing Greeting Component", () => {
  test("renders Hello There", () => {
    // Arrange
    render(<Greeting />);

    //Act
    // ... nothing hahahahaha

    //Assert
    const helloThereEl = screen.getByText("Hello There", { exact: false });
    expect(helloThereEl).toBeInTheDocument();
  });

  test("renders It is good right? if btn not clicked", () => {
    render(<Greeting />);

    const outputEl = screen.getByText("It is good right?", { exact: false });
    expect(outputEl).toBeInTheDocument();
  });

  test("renders Changed if btn was clicked", () => {
    render(<Greeting />);

    //Act
    const btnEl = screen.getByRole("button");
    userEvent.click(btnEl);

    const outputEl = screen.getByText("Changed", { exact: false });
    expect(outputEl).toBeInTheDocument();
  });

  test("do not renders It is good right? after button click", () => {
    render(<Greeting />);

    //Act
    const btnEl = screen.getByRole("button");
    userEvent.click(btnEl);

    const outputEl = screen.queryByText("It is good right", { exact: false });
    expect(outputEl).toBeNull();
  });
});
