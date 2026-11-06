import Dispatcher from "../Dispatcher.tsx";
import {render, screen} from '@testing-library/react'
//import {expect, describe, it} from "vitest";


describe('Requester', () => {

    it('should render correctly', () => {
        render(<Dispatcher/>)
        expect(screen.getByRole("heading", {name: "Dispatcher Operations Dashboard"})).toBeVisible();

        // expect(screen.getByRole("table", {name: "dispatch-table"})).toBeVisible()
    });



})