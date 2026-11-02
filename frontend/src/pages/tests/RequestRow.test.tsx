import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import RequestRow from "../../components/RequestRow.tsx";
import {beforeEach, expect} from "vitest";


describe ("RequestRow", () => {
    const mockRequest = {
        id: 1,
        location: "32U CD 1234567890",
        radioFreq: "re7890",
        patientNumber: 3,
        patientPrecedence: "Urgent",
        specialEquipment: "None: true",
        patientLitter: 1,
        patientAmbulatory: 2,
        siteSecurity: "Enemy Troops In Area: true",
        siteMarking: "Panel: true",
        patientNationalityStatus: "US Military: True",
        terrainDescription: "NBC: true",
    };
    let jst;
    // @ts-ignore
    const mockparseJSONField = jst.fn((value: string) => {
    if (value === mockRequest.specialEquipment) return "Hoist";
    return value;
});
    const renderComponent = () =>
        render(
            <table>
                <tbody>
                <RequestRow request={mockRequest} parseJSONField={mockparseJSONField} />
                </tbody>
            </table>
        );

    beforeEach(() => {
        mockparseJSONField.mockClear();
    });
test("renders the request information", () => {
    renderComponent();

    expect(screen.getByText("URGENT")).toBeInTheDocument();
    expect(screen.getByText(mockRequest.location)).toBeInTheDocument();
    expect(screen.getAllByText("40.500")).toBeInTheDocument();
    expect(screen.getAllByText("SECURE")).toBeInTheDocument();
    expect(screen.getAllByText("Hoist")).toBeInTheDocument();
    expect(screen.getAllByText("Logged")).toBeInTheDocument();
});})
