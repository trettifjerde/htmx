import { HTMX_KNOWLEDGE } from "./data.js";
import { getPage } from "../utils/helpers.js";

const indexPage = getPage('task01', 'index.html');

function renderIndex() {
    return indexPage.replace('%%LIST%%', renderList())
}

function renderList() {
    return HTMX_KNOWLEDGE.map(item => `<li>${item}</li>`).join('');
}

const ROUTES = {
    get: [{
        path: '/',
        handler: (req, res) => res.send(renderIndex())
    }],
    post: [
        {
            path: '/note',
            handler: (req, res) => {
                const data = req.body;
                if (data.note)
                    HTMX_KNOWLEDGE.unshift(data.note);

                res.send(renderList());
            }
        }
    ],
    delete: []
};

export default ROUTES;