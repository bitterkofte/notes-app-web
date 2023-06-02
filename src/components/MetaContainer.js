import React from 'react'

const MetaContainer = () => {
  return (
      <helmet>
        <title>Notes</title>
        <meta name="description" content="A web app for taking notes!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Notes"/>
        <meta property="og:url" content="https://bitterkofte.github.io/notes-app-web/"/>
        <meta property="og:image" content="https://github.com/bitterkofte/notes-app-web/blob/main/src/assets/notes-banner2.png?raw=true" />

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://bitterkofte.github.io/notes-app-web/"/>
        <meta property="twitter:title" content="Hasan Talha Çelik"/>
        <meta property="twitter:description" content="A web app for taking notes!"/>
        <meta property="twitter:image" content="https://github.com/bitterkofte/notes-app-web/blob/main/src/assets/notes-banner2.png?raw=true"  />
      </helmet>
  )
}

export default MetaContainer