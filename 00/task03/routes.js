import { getIndexPage } from "../utils/helpers.js"
import { AVAILABLE_LOCATIONS } from "./data.js";
import { renderLocation, renderLocations } from "./renderers.js";

const indexPage = getIndexPage('task03');

const INTERESTING_LOCATIONS = [];

export function getSuggestedLocations() {
    const availableLocations = AVAILABLE_LOCATIONS.filter(
      (location) => !INTERESTING_LOCATIONS.includes(location)
    );
  
    if (availableLocations.length < 2) return availableLocations;
  
    const suggestedLocation1 = availableLocations.splice(
      Math.floor(Math.random() * availableLocations.length),
      1
    )[0];
    const suggestedLocation2 = availableLocations.splice(
      Math.floor(Math.random() * availableLocations.length),
      1
    )[0];
  
    return [suggestedLocation1, suggestedLocation2];
  }

const GET = [
    {
        path: '/',
        handler: (req, res) => {
            const available = AVAILABLE_LOCATIONS.filter(loc => !INTERESTING_LOCATIONS.includes(loc));
            const index = indexPage
                .replace('%%SUGGESTED_LOCATIONS%%', renderLocations(getSuggestedLocations(), 's'))
                .replace('%%INTERESTING_LOCATIONS%%', renderLocations(INTERESTING_LOCATIONS, 'i'))
                .replace('%%AVAILABLE_LOCATIONS%%', renderLocations(available));

            res.send(index);
        },
    },
    {
        path: '/suggestions',
        handler: (req, res) => {
            const suggestions = renderLocations(getSuggestedLocations(), 's');
            res.send(suggestions)
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

            res.send(`
                ${renderLocation(location, 'i')}
                <ul hx-swap-oob="true" id="suggested-locations" class="locations">
                    ${renderLocations(getSuggestedLocations(), 's')}
                </ul>
            `);
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

        res.send(renderLocation(location));
    }
}];

export default {
    get: GET,
    post: POST,
    delete: DELETE
}