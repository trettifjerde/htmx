import { renderIndexPage, renderProductPage } from "./renderers.js";
import PRODUCTS from './products.js';

const GET = [
    {
        path: '/',
        handler: (req, res) => res.send(renderIndexPage())
    },
    {
        path: '/products/:id', 
        handler: (req, res) => {
            const id = req.params.id;

            if (id) {
                const product = PRODUCTS.find(p => p.id === id);

                if (product) 
                    return res.send(renderProductPage(product));
            }

            // res.setHeader('HX-Redirect', '/');
            // res.send();

            res.redirect('/');
        }
    }
];

const POST = [
    {
        path: '/cart',
        handler: (req, res) => {
            // form handling
            res.redirect('/');
        }
    }
];

const DELETE = [];

export default {
    get: GET,
    post: POST,
    delete: DELETE
}