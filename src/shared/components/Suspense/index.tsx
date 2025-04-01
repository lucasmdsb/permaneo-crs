import React from 'react';

export interface SuspenseProps {
  loading: boolean;
  dataLength?: number;
  fallback?: React.ReactNode;
  empty?: React.ReactNode;
  children?: React.ReactNode;
}

export function Suspense({
  fallback,
  children,
  loading,
  dataLength,
  empty,
}: SuspenseProps) {
  if (!loading) {
    if (dataLength === 0) return empty;
    return children;
  }

  return Array.from({ length: 5 }).map((_, index) => (
    <React.Fragment key={index}>{fallback}</React.Fragment>
  ));
}
