import type {MedevacRequest} from "../components/MedevacRequest";
const apiBaseURL = "http://localhost:8080/";
type requestPromise = (request: MedevacRequest) =>Promise<MedevacRequest>;
type requestList = () => Promise<MedevacRequest[]>
type statusPromise = (id:Number, status:String) => Promise<any>
export const saveRequest: requestPromise = (request) =>
{
    return fetch(apiBaseURL + "api/requests",
        {
            method: 'POST',
            headers:
                {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(request
            )
        }).then((response) =>
    {
        return response.json();

    })
};
export const fetchRequest: requestList = async ():Promise<MedevacRequest[]> =>
{
    return fetch(apiBaseURL + "api/requests",
        {
            method:
                'GET'
        }).then((response)=>{
        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }

        return response.json();

    })
}

export const saveStatus:statusPromise = async (id: Number, status: String) => {
    const response = await fetch(`${apiBaseURL}api/requests/${id}/status`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saveStatus(id, status))
        });
    return await response.json();
};