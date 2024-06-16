import { getIndexPage } from "../utils/helpers.js"
import { AVAILABLE_LOCATIONS } from "./data.js";
import { renderAvailableLocation, renderInterestingLocation, renderLocations } from "./renderers.js";

const indexPage = getIndexPage('task03');

const INTERESTING_LOCATIONS = [];

const GET = [
    {
        path: '/',
        handler: (req, res) => {
            const available = AVAILABLE_LOCATIONS.filter(loc => !INTERESTING_LOCATIONS.includes(loc));
            const index = indexPage
                .replace('%%INTERESTING_LOCATIONS%%', renderLocations(INTERESTING_LOCATIONS, false))
                .replace('%%AVAILABLE_LOCATIONS%%', renderLocations(available));

            res.send(index);
        }
    }
];
const POST = [
    {
        path: '/places',
        handler: (req, res) => {
            const locationId = req.body.locationId;
            const location = AVAILABLE_LOCATIONS.find((loc) => loc.id === locationId);

            INTERESTING_LOCATIONS.push(location);

            res.send(renderInterestingLocation(location));
        }
    }
];
const DELETE = [{
    path: '/places/:id',
    handler: (req, res) => {
        const locationId = req.params.id;
        const locationIndex = INTERESTING_LOCATIONS.findIndex(
            (loc) => loc.id === locationId
        );
        const [location] = INTERESTING_LOCATIONS.splice(locationIndex, 1);

        res.send(renderAvailableLocation(location));
    }
}];

export default {
    get: GET,
    post: POST,
    delete: DELETE
}