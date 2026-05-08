import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  author,
  publishedTime,
  modifiedTime,
  type = 'website'
}) {
  const siteTitle = 'ShipTrack - Global Package Tracking';
  const siteUrl = 'https://tryshiptrack.com';
  const siteDescription = 'Track your shipments from 1,200+ carriers worldwide. Real-time tracking updates, delivery notifications, and global logistics insights.';
  const siteImage = 'https://tryshiptrack.com/og-image.jpg';
  const twitterHandle = '@shiptrack';

  const fullTitle = title ? `${title} | ShipTrack` : siteTitle;
  const metaDescription = description || siteDescription;
  const metaKeywords = keywords || 'track package, shipment tracking, courier tracking, global logistics, package delivery, real-time tracking, shipping updates';
  const metaImage = image || siteImage;
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const metaAuthor = author || 'ShipTrack Team';

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={metaAuthor} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1e3a8a" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="ShipTrack" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      
      {/* Article Specific (for blog posts) */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={metaAuthor} />
          <meta property="article:section" content="Logistics" />
        </>
      )}
      
      {/* Additional SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="ShipTrack" />
      
      {/* Favicon Links */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
}