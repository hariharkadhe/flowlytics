"use client";
import { useEffect, useState } from "react";
import { getPublicBlogPosts } from "@/lib/api";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicBlogPosts().then((res) => {
      if (res.success) setPosts(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen py-24 px-4 text-center text-gray-500">Loading articles...</div>;

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = posts.filter(p => p._id !== featuredPost?._id);

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Flowmetrics Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Insights, strategies, and stories on measuring what truly matters in engineering.</p>
        </div>

        {featuredPost && (
          <div className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="flex flex-col md:flex-row h-full">
                {featuredPost.thumbnail && (
                  <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                    <img 
                      src={featuredPost.thumbnail} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className={`p-8 md:p-12 flex flex-col justify-center ${featuredPost.thumbnail ? 'md:w-1/2' : 'w-full'}`}>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 self-start">Featured</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition">{featuredPost.title}</h2>
                  <p className="text-xl text-gray-600 mb-8">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-6 text-gray-500 text-sm mt-auto">
                    <span className="flex items-center gap-2"><User size={16} /> {featuredPost.author}</span>
                    <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full hover:-translate-y-1">
              {post.thumbnail && (
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-sm text-gray-500 flex flex-col">
                    <span className="font-medium text-gray-900">{post.author}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center text-gray-500 py-12 bg-white rounded-2xl border border-gray-100">
            No articles available at the moment. Check back later!
          </div>
        )}
      </div>
    </div>
  );
}
