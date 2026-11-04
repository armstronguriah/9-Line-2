import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import RequestRow from "../../components/RequestRow.tsx";
import {describe, expect, it} from "vitest";
import {userEvent} from "@testing-library/user-event/dist/cjs/setup/index.js";
import type {MedevacRequest} from "../../components/MedevacRequest.ts";

describe ('RequestRow', () => {
    it('should check the checkbox when clicked', async () => {
    const user = userEvent.setup();
    render  (<RequestRow request={{
        id: 0,
        location: "",
        radioFreq: "",
        patientNumber: 0,
        patientPrecedence: "",
        specialEquipment: "",
        patientLitter: 0,
        patientAmbulatory: 0,
        siteSecurity: "",
        siteMarking: "",
        patientNationalityStatus: "",
        terrainDescription: "",
        status: "Pending"
    }} parseJSONField={(val: string) => val}
        
    />);

        const expandToggle = screen.getByRole('row',{name:'expand'});
        await user.click(expandToggle);
        const checkbox = screen.getByRole('checkbox', {name: /checkbox/i});
        expect(screen.getByRole("checkbox",{checked:false})).not.toBeChecked();
        await user.click(checkbox);
        expect(checkbox).toBeChecked();

    });
    it('should show status as pending', async () => {
        const user = userEvent.setup();
        const request: MedevacRequest = {
            id: 0,
            location: "ASD",
            radioFreq: "123",
            patientNumber: 0,
            patientPrecedence: "ASD",
            specialEquipment: "ASD",
            patientLitter: 0,
            patientAmbulatory: 0,
            siteSecurity: "ASD",
            siteMarking: "",
            patientNationalityStatus: "",
            terrainDescription: "",
            status: "Pending"}
        render  (<RequestRow request={request}

        />);

        const expandToggle = screen.getByRole('row',{name:'expand'});
        await user.click(expandToggle);
        screen.logTestingPlaygroundURL()
        expect(screen.getByText("Status: Pending")).toBeVisible();

    });
});



// it('should allow user to change status', () => {})