import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BlogCard({ post }) {
  const { t } = useTranslation();

  return (
    <div className="group cursor-pointer bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <Link to={`/blog/${post.slug || post.id}`}>
        <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary-blue text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              {post.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {post.date}
          </span>
          {post.readTime && (
            <span className="flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              {post.readTime}
            </span>
          )}
        </div>
        
        <Link to={`/blog/${post.slug || post.id}`}>
          <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary-blue transition-colors leading-[1.1] mb-4 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {post.excerpt}
        </p>
        
        <Link 
          to={`/blog/${post.slug || post.id}`} 
          className="inline-flex items-center gap-2 text-primary-blue font-black text-xs uppercase tracking-widest group/btn"
        >
          {t('blog.readMore')}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}