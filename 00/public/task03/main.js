function removeAv(id) {
  document.getElementById(`a-${id}`).remove();
}

function showConfirmation(e) {

  if (e.detail.path === '/suggestions')
    return;

  e.preventDefault();

  const action = e.detail.elt.dataset.action;

  const modal = `<dialog class="modal">
    <div id="confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to ${action} this place?</p>
      <div id="confirmation-actions">
        <button id="action-no" className="button-text">
          No
        </button>
        <button id="action-yes" className="button">
          Yes
        </button>
      </div>
    </div>
  </dialog>`;

  document.body.insertAdjacentHTML('beforeend', modal);
  const dialog = document.querySelector('dialog');
  document.getElementById('action-no').addEventListener('click', function () {
    dialog.remove();
  });
  document.getElementById('action-yes').addEventListener('click', function () {
    e.detail.issueRequest();
    dialog.remove();
  });
  dialog.showModal();
}

function hideConfirmation(e) {
  e.currentTarget.closest('dialog').remove();
}

document.addEventListener('htmx:confirm', showConfirmation)