import Script from 'next/script'

type GooglePreferredSourceProps = {
  lang: 'en' | 'zh-TW'
  className?: string
  floating?: boolean
}

/** Official Google Preferred Sources button. https://developers.google.com/search/docs/appearance/preferred-sources */
export function GooglePreferredSource({ lang, className, floating = false }: GooglePreferredSourceProps) {
  const mount = (
    <>
      <Script
        id="google-preferred-source"
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="afterInteractive"
      />
      <div google-add-preferred-source-btn="" data-theme="light" data-lang={lang} />
    </>
  )

  if (floating) {
    return (
      <div className="fixed bottom-5 right-4 z-40 drop-shadow-md">{mount}</div>
    )
  }

  return <div className={className ?? 'flex justify-center'}>{mount}</div>
}
