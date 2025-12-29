import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

const Image = ({ src, alt, ...rest }: ImageProps) => {
  // For external images or images without explicit dimensions, use regular img tag
  if (typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'))) {
    return (
      <figure className="my-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto rounded-lg"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        {alt && (
          <figcaption className="mt-2 text-center text-sm italic text-gray-600 dark:text-gray-400">
            {alt}
          </figcaption>
        )}
      </figure>
    )
  }

  return <NextImage src={`${basePath || ''}${src}`} alt={alt || ''} {...rest} />
}

export default Image
