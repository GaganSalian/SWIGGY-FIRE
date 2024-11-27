import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Body from "../Body"; 
import "@testing-library/jest-dom"; 
import { BrowserRouter as Router } from "react-router-dom"; 

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

jest.mock("../../utils/useOnlineStatus", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Body Component", () => {
  beforeEach(() => {
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

    await waitFor(() => screen.getByText("Restaurant A"));
    expect(screen.getByText("Restaurant A")).toBeInTheDocument();
    expect(screen.getByText("Restaurant B")).toBeInTheDocument();
  });

  test("Should show offline message when user is offline", async () => {
    useOnlineStatus.mockReturnValue(false); 

    render(
      <Router>
        <Body />
      </Router>
    );

    expect(screen.getByText("looks like u r offline")).toBeInTheDocument();
  });

  test("Should filter restaurants based on search input", async () => {
    render(
      <Router>
        <Body />
      </Router>
    );

    await waitFor(() => screen.getByText("Restaurant A"));

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Restaurant A" } });

    const searchButton = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(searchButton);

    expect(screen.getByText("Restaurant A")).toBeInTheDocument();
    expect(screen.queryByText("Restaurant B")).toBeNull();
  });

  test("Should filter top-rated restaurants when filter button is clicked", async () => {
    render(
      <Router>
        <Body />
      </Router>
    );

    await waitFor(() => screen.getByText("Restaurant A"));

    const filterButton = screen.getByRole("button", { name: /Top Rated Restaurant/i });
    fireEvent.click(filterButton);

    expect(screen.getByText("Restaurant A")).toBeInTheDocument();
    expect(screen.queryByText("Restaurant B")).toBeNull();
  });

  test("Should show shimmer effect when restaurants are loading", () => {
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

    expect(screen.getByTestId("shimmer")).toBeInTheDocument(); 
  });
});
