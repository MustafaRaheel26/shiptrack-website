// Import all blog images from local assets
import internationalTrackingImg from '../assets/images/blog/international-tracking.jpg';
import outForDeliveryImg from '../assets/images/blog/out-for-delivery.jpg';
import trackingDelayImg from '../assets/images/blog/tracking-delay.jpg';
import carrierCodesImg from '../assets/images/blog/carrier-codes.jpg';
import lostPackageImg from '../assets/images/blog/lost-package.jpg';
import carrierComparisonImg from '../assets/images/blog/carrier-comparison.jpg';
import { getBlogContent } from './blogContent';

// Base blog posts structure with slugs only (images are local)
export const blogPosts = [
  {
    id: "how-to-track-international-shipments",
    slug: "how-to-track-international-shipments",
    image: internationalTrackingImg
  },
  {
    id: "what-does-out-for-delivery-mean",
    slug: "what-does-out-for-delivery-mean",
    image: outForDeliveryImg
  },
  {
    id: "why-tracking-status-sometimes-delays",
    slug: "why-tracking-status-sometimes-delays",
    image: trackingDelayImg
  },
  {
    id: "understanding-carrier-codes",
    slug: "understanding-carrier-codes",
    image: carrierCodesImg
  },
  {
    id: "how-to-find-lost-package",
    slug: "how-to-find-lost-package",
    image: lostPackageImg
  },
  {
    id: "best-carriers-for-international-shipping",
    slug: "best-carriers-for-international-shipping",
    image: carrierComparisonImg
  }
];

// Get post by slug with language support
export const getBlogPostBySlug = (slug, language = 'en') => {
  const content = getBlogContent(language, slug);
  const basePost = blogPosts.find(post => post.slug === slug || post.id === slug);
  
  if (!content || !basePost) return null;
  
  return {
    ...basePost,
    ...content,
    id: slug
  };
};

export const getRelatedPosts = (currentPostId, limit = 2) => {
  return blogPosts.filter(post => post.id !== currentPostId).slice(0, limit);
};

export const getAllPosts = (language = 'en') => {
  return blogPosts.map(post => getBlogPostBySlug(post.slug, language)).filter(p => p !== null);
};

export const getPostsByCategory = (category, language = 'en') => {
  const allPosts = getAllPosts(language);
  if (category === 'All') return allPosts;
  return allPosts.filter(post => post.category === category);
};

export const getAllCategories = (language = 'en') => {
  const allPosts = getAllPosts(language);
  return ['All', ...new Set(allPosts.map(post => post.category))];
};