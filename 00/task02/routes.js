import { getIndexPage } from '../utils/helpers.js';

const courseGoals = [];
const indexPage = getIndexPage('task02');

function renderGoal({goal, id}) {
  return `<li>
    <span>${goal}</span>
    <button hx-delete="/goals/${id}" hx-target="closest li">Remove</button>
  </li>`
}

function renderGoalList() {
  return courseGoals
    .map(goal => renderGoal(goal))
    .join('')
}

const GET = [
  {
    path: '/',
    handler: (req, res) => {
      const index = indexPage.replace('%%GOAL_LIST%%', renderGoalList());
      res.send(index);
    }
  }
];

const POST = [
  {
    path: '/goals',
    handler: (req, res) => {
      const goal = req.body.goal;

      if (goal) {
        const id = new Date().getTime().toString();
        courseGoals.push({goal, id});
        res.send(renderGoal({goal, id}));
      }
      else
        res.send('');
    }
  }
];

const DELETE = [
  {
    path: '/goals/:id',
    handler: (req, res) => {
      const id = req.params.id;
      const i = courseGoals.findIndex(goal => goal.id === id);
      courseGoals.splice(i, 1);
      res.send();
    }
  }
];

export default {
  get: GET,
  post: POST,
  delete: DELETE
}