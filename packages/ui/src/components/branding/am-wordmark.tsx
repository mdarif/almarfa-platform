import * as React from 'react'

export interface AmWordmarkProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Layout direction
   * @default 'horizontal'
   */
  layout?: 'horizontal' | 'vertical'

  /**
   * Size: 'sm' (24px mark) | 'md' (32px mark) | 'lg' (48px mark)
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Optional CSS class name
   */
  className?: string

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
  sm: '24px',
  md: '32px',
  lg: '48px',
}

/**
 * AmWordmark - Logo mark + "Al Marfa" text lockup
 * 
 * Flexible wordmark component supporting horizontal and vertical layouts.
 * Combines the AM logo mark with institutional typography.
 * 
 * @example
 * <AmWordmark layout="horizontal" size="md" />
 * <AmWordmark layout="vertical" size="lg" />
 */
export const AmWordmark = React.forwardRef<HTMLDivElement, AmWordmarkProps>(
  (
    {
      layout = 'horizontal',
      size = 'md',
      className,
      colors = {},
      ...props
    },
    ref,
  ) => {
    const markSize = sizeMap[size] || size
    const isHorizontal = layout === 'horizontal'

    const styleVars = {
      '--logo-bg-color': colors.background || 'var(--logo-bg-color, #3d7a70)',
      '--logo-a-color': colors.aColor || 'var(--logo-a-color, #f5f7f8)',
      '--logo-m-color': colors.mColor || 'var(--logo-m-color, #111c2a)',
    } as React.CSSProperties

    return (
      <div
        ref={ref}
        className={`wordmark wordmark--${layout} ${className || ''}`.trim()}
        style={{
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: 'center',
          gap: isHorizontal ? '0.75rem' : '0.5rem',
          ...styleVars,
        }}
        {...props}
      >
        {/* Logo mark */}
        <div style={{ flex: '0 0 auto', width: markSize, height: markSize }}>
          <svg
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            style={{ display: 'block' }}
          >
            <title>Al Marfa Logo Mark</title>
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

        {/* Text: "Al Marfa" */}
        <span
          style={{
            fontFamily: 'inherit',
            fontSize: isHorizontal ? '0.875rem' : '1rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            color: 'currentColor',
          } as React.CSSProperties}
        >
          Al Marfa
        </span>
      </div>
    )
  },
)

AmWordmark.displayName = 'AmWordmark'
