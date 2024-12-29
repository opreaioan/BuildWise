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
    Review: { idReview: number; rating: number; review_text: string }[];
}

export default function CompanyDetail({ params }: { params: { id: string } }) {
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchCompany = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/companies/${params.id}`);
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
    }, [params.id, router]);

    if (loading) return <p>Loading...</p>;
    if (!company) return <p>Company not found</p>;

    return (
        <div>
            <h1>{company.name}</h1>
            {/* Additional company details */}
        </div>
    );
}