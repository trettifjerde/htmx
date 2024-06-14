import { HTMX_KNOWLEDGE } from "../data/htmx-info.js";
import { getIndexPage } from "../utils/helpers.js";

const indexPage = getIndexPage('task01');

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
                console.log(req.body);
                if (data.note)
                    HTMX_KNOWLEDGE.unshift(data.note);

                res.send(renderList());
            }
        }
    ],
    delete: []
};

export default ROUTES;