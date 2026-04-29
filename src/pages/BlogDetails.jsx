import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from '../data/blogData';
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin, Calendar, Tag } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import SEO from '../components/SEO';

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = getBlogPostBySlug(id);

  // Handle case when post is not found
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-24 bg-slate-50">
        <div className="text-center">
          <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
          <p className="text-xl text-slate-500 mb-8">Oops! The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-primary-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.id, 2);

  // Share URLs
  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://tryshiptrack.com/blog/${post.slug || post.id}`;
  const shareText = `Check out this article: ${post.title}`;

  const handleShare = (platform) => {
    let url = '';
    switch(platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`;
        break;
    }
    if (url) window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={`${post.category}, shipping, tracking, logistics, package delivery, courier tracking`}
        url={`/blog/${post.slug || post.id}`}
        type="article"
        publishedTime={post.date}
        author="ShipTrack Logistics Team"
        image={post.image}
      />
      
      {/* Article Header */}
      <div className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary-blue font-bold transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="bg-primary-blue text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">
                {post.category}
              </span>
              {post.readTime && (
                <span className="bg-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">
                  {post.readTime}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest pt-4">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime || '5 min read'}
              </span>
              <span className="hidden md:inline">•</span>
              <span className="text-primary-blue flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Article Body */}
        <div className="lg:col-span-8">
          {/* Featured Image */}
          <div className="aspect-video bg-slate-100 rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl shadow-slate-200">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed
              prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-strong:text-slate-900 prose-strong:font-black
              prose-a:text-primary-blue prose-a:font-bold hover:prose-a:underline
              prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2
              prose-img:rounded-2xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Bio */}
          <div className="mt-16 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl">
              <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center text-white font-black text-xl">
                S
              </div>
              <div>
                <h4 className="font-bold text-slate-900">ShipTrack Logistics Team</h4>
                <p className="text-sm text-slate-500">Expert insights on global shipping and package tracking technology.</p>
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Article
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleShare('facebook')}
                  className="p-3 bg-slate-50 hover:bg-[#1877f2] hover:text-white text-slate-400 rounded-xl transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="p-3 bg-slate-50 hover:bg-[#1da1f2] hover:text-white text-slate-400 rounded-xl transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="p-3 bg-slate-50 hover:bg-[#0077b5] hover:text-white text-slate-400 rounded-xl transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Article ID: {post.id.slice(0, 8)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          {/* Related Articles */}
          <div>
            <h4 className="text-xl font-black text-slate-900 tracking-tight mb-8 flex items-center gap-2">
              Related Articles
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{relatedPosts.length}</span>
            </h4>
            <div className="space-y-8">
              {relatedPosts.map(p => (
                <div key={p.id} className="group">
                  <Link to={`/blog/${p.slug || p.id}`} className="block aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </Link>
                  <Link to={`/blog/${p.slug || p.id}`}>
                    <h5 className="font-black text-slate-900 leading-tight group-hover:text-primary-blue transition-colors line-clamp-2">
                      {p.title}
                    </h5>
                  </Link>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.date}</p>
                    <span className="text-[10px] text-slate-300">•</span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.readTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-primary-blue to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-2xl font-black mb-3">Weekly Logistics Tips</h4>
              <p className="text-blue-100 text-sm mb-6">Get the latest shipping insights and tracking tips delivered to your inbox.</p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); }}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-sm mb-3 focus:outline-none"
                  required
                />
                <button className="w-full bg-white text-primary-blue font-black py-3 rounded-xl text-sm uppercase tracking-widest hover:bg-slate-100 transition-colors">
                  Subscribe Now
                </button>
              </form>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full" />
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xl font-black text-slate-900 tracking-tight mb-6">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {['Guides', 'Tracking 101', 'Troubleshooting', 'Tips & Tricks', 'Carrier News'].map(cat => (
                <Link 
                  key={cat} 
                  to={`/blog?category=${cat.toLowerCase()}`}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary-blue hover:text-white transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}