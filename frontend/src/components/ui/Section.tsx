import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
    fullWidth?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
    ({ className, fullWidth = false, children, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn('py-20 md:py-32 relative overflow-hidden', className)}
                {...props}
            >
                <div className={cn('mx-auto px-4 md:px-8', { 'container': !fullWidth })}>
                    {children}
                </div>
            </section>
        );
    }
);
Section.displayName = 'Section';

export default Section;
