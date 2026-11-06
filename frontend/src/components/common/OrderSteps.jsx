const STEPS = [
  ['Explore', 'Browse the products.', 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4-4', '#F29F05'],
  ['Select', 'Choose products and required quantities.', 'M5 12l5 5 9-10', '#3E9B4F'],
  ['Enquire', 'Send an enquiry through WhatsApp.', 'M4 5h16v11H9l-5 4V5Z', '#2B8FD6'],
  ['Confirm', 'Availability, price, delivery and order details are confirmed with Arusuvai.', 'M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Zm-3 9 2.5 2.5L15 10', '#D1458B'],
];

// "Explore → Select → Enquire → Confirm"
export default function OrderSteps() {
  return (
    <ol className="hto">
      {STEPS.map(([title, text, path, color], i) => (
        <li key={title} className="rv" style={{ '--d': `${i * 0.12}s`, '--k': color }}>
          <span className="hn2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d={path} />
            </svg>
            <em>0{i + 1}</em>
          </span>
          <b>{title}</b>
          <p>{text}</p>
        </li>
      ))}
    </ol>
  );
}
