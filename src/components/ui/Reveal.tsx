import { type ReactNode, createElement } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className: `reveal ${isVisible ? 'is-visible' : ''} ${className}`,
      style: { transitionDelay: `${delay}ms` },
    },
    children
  );
}
