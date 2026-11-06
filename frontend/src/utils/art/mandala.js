// Kolam-style mandala outline, drawn with currentColor.
export const mandalaHtml = () => {
  let petals = '';
  for (let i = 0; i < 12; i++) petals += `<ellipse cx="100" cy="46" rx="11" ry="34" transform="rotate(${i * 30} 100 100)"/>`;
  let dots = '';
  for (let i = 0; i < 24; i++) dots += `<circle cx="100" cy="12" r="3.2" transform="rotate(${i * 15} 100 100)"/>`;
  return `<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="1.6">${petals}${dots}<circle cx="100" cy="100" r="20"/><circle cx="100" cy="100" r="92" stroke-dasharray="3 6"/></svg>`;
};
