import { getPage } from '../utils/helpers.js';

const courseGoals = [];
const indexPage = getPage('task02', 'index.html');

function renderGoal({goal, id}) {
  return `<li>
    <span>${goal}</span>
    <button 
      hx-delete="/goals/${id}" 
      hx-target="closest li"
      hx-confirm="Are you sure?"
      hx-disabled-elt="this"
    >
      Remove
    </button>
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
        setTimeout(() => 
          res.send(renderGoal({goal, id})), 
        1000);
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
      setTimeout(() => res.send(), 1000);
    }
  }
];

export default {
  get: GET,
  post: POST,
  delete: DELETE
}