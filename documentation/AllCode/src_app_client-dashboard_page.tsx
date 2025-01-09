"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
    idUser: number;
    username: string;
    email: string;
    role_id: number;
}

interface Company {
    idCompany: number;
    name: string;
    about: string;
}

export default function ClientDashboard() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [query, setQuery] = useState("");
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await fetch("/api/auth/validate");
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data.user); // Set the decoded user data
                } else {
                    alert("NEW ERROR Session expired. Please log in again.");
                    router.push("/");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                alert("Invalid session. Please log in again.");
                router.push("/");
            }
            
        }
        fetchUserProfile();
    }, [router]);
    

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/companies/search?query=${query}`);
            const data = await response.json();
            setCompanies(data);
        } catch (error) {
            console.error("Error searching for companies:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-4">Welcome, {profile.username}</h1>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role_id === 3 ? "Client" : "Unknown"}</p>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Search Companies</h2>
                <div className="flex space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search for a company"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="space-y-4">
                        {companies.map((company: Company) => (
                            <li
                                key={company.idCompany}
                                className="bg-white p-4 rounded-lg shadow-md"
                                onClick={() => router.push(`/companies/${company.idCompany}`)}
                            >
                                <h2 className="text-xl font-semibold">{company.name}</h2>
                                <p>{company.about}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}