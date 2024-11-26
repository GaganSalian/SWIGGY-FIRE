import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Body from "../Body"; // Import the Body component
import "@testing-library/jest-dom"; // For toBeInTheDocument matcher
import { BrowserRouter as Router } from "react-router-dom"; // For wrapping with Router

// Mock the fetch function to return fake data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          cards: [
            {
              card: {
                card: {
                  gridElements: {
                    infoWithStyle: {
                      restaurants: [
                        {
                          info: {
                            id: "1",
                            name: "Restaurant A",
                            avgRating: 4.7,
                          },
                        },
                        {
                          info: {
                            id: "2",
                            name: "Restaurant B",
                            avgRating: 4.4,
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          ],
        },
      }),
  })
);

// Mock the useOnlineStatus hook
jest.mock("../../utils/useOnlineStatus", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Body Component", () => {
  beforeEach(() => {
    // Default to "online" status
    useOnlineStatus.mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render Body component and display restaurants", async () => {
    render(
      <Router>
        <Body />
      </Router>
    );

    // Wait for the data to load and check if the restaurants are displayed
    await waitFor(() => screen.getByText("Restaurant A"));
    expect(screen.getByText("Restaurant A")).toBeInTheDocument();
    expect(screen.getByText("Restaurant B")).toBeInTheDocument();
  });

  test("Should show offline message when user is offline", async () => {
    useOnlineStatus.mockReturnValue(false); // Mocking the status to be offline

    render(
      <Router>
        <Body />
      </Router>
    );

    // Check if the offline message is displayed
    expect(screen.getByText("looks like u r offline")).toBeInTheDocument();
  });

  test("Should filter restaurants based on search input", async () => {
    render(
      <Router>
        <Body />
      </Router>
    );

    // Wait for the data to load
    await waitFor(() => screen.getByText("Restaurant A"));

    // Type in the search box
    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Restaurant A" } });

    // Simulate the search button click
    const searchButton = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(searchButton);

    // Check that only "Restaurant A" is displayed after search
    expect(screen.getByText("Restaurant A")).toBeInTheDocument();
    expect(screen.queryByText("Restaurant B")).toBeNull();
  });

  test("Should filter top-rated restaurants when filter button is clicked", async () => {
    render(
      <Router>
        <Body />
      </Router>
    );

    // Wait for the data to load
    await waitFor(() => screen.getByText("Restaurant A"));

    // Click the "Top Rated Restaurant" filter button
    const filterButton = screen.getByRole("button", { name: /Top Rated Restaurant/i });
    fireEvent.click(filterButton);

    // Check that only "Restaurant A" (rating > 4.5) is displayed
    expect(screen.getByText("Restaurant A")).toBeInTheDocument();
    expect(screen.queryByText("Restaurant B")).toBeNull();
  });

  test("Should show shimmer effect when restaurants are loading", () => {
    // Mock fetch to return empty restaurants (simulate loading state)
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          data: {
            cards: [
              {
                card: {
                  card: {
                    gridElements: {
                      infoWithStyle: {
                        restaurants: [],
                      },
                    },
                  },
                },
              },
            ],
          },
        }),
    });

    render(
      <Router>
        <Body />
      </Router>
    );

    // Check if the shimmer effect is visible while loading
    expect(screen.getByTestId("shimmer")).toBeInTheDocument(); // Assuming your shimmer component has a testId="shimmer"
  });
});
