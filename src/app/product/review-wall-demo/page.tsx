"use client";

import { useState, useEffect } from "react";

interface Review {
  id: string;
  text: string;
  createdAt: string;
}

interface PaginatedResponse {
  reviews: Review[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const demoBusiness = {
  clientId: "demo",
  businessName: "Demo Business",
};

export default function ReviewWallDemoPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageSizes = [
    { label: "20 per page", value: 20 },
    { label: "50 per page", value: 50 },
    { label: "100 per page", value: 100 },
  ];

  useEffect(() => {
    fetchReviews();
  }, [page, pageSize]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/reviews?clientId=${demoBusiness.clientId}&page=${page}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data: PaginatedResponse = await response.json();
      setReviews(data.reviews);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize: number | null) => {
    if (newPageSize) {
      setPageSize(newPageSize);
      setPage(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">telltheowner</a>
          <a href="/" className="text-gray-600 hover:text-blue-600 transition">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Header */}
            <div className="mb-6">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Demo
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                Review Wall Demo
              </h1>
              <p className="text-gray-600 mt-2">
                Public reviews for {demoBusiness.businessName}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600">
                  {total} {total === 1 ? "review" : "reviews"}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer shadow-sm appearance-none pr-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  {pageSizes.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {/* Reviews List */}
                {reviews.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                      No reviews have been submitted yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <p className="text-lg leading-relaxed text-gray-900">{review.text}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Submitted:</span>{" "}
                            {formatDate(review.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Showing {Math.min((page - 1) * pageSize + 1, total)} to{" "}
                      {Math.min(page * pageSize, total)} of {total} reviews
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Previous
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (page <= 3) {
                            pageNum = i + 1;
                          } else if (page >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = page - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                page === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12">
        <footer className="bg-gray-900 text-gray-300 py-8">
          <div className="container mx-auto px-6 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Tell the Owner. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}