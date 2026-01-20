import { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface GalleryGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface GallerySkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
  aspectRatio?: 'square' | '3/4' | '4/3';
  gap?: 'sm' | 'md' | 'lg';
}

const columnClasses = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

const aspectClasses = {
  'square': 'aspect-square',
  '3/4': 'aspect-[3/4]',
  '4/3': 'aspect-[4/3]',
};

export const GalleryGrid = ({
  children,
  columns = 4,
  gap = 'md',
  className,
}: GalleryGridProps) => {
  return (
    <div className={cn('grid', columnClasses[columns], gapClasses[gap], className)}>
      {children}
    </div>
  );
};

export const GallerySkeleton = ({
  count = 8,
  columns = 4,
  aspectRatio = 'square',
  gap = 'md',
}: GallerySkeletonProps) => {
  return (
    <div className={cn('grid', columnClasses[columns], gapClasses[gap])}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('rounded-xl', aspectClasses[aspectRatio])}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
