import React from 'react';

// Common props for all icons
interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    className?: string;
    strokeWidth?: number;
}

export const IconIndividual: React.FC<IconProps> = ({ size = 24, className, strokeWidth = 1.5, ...props }) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5z" />
        <path d="M12 12c-4.4 0-8 2-8 6v2h16v-2c0-4-8-6-8-6z" />
        <path d="M12 12v3" strokeOpacity="0.5" />
        <circle cx="12" cy="7" r="2" fill="currentColor" fillOpacity="0.1" stroke="none" />
    </svg>
);

export const IconCouples: React.FC<IconProps> = ({ size = 24, className, strokeWidth = 1.5, ...props }) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M16 3a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" />
        <path d="M8 3a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" />
        <path d="M15 13c3.5 0 6 1.8 6 5v2H3v-2c0-3.3 2.5-5 6-5" />
        <path d="M12 13v4" />
        <path d="M12 17l-2 2" />
        <path d="M12 17l2 2" />
        <path d="M10 9c0 1.5 2 2.5 2 4 0-1.5 2-2.5 2-4" strokeOpacity="0.5" />
    </svg>
);

export const IconFamily: React.FC<IconProps> = ({ size = 24, className, strokeWidth = 1.5, ...props }) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M9 4a3 3 0 1 0 3 3 3 3 0 0 0-3-3z" />
        <path d="M17 6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
        <path d="M6 8a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
        <path d="M12 11c-2.7 0-5 1.5-5 4v2h10v-2c0-2.5-2.3-4-5-4z" />
        <path d="M17 10c1.5 0 3 1 3 3v2" />
        <path d="M7 12c-1.5 0-3 1-3 3v2" />
        <path d="M12 3v1" strokeOpacity="0.5" />
        <path d="M9 17v4" />
        <path d="M15 17v4" />
    </svg>
);

export const IconWorkshops: React.FC<IconProps> = ({ size = 24, className, strokeWidth = 1.5, ...props }) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M8 10l3 3 5-6" strokeWidth={strokeWidth + 0.5} />
        <circle cx="12" cy="12" r="6" strokeOpacity="0.3" strokeDasharray="2 2" />
        <path d="M12 6v2" />
        <path d="M12 16v2" />
        <path d="M7 12h2" />
        <path d="M15 12h2" />
    </svg>
);
