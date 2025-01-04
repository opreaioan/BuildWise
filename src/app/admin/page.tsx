"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [pendingCompanies, setPendingCompanies] = useState([]);
    const [pendingReviews, setPendingReviews] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchApprovals = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/"); // Redirect to login if no token
                return;
            }

            try {
                const response = await fetch("/api/admin/approvals", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 403) {
                    alert("Unauthorized access. Admins only.");
                    router.push("/");
                } else if (response.ok) {
                    const data = await response.json();
                    setPendingCompanies(data.pendingCompanies);
                    setPendingReviews(data.pendingReviews);
                } else {
                    throw new Error("Failed to fetch approvals.");
                }
            } catch (error) {
                console.error("Error fetching approvals:", error);
                router.push("/"); // Redirect on error
            }
        };

        fetchApprovals();
    }, [router]);

    const handleCompanyApproval = async (company_id: number, status: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized");
            router.push("/");
            return;
        }

        try {
            await fetch("/api/admin/approve/company", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ company_id, status }),
            });

            setPendingCompanies((prev) =>
                prev.filter((company: any) => company.company_id !== company_id)
            );
        } catch (error) {
            console.error("Error approving company:", error);
        }
    };

    const handleReviewApproval = async (review_id: number, status: number) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized");
            router.push("/");
            return;
        }

        try {
            await fetch("/api/admin/approve/review", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ review_id, status }),
            });

            setPendingReviews((prev) =>
                prev.filter((review: any) => review.idReview !== review_id)
            );
        } catch (error) {
            console.error("Error approving review:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Pending Companies</h2>
                <ul>
                    {pendingCompanies.map((company: any) => (
                        <li key={company.company_id} className="mb-4">
                            <p>
                                <strong>{company.Company.name}</strong> -{" "}
                                {company.Company.about}
                            </p>
                            <button
                                onClick={() =>
                                    handleCompanyApproval(company.company_id, "approved")
                                }
                                className="mr-4 bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() =>
                                    handleCompanyApproval(company.company_id, "rejected")
                                }
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
                    {pendingReviews.map((review: any) => (
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