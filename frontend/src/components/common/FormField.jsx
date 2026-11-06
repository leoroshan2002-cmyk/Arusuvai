// One labelled form control with an inline error message. `index` staggers the entrance animation.
export default function FormField({ id, label, as = 'input', full = false, error, index = 0, options = [], ...props }) {
  const common = { id, name: id, 'aria-invalid': !!error, ...props };
  let control;
  if (as === 'textarea') control = <textarea {...common} />;
  else if (as === 'select')
    control = (
      <select {...common}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    );
  else control = <input {...common} />;

  return (
    <div
      className={full ? 'full' : ''}
      style={{ '--x': index % 2 ? '36px' : '-36px', animation: `fin .7s ${0.2 + index * 0.07}s cubic-bezier(.2,.7,.2,1) both` }}
    >
      <label htmlFor={id}>{label}</label>
      {control}
      <div className="err" id={`e-${id}`}>
        {error}
      </div>
    </div>
  );
}
