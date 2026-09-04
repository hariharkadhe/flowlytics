"use client";
import { useState, useEffect } from "react";
import { getAdminBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "@/lib/api";
import { useForm, Controller } from "react-hook-form";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import TipTapEditor from "@/components/TipTapEditor";

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      status: "draft",
      featured: false,
    }
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await getAdminBlogPosts();
      if (res.success) setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (post?: any) => {
    if (post) {
      setEditingPost(post);
      reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        status: post.status,
        featured: post.featured,
      });
    } else {
      setEditingPost(null);
      reset({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "",
        status: "draft",
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const onSubmit = async (data: any) => {
    try {
      if (editingPost) {
        await updateBlogPost(editingPost._id, data);
      } else {
        await createBlogPost(data);
      }
      closeModal();
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Error saving blog post");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteBlogPost(id);
        fetchPosts();
      } catch (err) {
        console.error(err);
        alert("Error deleting post");
      }
    }
  };

  if (loading) return <div className="p-8">Loading blog posts...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} /> Create Post
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-medium text-gray-600">Title</th>
              <th className="p-4 font-medium text-gray-600">Author</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600">Featured</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{post.title}</td>
                <td className="p-4 text-gray-600">{post.author}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4 text-gray-600">
                  {post.featured ? "Yes" : "No"}
                </td>
                <td className="p-4 flex items-center gap-3">
                  <button onClick={() => openModal(post)} className="text-gray-500 hover:text-blue-600 transition"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(post._id)} className="text-gray-500 hover:text-red-600 transition"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No blog posts available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">{editingPost ? "Edit Post" : "Create Post"}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="blog-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input {...register("title")} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                    <input {...register("slug")} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input {...register("author")} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select {...register("status")} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea {...register("excerpt")} rows={2} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <TipTapEditor value={field.value} onChange={field.onChange} />
                    )}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="featured" {...register("featured")} className="w-4 h-4 rounded text-blue-600" />
                  <label htmlFor="featured" className="text-sm text-gray-700 font-medium">Featured Post</label>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition font-medium">Cancel</button>
              <button type="submit" form="blog-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">Save Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
