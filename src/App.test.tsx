import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import App from "./App";

describe("Tech Stack Picker", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it("opens a clear stack summary and returns with the selection intact", () => {
    render(<App />);
    expect(
      screen.queryByRole("button", { name: /view summary/i }),
    ).not.toBeInTheDocument();

    const react = screen.getByRole("button", { name: /^React$/i });
    fireEvent.click(react);
    fireEvent.click(screen.getByRole("button", { name: /view summary/i }));

    const summaryHeading = screen.getByRole("heading", {
      name: /your stack, at a glance/i,
    });
    expect(summaryHeading).toHaveFocus();
    expect(screen.getByLabelText("Stack totals")).toHaveTextContent(
      "Total1Backend0Frontend1",
    );
    expect(
      screen.getByRole("heading", { name: "Frontend" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frontend Framework" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Component library for interactive user interfaces."),
    ).toBeInTheDocument();
    expect(screen.getByText("Huge ecosystem")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open react official website/i }),
    ).toHaveAttribute("href", "https://react.dev");

    fireEvent.click(screen.getByRole("button", { name: /back to picker/i }));
    expect(
      screen.getByRole("heading", { name: /tech stack picker/i }),
    ).toHaveFocus();
    expect(screen.getByRole("button", { name: /^React$/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("updates the stack immediately, supports replacement, search, and reset", () => {
    render(<App />);
    const react = screen.getByRole("button", { name: /^React$/i });
    const next = screen.getByRole("button", { name: /Next\.js$/i });

    fireEvent.click(react);
    expect(react).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByText("React").length).toBeGreaterThan(1);
    expect(
      screen.getByRole("link", { name: /open react official website/i }),
    ).toHaveAttribute("href", "https://react.dev");
    expect(
      screen.getByRole("link", { name: /open react official website/i }),
    ).toHaveAttribute("target", "_blank");

    fireEvent.click(next);
    expect(react).toHaveAttribute("aria-pressed", "false");
    expect(next).toHaveAttribute("aria-pressed", "true");

    fireEvent.change(
      screen.getByRole("textbox", { name: /search technologies/i }),
      { target: { value: "serverless" } },
    );
    expect(screen.getByText("AWS Lambda")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /clear stack/i }));
    expect(screen.getByText(/Nothing selected yet/i)).toBeInTheDocument();
  });
});
