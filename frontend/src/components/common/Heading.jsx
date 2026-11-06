import { Children, cloneElement, isValidElement } from 'react';

// Headline that reveals word-by-word when scrolled into view (the .sp / .w CSS does the animation).
// Works with nested <em>:  <Heading>Rooted in Tradition. <em>Chosen with Care.</em></Heading>
const textOf = (node) =>
  Children.toArray(node)
    .map((c) => (typeof c === 'string' ? c : isValidElement(c) ? textOf(c.props.children) : ''))
    .join('');

function splitWords(children, counter) {
  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child
        .split(/(\s+)/)
        .filter(Boolean)
        .map((t, k) =>
          /^\s+$/.test(t) ? (
            ' '
          ) : (
            <span key={k} className="w" aria-hidden="true">
              <span style={{ transitionDelay: `${counter.i++ * 0.07}s` }}>{t}</span>
            </span>
          )
        );
    }
    if (isValidElement(child) && child.type !== 'br') {
      return cloneElement(child, {}, splitWords(child.props.children, counter));
    }
    return child;
  });
}

export default function Heading({ as: Tag = 'h2', className = '', children, ...props }) {
  return (
    <Tag className={`${className} sp`.trim()} aria-label={textOf(children).trim()} {...props}>
      {splitWords(children, { i: 0 })}
    </Tag>
  );
}
