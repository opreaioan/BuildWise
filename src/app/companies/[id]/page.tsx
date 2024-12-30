"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Company {
    idCompany: number;
    name: string;
    about: string;
    email: string;
    phone: string;
    website_url: string;
    Specialization: { name: string };
    Project: { idProject: number; name: string; description: string }[];
    Review: { idReview: number; rating: number; review_text: string, created_at: Date }[];
}

export default function CompanyDetail({ params }: { params: Promise<{ id: string }> }) {
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 0, review_text: "" });
    const router = useRouter();

    useEffect(() => {
        const fetchCompany = async () => {
            setLoading(true);
            try {
                const { id } = await params; // Await params as it's a Promise
                const response = await fetch(`/api/companies/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCompany(data);
                } else {
                    router.push("/companies");
                }
            } catch (error) {
                console.error("Error fetching company details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompany();
    }, [params, router]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { id } = await params; // Await params again to ensure we have the correct company ID
            const response = await fetch("/api/reviews/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newReview,
                    company_id: parseInt(id, 10),
                    client_id: 1, // Replace with the actual logged-in user ID
                }),
            });

            if (response.ok) {
                alert("Review submitted for approval.");
                setNewReview({ rating: 0, review_text: "" });
            } else {
                alert("Failed to submit review.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!company) return <p>Company not found</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-4">{company.name}</h1>
            <p>{company.about}</p>
            <p><strong>Email:</strong> {company.email}</p>
            <p><strong>Phone:</strong> {company.phone}</p>
            <p><strong>Website:</strong>
                <a href={company.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline">
                    {company.website_url}
                </a>
            </p>
            <p>
                <strong>Specialization:</strong> {company.Specialization.name}
            </p>

            <h2 className="text-2xl font-semibold mt-6">Projects</h2>
            {company.Project.length > 0 ? (
                <ul className="space-y-4">
                    {company.Project.map(project => (
                        <li key={project.idProject} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">{project.name}</h3>
                            <p>{project.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No projects available</p>
            )}

            <h2 className="text-2xl font-semibold mt-6">Submit a Review</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Rating (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Review:</label>
                    <textarea
                        value={newReview.review_text}
                        onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows={4}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                    Submit Review
                </button>
            </form>

            <h2 className="text-2xl font-semibold mt-6">Reviews</h2>
            {company.Review.length > 0 ? (
                <ul className="space-y-4">
                    {company.Review.map(review => (
                        <li key={review.idReview} className="bg-white p-4 rounded-lg shadow-md">
                            <p><strong>Rating:</strong> {review.rating}/5</p>
                            <p>{review.review_text}</p>
                            <p className="text-gray-500 text-sm">Reviewed on: {new Date(review.created_at).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews available</p>
            )}
        </div>
    );
}
