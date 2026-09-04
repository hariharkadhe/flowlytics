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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Flowmetrics Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Insights, strategies, and stories on measuring what truly matters in engineering.</p>
        </div>

        {featuredPost && (
          <div className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
              <div className="p-8 md:p-12">
                <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">Featured</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition">{featuredPost.title}</h2>
                <p className="text-xl text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-gray-500 text-sm">
                  <span className="flex items-center gap-2"><User size={16} /> {featuredPost.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition group flex flex-col h-full">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">{post.title}</h3>
              <p className="text-gray-600 mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <div>{post.author}</div>
                  <div>{new Date(post.publishedAt).toLocaleDateString()}</div>
                </div>
                <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} />
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
