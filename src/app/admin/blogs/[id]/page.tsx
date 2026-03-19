"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type Blog = {
  id: number | string;
  title: string;
  description: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : undefined;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/blogs/${slug}`);
        setBlog(res.data);
        setError("");
      } catch {
        setError("Blog not found");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);


  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#3d2c29] text-lg">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <h2 className="text-2xl font-bold text-[#3d2c29] mb-4">Blog Not Found</h2>
          <p className="text-[#8b6d5a] mb-6">{error}</p>
          <button
            onClick={() => router.push('/admin/blogs')}
            className="inline-block px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          <div className="mb-8 flex items-center gap-4">
            <button
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              onClick={() => router.push('/admin/blogs')}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-[#3d2c29]">{blog.title}</h1>
          </div>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Blog ID</div>
              <div className="text-base font-medium text-gray-900">{blog.id}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Created</div>
              <div className="text-base font-medium text-gray-900">{blog.created_at ? new Date(blog.created_at).toLocaleString() : '-'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Updated</div>
              <div className="text-base font-medium text-gray-900">{blog.updated_at ? new Date(blog.updated_at).toLocaleString() : '-'}</div>
            </div>
          </div>
          <div className="border-t border-b border-gray-200 py-6 my-6">
            <h2 className="font-semibold text-[#3d2c29] mb-2">Description</h2>
            <p className="text-[#8b6d5a] leading-relaxed">{blog.description}</p>
          </div>
          {blog.content && (
            <div className="py-6">
              <h2 className="font-semibold text-[#3d2c29] mb-2">Content</h2>
              <div className="prose max-w-none text-[#3d2c29]">{blog.content}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
