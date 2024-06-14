import { getIndexPage } from '../utils/helpers';

const courseGoals = [];
const indexPage = getIndexPage('task02');

function renderGoalList() {
    return `<ul id="goals">
          ${courseGoals.map(
            (goal, index) => `
            <li id="goal-${index}">
              <span>${goal}</span>
              <button>Remove</button>
            </li>
          `
          )}
    </ul>`
}

export const GET = [
    {
        path: '/',
        handler: (req, res) => {
            const index = indexPage.replace('%%GOAL_LIST%%', renderGoalList());
            res.send(index);
        }
    }
];

export const POST = [];