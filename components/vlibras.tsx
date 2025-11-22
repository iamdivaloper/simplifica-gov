"use client"

import Script from "next/script"

export function VLibras() {
  return (
    <>
      {/* @ts-ignore */}
      <div vw="true" className="enabled">
        {/* @ts-ignore */}
        <div vw-access-button="true" className="active"></div>
        {/* @ts-ignore */}
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          new window.VLibras.Widget("https://vlibras.gov.br/app")
        }}
      />
    </>
  )
}
