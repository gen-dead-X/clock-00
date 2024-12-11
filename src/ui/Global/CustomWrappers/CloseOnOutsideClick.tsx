import { useCallback, useEffect, useRef } from 'react';

type CloseOnOutsideClickProps = {
  onOutsideClick: () => void;
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export default function CloseOnOutsideClick({
  children,
  onOutsideClick,
  ...divProps
}: CloseOnOutsideClickProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cachedOutSideClick = useCallback(onOutsideClick, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        cachedOutSideClick();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cachedOutSideClick]);

  return (
    <div ref={containerRef} {...divProps}>
      {children}
    </div>
  );
}
