import * as React from 'react'

export interface AmLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size preset: 'xs' (16px) | 'sm' (24px) | 'md' (32px) | 'lg' (40px) | 'xl' (64px)
   * Or custom pixel value: '48px'
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string

  /**
   * Visual variant (affects color scheme)
   * @default 'primary'
   */
  variant?: 'primary' | 'mono'

  /**
   * Optional CSS class name
   */
  className?: string

  /**
   * Accessibility label
   * @default 'Al Marfa Technologies'
   */
  ariaLabel?: string

  /**
   * Logo colors (optional overrides)
   */
  colors?: {
    background?: string
    aColor?: string
    mColor?: string
  }
}

const sizeMap: Record<string, string> = {
  xs: '16px',
  sm: '24px',
  md: '32px',
  lg: '40px',
  xl: '64px',
}

/**
 * AmLogo - Al Marfa Technologies logo with dynamic colors
 * 
 * Displays the official AM logo mark with customizable colors.
 * Colors default to the platform palette (teal background, navy M, off-white A)
 * but can be overridden via props or CSS custom properties.
 *
 * @example
 * <AmLogo size="md" />
 * <AmLogo size="32px" colors={{ background: '#0b1018', aColor: '#f5f7f8', mColor: '#3d7a70' }} />
 */
export const AmLogo = React.forwardRef<HTMLDivElement, AmLogoProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      className,
      ariaLabel = 'Al Marfa Technologies',
      colors = {},
      ...props
    },
    ref,
  ) => {
    const resolvedSize = sizeMap[size] || size

    const styleVars = {
      '--logo-bg-color': colors.background || 'var(--logo-bg-color, #3d7a70)',
      '--logo-a-color': colors.aColor || 'var(--logo-a-color, #f5f7f8)',
      '--logo-m-color': colors.mColor || 'var(--logo-m-color, #111c2a)',
    } as React.CSSProperties

    return (
      <div
        ref={ref}
        className={`logo logo--${variant} ${className || ''}`.trim()}
        style={{
          display: 'inline-block',
          width: resolvedSize,
          height: resolvedSize,
          flex: '0 0 auto',
          ...styleVars,
        }}
        aria-label={ariaLabel}
        {...props}
      >
        <svg
          viewBox="0 0 60 60"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style={{ display: 'block' }}
        >
          <title>{ariaLabel}</title>
          <desc>Al Marfa Technologies logo with dynamic colors</desc>
          <defs>
            <style>{`
              .cls-1 { fill: var(--logo-bg-color, #3d7a70); }
              .cls-2 { fill: var(--logo-m-color, #111c2a); }
              .cls-3 { fill: var(--logo-a-color, #f5f7f8); }
            `}</style>
          </defs>
          <g id="Layer_1-2" data-name="Layer 1">
            <rect className="cls-1" x="0" width="60" height="60" />
            <path
              className="cls-2"
              d="M25.25,60L8.31,9.89h-.32c.45,7.44.68,14.42.68,20.93v29.18H0V0h13.47l16.22,47.73h.24L46.63,0h13.51v60h-9.19v-29.67c0-2.98.07-6.87.22-11.66.15-4.79.27-7.69.38-8.7h-.32l-17.54,50.03h-8.43Z"
            />
            <path
              className="cls-3"
              d="M47.04,60l-5.83-16.59h-22.34l-5.71,16.59H3.08L24.94,0h10.39l21.86,60h-10.15ZM38.69,34.99l-5.47-16.27c-.4-1.09-.95-2.81-1.66-5.15-.71-2.34-1.19-4.06-1.46-5.15-.72,3.35-1.77,7.02-3.16,10.99l-5.27,15.57h17.02Z"
            />
          </g>
        </svg>
      </div>
    )
  },
)

AmLogo.displayName = 'AmLogo'
