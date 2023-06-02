import React from 'react'

const MetaContainer = () => {
  return (
      <helmet>
        <title>bitterkofte</title>
        <meta name="description" content="Hey, this is my personal website. You can take a look at my portfolio, download my CV and see how you can contact me!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="bitterkofte - Hasan Talha Çelik"/>
        <meta property="og:url" content="https://bitterkofte.vercel.app/"/>
        <meta property="og:image" content="https://bitterkofte.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbk-wide.061bf381.png&w=3840&q=75" />

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://bitterkofte.vercel.app/"/>
        <meta property="twitter:title" content="Hasan Talha Çelik"/>
        <meta property="twitter:description" content="Hey, this is my personal website. You can take a look at my portfolio, download my CV and see how you can contact me!"/>
        <meta property="twitter:image" content="https://bitterkofte.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbk-wide.061bf381.png&w=3840&q=75" />
      </helmet>
  )
}

export default MetaContainer