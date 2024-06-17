export function renderLocation(location, type = 'a') {

  let atts;

  switch (type) {
    case 'a':
      atts = `
        hx-post="/places" 
        hx-vals='{"locationId": "${location.id}"}'
        hx-disabled-elt="this"
        hx-target="#interesting-locations"
        hx-swap="beforeend show:#interesting-section:top"
        hx-on::after-request="event.detail.elt.parentElement.remove()"
        data-action="add"`
      break;

    case 'i':
      atts = `
        hx-delete="/places/${location.id}" 
        hx-disabled-elt="this"
        hx-target="#available-locations"
        hx-swap="afterbegin"
        hx-on::after-request="event.detail.elt.parentElement.remove()"
        data-action="remove"`
      break;

    default: 
      atts = `
        hx-post="/places" 
        hx-vals='{"locationId": "${location.id}"}'
        hx-disabled-elt="this"
        hx-target="#interesting-locations"
        hx-swap="beforeend show:#interesting-section:bottom"
        hx-on::before-request="removeAv('${location.id}')"
        data-action="add"`
  }

  return `
      <li class="location-item" id="${type}-${location.id}">
        <button ${atts}>
          <img src="${`/task03/images/${location.image.src}`}" alt="${location.image.alt}" />
          <h3>${location.title}</h3>
        </button>
      </li>
    `;
}

export function renderLocations(locations, type = 'a') {
  return locations.map(location => renderLocation(location, type)).join('');
}