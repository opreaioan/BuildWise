"use client";
import React, { useState } from "react";

interface Company {
    idCompany: number;
    name: string;
    about: string;
    email: string;
    phone: string;
    website_url: string;
}

export default function Companies() {
    const [query, setQuery] = useState("");
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            console.log("Searching for:", query); // Log the query

            const response = await fetch(`/api/companies/search?query=${query}`);
            console.log("API Response:", response); // Log the response object

            const data = await response.json();
            console.log("API Data:", data); // Log the actual data

            setCompanies(data); // Update state with fetched companies
            setLoading(false);
        } catch (error) {
            console.error("Error fetching companies:", error);
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-4">Search Companies</h1>
            <div className="flex space-x-4 mb-6">
                <input
                    type="text"
                    placeholder="Search for a company"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
                    {companies.map((company) => (
                        <li
                            key={company.idCompany}
                            className="bg-white p-4 rounded-lg shadow-md"
                        >
                            <h2 className="text-2xl font-semibold">{company.name}</h2>
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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}