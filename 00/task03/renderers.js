export function renderAvailableLocation(location) {
  return `
      <li class="location-item">
        <button 
          hx-post="/places" 
          hx-vals='{"locationId": "${location.id}"}'
          hx-disabled-elt="this"
          hx-target="#interesting-locations"
          hx-swap="beforeend show:#interesting-section:top"
          hx-on::after-request="event.detail.elt.parentElement.remove()">
          <img src="${`/task03/images/${location.image.src}`}" alt="${location.image.alt}" />
          <h3>${location.title}</h3>
        </button>
      </li>
    `;
}

export function renderInterestingLocation(location) {
  return `
  <li class="location-item">
    <button 
      hx-delete="/places/${location.id}" 
      hx-disabled-elt="this"
      hx-target="#available-locations"
      hx-swap="afterbegin"
      hx-on::after-request="event.detail.elt.parentElement.remove()">
      <img src="${`/task03/images/${location.image.src}`}" alt="${location.image.alt}" />
      <h3>${location.title}</h3>
    </button>
  </li>
`;
}

export function renderLocations(locations, isAvailable = true) {

  const fn = isAvailable ? renderAvailableLocation : renderInterestingLocation;
  return locations.map(location => fn(location)).join('');
}