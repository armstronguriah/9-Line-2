import {render, screen} from '@testing-library/react'
import Dispatcher from "../Dispatcher";
import {expect, describe, it} from "vitest";
import {userEvent} from "@testing-library/user-event/dist/cjs/setup/index.js";
import type {MedevacRequest} from "../../components/MedevacRequest.ts";


describe('Dispatcher', () => {

    beforeEach(() => {
        // Clear any previous mock implementations or history before each test
        vi.restoreAllMocks();
    });

    const user = userEvent.setup();

    it('should render correctly', async () => {
        render(<Dispatcher/>)
        expect(await screen.findByRole("heading", {name: "Dispatcher Operations Dashboard"})).toBeInTheDocument();

    });

    it('should display a model with all nine-line details when view link is clicked', async () => {


        const medevacRequests: MedevacRequest[] = [
            {
                id: 1,
                location: "Grid 32U CU 4567 8901",
                radioFreq: "34.50 MHz (AN/PRC-117F)",
                patientNumber: 2,
                patientPrecedence: "Urgent",
                specialEquipment: "Hoist, Oxygen",
                patientLitter: 1,
                patientAmbulatory: 1,
                siteSecurity: "Secure / Possible enemy in area",
                siteMarking: "Smoke (Green)",
                patientNationalityStatus: "US Military",
                terrainDescription: "Open field bordered by dense treeline",
                status: "En Route"
            },
            {
                id: 2,
                location: "LZ Sparrow (34.0522° N, 118.2437° W)",
                radioFreq: "121.50 MHz",
                patientNumber: 1,
                patientPrecedence: "Priority",
                specialEquipment: "None",
                patientLitter: "",
                patientAmbulatory: 1,
                siteSecurity: "No enemy contact reported",
                siteMarking: "Signal Mirror",
                patientNationalityStatus: "Civilian Contractor",
                terrainDescription: "Rocky ridge, slope steep on North side",
                status: "Pending"
            }
        ];

        const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: async () => medevacRequests,
        } as Response);



        render(<Dispatcher/>)

        expect(screen.getByText("Dispatcher Operations Dashboard")).toBeInTheDocument();

        expect(await screen.findByText('Total Active Requests: 2')).toBeInTheDocument();

        expect(fetchMock).toHaveBeenCalledWith("http://localhost:8080/api/requests");

        const view = screen.getByRole('cell', {name: /view-1/i})
        await user.click(view)

        expect(screen.getByRole('heading', {name: /MEDEVAC REQUEST/i})).toBeInTheDocument();

        screen.logTestingPlaygroundURL();

    })

    it('should display a model with all nine-line details when view link is clicked, and special equipment and markings only show truthy values', async () => {


        const medevacRequests: MedevacRequest[] = [
            {
                id: 1,
                location: "Grid 32U CU 4567 8901",
                radioFreq: "34.50 MHz (AN/PRC-117F)",
                patientNumber: 2,
                patientPrecedence: "Urgent",
                specialEquipment: "{\"none\":false,\"hoist\":true,\"extractionEquipment\":false,\"ventilator\":false}",
                patientLitter: 1,
                patientAmbulatory: 1,
                siteSecurity: "Secure / Possible enemy in area",
                siteMarking: "{\"panels\":false,\"pyrotechnicSignal\":true,\"smokeSignal\":true,\"none\":false,\"other\":false}",
                patientNationalityStatus: "US Military",
                terrainDescription: "Open field bordered by dense treeline",
                status: "En Route"
            },
            {
                id: 2,
                location: "LZ Sparrow (34.0522° N, 118.2437° W)",
                radioFreq: "121.50 MHz",
                patientNumber: 1,
                patientPrecedence: "Priority",
                specialEquipment:  "{\"none\":false,\"hoist\":true,\"extractionEquipment\":false,\"ventilator\":false}",
                patientLitter: "",
                patientAmbulatory: 1,
                siteSecurity: "No enemy contact reported",
                siteMarking: "{\"panels\":false,\"pyrotechnicSignal\":true,\"smokeSignal\":true,\"none\":false,\"other\":false}",
                patientNationalityStatus: "Civilian Contractor",
                terrainDescription: "Rocky ridge, slope steep on North side",
                status: "Pending"
            }
        ];

        const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: async () => medevacRequests,
        } as Response);



        render(<Dispatcher/>)

        expect(screen.getByText("Dispatcher Operations Dashboard")).toBeInTheDocument();

        expect(await screen.findByText('Total Active Requests: 2')).toBeInTheDocument();

        expect(fetchMock).toHaveBeenCalledWith("http://localhost:8080/api/requests");

        const view = screen.getByRole('cell', {name: /view-1/i})
        await user.click(view)

        expect(screen.getByRole('heading', {name: /MEDEVAC REQUEST/i})).toBeInTheDocument();

        screen.logTestingPlaygroundURL();

       //expect(screen.getByText('hoist')).toBeInTheDocument();


        expect(screen.queryByText(/.*ventilator.*/i)).not.toBeInTheDocument();

        screen.logTestingPlaygroundURL();

    })

})