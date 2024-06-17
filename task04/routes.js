import { getPage } from "../utils/helpers.js";

const indexPage = getPage('task04', 'index.html');
const authPage = getPage('task04', 'authenticated.html');

const GET = [
    {
        path: '/',
        handler: (req, res) => res.send(indexPage)
    },
    {
        path: '/authenticated',
        handler: (req, res) => res.send(authPage)
    }
];

const POST = [
    {
        path: '/validate',
        handler: (req, res) => {
            
            if ('email' in req.body && !req.body.email.includes('@')) {
                return res.send(`
                E-Mail address is invalid.
              `);
            }
            else if ('email' in req.body && req.body.email.includes('@')) {
                return res.send();
            }
            else if ('password' in req.body && req.body.password.trim().length < 8) {
                return res.send(`
                Password must be at least 8 characters long.
              `);
            }
            else if ('password' in req.body && req.body.password.trim().length >= 8) {
                return res.send();
            }
            res.send();
        }
    },
    {
        path: '/login',
        handler: (req, res) => {
            const email = req.body.email;
            const password = req.body.password;

            let errors = {};

            if (!email || !email.includes('@')) {
                errors.email = 'Please enter a valid email address.';
            }

            if (!password || password.trim().length < 8) {
                errors.password = 'Password must be at least 8 characters long.';
            }

            const errorKeys = Object.keys(errors);

            if (errorKeys.length > 0) {
                return res.send(`
                  <ul id="form-errors">
                    ${errorKeys
                        .map((key) => `<li>${errors[key]}</li>`)
                        .join('')}
                  </ul>
              `);
            }

            if (Math.random() > 0.5) {
                res.setHeader('HX-Retarget', '.control');
                res.setHeader('HX-Reswap', 'beforebegin');
                return res.send('<p class="error">An server error has occurred</p>')
            }
            
            res.setHeader('HX-Redirect', '/authenticated')
            res.send();
        }
    }
];

const DELETE = [];

export default {
    get: GET,
    post: POST,
    delete: DELETE
}