import type {MedevacRequest} from "../components/MedevacRequest";
const apiBaseURL = "http://localhost:8080/";
type requestPromise = (request: MedevacRequest) =>Promise<MedevacRequest>;
type requestList = () => Promise<MedevacRequest[]>
export const saveRequest: requestPromise = (request: MedevacRequest) =>
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
        }).then((response)=>
    {
        return response.json();

    })
}