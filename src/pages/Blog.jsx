import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllPosts, getAllCategories } from '../data/blogData';
import BlogCard from '../components/BlogCard';
import SEO from '../components/SEO';

export default function Blog() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogPosts = getAllPosts(i18n.language);
  const categories = getAllCategories(i18n.language);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <SEO 
        title={t('blog.seo.title')}
        description={t('blog.seo.description')}
        url="/blog"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded bg-primary-blue text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            {t('blog.badge')}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
            {t('blog.title')} <span className="text-secondary-blue">{t('blog.titleSpan')}</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            {t('blog.description')}
          </p>
        </div>

        <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-blue text-white shadow-lg'
                    : 'bg-white text-slate-500 hover:bg-slate-100'
                }`}
              >
                {category === 'All' ? t('blog.allCategories') : category}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder={t('blog.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
            <svg className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">{t('blog.noResults')}</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-4 text-primary-blue font-bold hover:underline"
            >
              {t('blog.clearFilters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}