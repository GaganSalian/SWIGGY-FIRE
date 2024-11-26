import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "../Contact";  // Importing the Contact component
import "@testing-library/jest-dom";  // For the toBeInTheDocument matcher

// Test to ensure that the Contact component renders correctly
test("Should load Contact Us component", async () => {
  render(<Contact />);  // Render the Contact component

  // Wait for the heading to appear (look for an h1 element specifically)
  const heading = await screen.findByRole("heading", { level: 1 });  // Looking for an <h1> heading specifically

  // Ensure the heading is in the document
  expect(heading).toBeInTheDocument();  // Check if it is in the document
});

// Test to ensure the button renders correctly
test("Should render Submit button", async () => {
  render(<Contact />);  // Render the Contact component

  // Wait for the button to appear
  const button = screen.getByRole('button', { name: /submit/i });  // Searching for the button with text "Submit" (case-insensitive)

  // Ensure the button is in the document
  expect(button).toBeInTheDocument();  // Check if the button is in the document
});

// Test to ensure the input fields can accept text
test("Should allow user to type in input fields", () => {
  render(<Contact />);

  // Get input fields
  const nameInput = screen.getByLabelText(/Your Name/i);
  const emailInput = screen.getByLabelText(/Your Email/i);
  const messageInput = screen.getByLabelText(/Your Message/i);

  // Simulate typing into the fields
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(messageInput, { target: { value: 'Hello, I need help!' } });

  // Check if the values are updated in the input fields
  expect(nameInput.value).toBe('John Doe');
  expect(emailInput.value).toBe('john@example.com');
  expect(messageInput.value).toBe('Hello, I need help!');
});

// Test to ensure the form submission works correctly
test("Should handle form submission", () => {
  render(<Contact />);

  // Get input fields and button
  const nameInput = screen.getByLabelText(/Your Name/i);
  const emailInput = screen.getByLabelText(/Your Email/i);
  const messageInput = screen.getByLabelText(/Your Message/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // Mocking console.log to test form submission
  console.log = jest.fn();

  // Simulate typing into the fields
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(messageInput, { target: { value: 'Hello, I need help!' } });

  // Simulate form submission
  fireEvent.click(submitButton);

  // Check if the form submission logs the correct output
  expect(console.log).toHaveBeenCalledWith('Form submitted:', {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, I need help!',
  });
});
