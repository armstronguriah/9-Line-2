import Requester from "../Requester.tsx";
import {render, screen} from '@testing-library/react'
import {expect, describe, it} from "vitest";


describe('Requester', () => {

    it('should render correctly', () => {
        render(<Requester/>)
        expect(screen.getByRole("heading", {name: "Requester Page"})).toBeVisible

        expect(screen.getByRole("textbox", {name: "Location"})).toBeVisible()
    });



})