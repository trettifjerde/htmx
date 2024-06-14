import { HTMX_KNOWLEDGE } from "../data/htmx-info.js";
import { getIndexPage } from "../utils/helpers.js";

const indexPage = getIndexPage('task00');

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
    post: []
};

export default ROUTES;