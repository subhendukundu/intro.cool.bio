import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

type Props = {
  title: string
  noTracking?: boolean
}

function MetaData({ title, noTracking }: Props) {
  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href="http://intro.cool.bio" />
      <link rel="canonical" href="http://intro.cool.bio" />
      <meta charSet="utf-8" />
      <meta name="title" content={title} />
      <meta
        name="description"
        content="Open Source Intro tool, to let you get introducted with the right person."
      />
      <meta name="keywords" content="introduction, open-source" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://intro.cool.bio" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="Open Source Intro tool, to let you get introducted with the right person."
      />
      <meta property="og:image" content="https://intro.cool.bio/demo.png.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="http://intro.cool.bio" />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content="Open Source Intro tool, to let you get introducted with the right person."
      />
      <meta
        property="twitter:image"
        content="https://intro.cool.bio/demo.png.png"
      />
      {!noTracking && (
        <script
          src="https://analytics.cool.bio/tracking.js"
          data-project-id="d983b6d5-1ff1-434c-a55d-7eaebb092770"
        ></script>
      )}
      <script>
        {`if(typeof require === 'undefined') var require = {};
        if (typeof exports === 'undefined') var exports = {};`}
      </script>
    </Helmet>
  )
}

MetaData.propTypes = {
  title: PropTypes.string,
  noTracking: PropTypes.bool,
}

export default MetaData
