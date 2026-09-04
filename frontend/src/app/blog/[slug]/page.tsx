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

  if (loading) return <div className="min-h-screen py-24 px-4 text-center text-gray-500">Loading article...</div>;
  if (error || !post) return <div className="min-h-screen py-24 px-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white min-h-screen py-16 px-4">
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mb-12 font-medium">
          <ArrowLeft size={20} /> Back to Blog
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-500 pb-8 border-b">
            <span className="flex items-center gap-2 font-medium"><User size={18} /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={18} /> {new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </header>
        
        <div 
          className="prose prose-lg max-w-none prose-blue prose-headings:font-bold prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
