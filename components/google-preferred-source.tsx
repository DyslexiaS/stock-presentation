import Script from 'next/script'

type GooglePreferredSourceProps = {
  lang: 'en' | 'zh-TW'
  className?: string
}

/** Official Google Preferred Sources button. https://developers.google.com/search/docs/appearance/preferred-sources */
export function GooglePreferredSource({ lang, className }: GooglePreferredSourceProps) {
  return (
    <div className={className ?? 'flex justify-center'}>
      <Script
        id="google-preferred-source"
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="afterInteractive"
      />
      <div google-add-preferred-source-btn="" data-theme="light" data-lang={lang} />
    </div>
  )
}
