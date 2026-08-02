import React, { useEffect } from 'react';

const SEO = ({
  title = 'StarTech Clone — Leading Tech & Computer Store in Bangladesh',
  description = 'Shop latest laptops, desktop PCs, components, graphics cards, monitors, and tech accessories at the best prices in Bangladesh.',
  keywords = 'startech, computer shop bangladesh, laptop price bd, graphics card, pc builder, tech store',
  canonicalUrl = window.location.href,
  ogImage = 'https://placehold.co/1200x630/081621/ffffff/png?text=StarTech+Clone&font=montserrat',
  ogType = 'website',
  schemaData = null
}) => {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // Helper for meta tag creation/update
    const setMetaTag = (name, content, attrName = 'name') => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('robots', 'index, follow');

    // 3. Open Graph
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:image', ogImage, 'property');
    setMetaTag('og:url', canonicalUrl, 'property');
    setMetaTag('og:type', ogType, 'property');
    setMetaTag('og:site_name', 'StarTech Clone', 'property');

    // 4. Twitter Cards
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Schema
    let schemaScript = document.getElementById('json-ld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'json-ld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'StarTech Clone',
      url: window.location.origin,
      logo: 'https://placehold.co/300x100/081621/ffffff/png?text=StarTech',
      sameAs: ['https://facebook.com', 'https://youtube.com']
    };

    schemaScript.text = JSON.stringify(schemaData || defaultSchema);
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schemaData]);

  return null;
};

export default React.memo(SEO);
