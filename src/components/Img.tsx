import type { CSSProperties, ImgHTMLAttributes } from 'react'
import type { ResponsiveImage } from '../data/portfolio'

type Props = {
  image: ResponsiveImage
  priority?: boolean
  className?: string
  style?: CSSProperties
  sizes?: string
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'width' | 'height' | 'alt'>

/** Responsive, layout-shift-safe image. width/height reserve space; faces are never stretched (object-cover only). */
export default function Img({ image, priority = false, className, style, sizes, ...rest }: Props) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes ?? image.sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // React 18 expects the lowercase attribute name for fetchpriority.
      {...(priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {})}
      className={className}
      style={style}
      draggable={false}
      {...rest}
    />
  )
}
