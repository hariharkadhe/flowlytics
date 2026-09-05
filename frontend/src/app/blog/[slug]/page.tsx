"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPublicBlogPostBySlug } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function BlogDetail() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.slug) {
      getPublicBlogPostBySlug(params.slug as string)
        .then((res) => {
          if (res.success) {
            setPost(res.data);
          } else {
            setError("Post not found");
          }
        })
        .catch(() => setError("Error loading post"))
        .finally(() => setLoading(false));
    }
  }, [params.slug]);

  if (loading) return <div className="min-h-screen py-24 px-4 text-center text-gray-500 dark:text-slate-500 bg-white dark:bg-[#0B0C10] transition-colors duration-300">Loading article...</div>;
  if (error || !post) return <div className="min-h-screen py-24 px-4 text-center text-red-500 bg-white dark:bg-[#0B0C10] transition-colors duration-300">{error}</div>;

  return (
    <div className="bg-white dark:bg-[#0B0C10] min-h-screen py-16 px-4 transition-colors duration-300">
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition mb-12 font-medium">
          <ArrowLeft size={20} /> Back to Blog
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight transition-colors">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-slate-400 pb-8 border-b dark:border-slate-800 transition-colors">
            <span className="flex items-center gap-2 font-medium"><User size={18} /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={18} /> {new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </header>

        {post.thumbnail && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800">
            <img src={post.thumbnail} alt={post.title} className="w-full max-h-[400px] object-cover" />
          </div>
        )}
        
        <div 
          className="prose prose-lg dark:prose-invert max-w-none prose-blue prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
