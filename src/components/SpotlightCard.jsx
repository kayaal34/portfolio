import { useRef } from 'react';

/**
 * Lightweight card that moves a CSS radial "spotlight" with the pointer.
 * Used where a full 3D tilt would be too heavy (dense grids, list rows).
 */
export function SpotlightCard({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    node.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      className={`spotlight ring-gradient relative isolate overflow-hidden ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
