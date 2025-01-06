"use client";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [pendingCompanies, setPendingCompanies] = useState([]);
    const [pendingReviews, setPendingReviews] = useState([]);

    useEffect(() => {
        async function fetchApprovals() {
            const response = await fetch("/api/admin/approvals");
            const data = await response.json();
            setPendingUsers(data.pendingUsers);
            setPendingCompanies(data.pendingCompanies);
            setPendingReviews(data.pendingReviews);
        }
        fetchApprovals();
    }, []);

    const handleUserApproval = async (user_id: number, status: string) => {
        await fetch("/api/admin/approve/user", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, status }),
        });
        setPendingCompanies((prev) =>
            prev.filter((user: { user_id: number; User: { username: string; email: string } }) => user.user_id !== user_id)
        );
    }

    const handleCompanyApproval = async (company_id: number, status: string) => {
        await fetch("/api/admin/approve/company", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ company_id, status }),
        });
        setPendingCompanies((prev) =>
            prev.filter((company: { company_id: number; Company: { name: string; about: string } }) => company.company_id !== company_id)
        );
    };

    const handleReviewApproval = async (review_id: number, status: number) => {
        await fetch("/api/admin/approve/review", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ review_id, status }),
        });
        setPendingReviews((prev) =>
            prev.filter((review: { idReview: number; Company: { name: string }; review_text: string }) => review.idReview !== review_id)
        );
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Pending Users</h2>
                <ul>
                    {pendingUsers.map((user: { user_id: number; User: { username: string; email: string } }) => (
                        <li key={user.user_id} className="mb-4">
                            <p>
                                <strong>{user.User.username}</strong> -{" "}
                                {user.User.email}
                            </p>
                            <button
                                onClick={() => handleUserApproval(user.user_id, "approved")}
                                className="mr-4 bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleUserApproval(user.user_id, "rejected")}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Pending Companies</h2>
                <ul>
                    {pendingCompanies.map((company: { company_id: number; Company: { name: string; about: string } }) => (
                        <li key={company.company_id} className="mb-4">
                            <p>
                                <strong>{company.Company.name}</strong> -{" "}
                                {company.Company.about}
                            </p>
                            <button
                                onClick={() => handleCompanyApproval(company.company_id, "approved")}
                                className="mr-4 bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleCompanyApproval(company.company_id, "rejected")}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Pending Reviews</h2>
                <ul>
                    {pendingReviews.map((review: { idReview: number; Company: { name: string }; review_text: string }) => (
                        <li key={review.idReview} className="mb-4">
                            <p>
                                <strong>Company:</strong> {review.Company.name}
                            </p>
                            <p>
                                <strong>Review:</strong> {review.review_text}
                            </p>
                            <button
                                onClick={() => handleReviewApproval(review.idReview, 1)}
                                className="mr-4 bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleReviewApproval(review.idReview, 0)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}