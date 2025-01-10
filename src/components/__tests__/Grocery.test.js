import { render,screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import Grocery from "../Grocery";

test("should load grocery component",()=>{

    render(<Grocery/>)

    const heading= screen.getAllByRole("heading");


    //Assertion
    expect(heading).toHaveLength(4)
})