import { HTMX_KNOWLEDGE } from "./data.js";
import { getPage } from "../utils/helpers.js";

const indexPage = getPage('task00', 'index.html');

const ROUTES = {
    get: [
        {
            path: '/',
            handler: (req, res) => res.send(indexPage)
        },
        {
            path: '/info',
            handler: (req, res) => res.send(`<ul>${HTMX_KNOWLEDGE.map(item => `<li>${item}</li>`).join('')}</ul>`)
        }
    ],
    post: [],
    delete: []
};

export default ROUTES;