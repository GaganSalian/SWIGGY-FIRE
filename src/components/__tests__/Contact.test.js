import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "../Contact";  
import "@testing-library/jest-dom";  

test("Should load Contact Us component", async () => {
  render(<Contact />);  

  const heading = await screen.findByRole("heading", { level: 1 }); 

  expect(heading).toBeInTheDocument(); 
});

test("Should render Submit button", async () => {
  render(<Contact />); 

  const button = screen.getByRole('button', { name: /submit/i });  

  expect(button).toBeInTheDocument();  
});

test("Should allow user to type in input fields", () => {
  render(<Contact />);

  const nameInput = screen.getByLabelText(/Your Name/i);
  const emailInput = screen.getByLabelText(/Your Email/i);
  const messageInput = screen.getByLabelText(/Your Message/i);

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(messageInput, { target: { value: 'Hello, I need help!' } });

  expect(nameInput.value).toBe('John Doe');
  expect(emailInput.value).toBe('john@example.com');
  expect(messageInput.value).toBe('Hello, I need help!');
});

test("Should handle form submission", () => {
  render(<Contact />);

  const nameInput = screen.getByLabelText(/Your Name/i);
  const emailInput = screen.getByLabelText(/Your Email/i);
  const messageInput = screen.getByLabelText(/Your Message/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  console.log = jest.fn();

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(messageInput, { target: { value: 'Hello, I need help!' } });

  fireEvent.click(submitButton);

  expect(console.log).toHaveBeenCalledWith('Form submitted:', {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, I need help!',
  });
});
