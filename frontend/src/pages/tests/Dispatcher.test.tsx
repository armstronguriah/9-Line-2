import {render, screen} from '@testing-library/react'
import Dispatcher from "../Dispatcher";
import {expect, describe, it} from "vitest";


describe('Dispatcher', () => {

    it('should render correctly', async () => {
        render(<Dispatcher/>)
        expect(await screen.findByRole("heading", {name: "Dispatcher Operations Dashboard"})).toBeInTheDocument();

    });
})