"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : undefined;
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category: "",
    tags: "",
    is_published: false,
  });
  const [blogId, setBlogId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/blogs/${slug}`);
        setForm({
          title: res.data.title || "",
          excerpt: res.data.excerpt || "",
          content: res.data.content || "",
          featured_image: res.data.featured_image || "",
          category: res.data.category || "",
          tags: res.data.tags || "",
          is_published: res.data.is_published || false,
        });
        setBlogId(res.data.id);
        setError("");
      } catch {
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (!blogId) throw new Error("Blog ID missing");
      await axios.put(`/api/v1/blogs/${blogId}`, form);
      router.push(`/admin/blogs/${slug}`);
    } catch (err: unknown) {
      setError((err as unknown as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <button
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        onClick={() => router.push(`/admin/blogs/${slug}`)}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" /> Back to Blog
      </button>
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="Blog title" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <textarea name="excerpt" value={form.excerpt} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="Short summary/excerpt" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea name="content" value={form.content} onChange={handleChange} className="w-full border rounded px-3 py-2" required rows={6} placeholder="Full blog content" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Featured Image URL</label>
          <input name="featured_image" value={form.featured_image} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Image URL" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Category" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input name="tags" value={form.tags} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="tag1, tag2, ..." />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} id="is_published" />
          <label htmlFor="is_published" className="text-sm">Published</label>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#b88e72] text-white font-medium rounded-lg hover:bg-[#8b6d5a] transition-colors"
          disabled={saving}
        >
          <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
}
