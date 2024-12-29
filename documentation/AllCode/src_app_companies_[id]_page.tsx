"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Company {
    idCompany: number;
    name: string;
    about: string;
    email: string;
    phone: string;
    website_url: string;
    Specialization: { name: string };
    Project: { idProject: number; name: string; description: string }[];
    Review: { idReview: number; rating: number; review_text: string }[];
}

export default function CompanyDetail({params}:{params:Promise<{id:number}>}) {

    const {id} =React.use(params); // Access `id` directly

    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchCompanyDetails = async () => {
            try {
                const response = await fetch(`/api/companies/${id}`);
                const data = await response.json();
                setCompany(data);
            } catch (error) {
                console.error("Error fetching company details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!company) {
        return <p>Company not found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-4">{company.name}</h1>
            <p>{company.about}</p>
            <p>
                <strong>Email:</strong> {company.email}
            </p>
            <p>
                <strong>Phone:</strong> {company.phone}
            </p>
            <p>
                <strong>Website:</strong>{" "}
                <a
                    href={company.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    {company.website_url}
                </a>
            </p>
            <p>
                <strong>Specialization:</strong> {company.Specialization.name}
            </p>

            <h2 className="text-2xl font-semibold mt-6">Projects</h2>
            <ul className="space-y-4">
                {company.Project.map((project) => (
                    <li key={project.idProject} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Reviews</h2>
            <ul className="space-y-4">
                {company.Review.map((review) => (
                    <li key={review.idReview} className="bg-white p-4 rounded-lg shadow-md">
                        <p>
                            <strong>Rating:</strong> {review.rating}/5
                        </p>
                        <p>{review.review_text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}