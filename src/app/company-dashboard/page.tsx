"use client";
import React, { useEffect, useState } from "react";
import SpecializationSelector from "@/app/components/SpecializationSelector";

interface UserProfile {
    idUser: number;
    username: string;
    email: string;
    role_id: number;
}

interface Project {
    idProject: number;
    name: string;
    description: string;
    project_type: string;
    location: string;
    start_date: string;
    end_date: string;
    value: number;
}

export default function CompanyDashboard() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        project_type: "",
        location: "",
        start_date: "",
        end_date: "",
        value: "",
    });
    const [specializationId, setSpecializationId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchProfileAndProjects() {
            try {
                const profileResponse = await fetch("/api/users/me");
                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    setProfile(profileData);
                }

                const projectsResponse = await fetch("/api/projects/list");
                if (projectsResponse.ok) {
                    const projectsData = await projectsResponse.json();
                    setProjects(projectsData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchProfileAndProjects();
    }, []);

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/projects/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newProject,
                    company_id: profile?.idUser, // Assume company user is linked to their company via user ID
                    specialization_id: specializationId,
                }),
            });

            if (response.ok) {
                alert("Project added successfully.");
                setNewProject({
                    name: "",
                    description: "",
                    project_type: "",
                    location: "",
                    start_date: "",
                    end_date: "",
                    value: "",
                });
            } else {
                alert("Failed to add project.");
            }
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-4">Welcome, {profile.username}</h1>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role_id === 3 ? "Client" : profile.role_id === 2 ? "Company User" : "Unknown"}</p>
            
            <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Add a New Project</h2>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Project Name:</label>
                        <input
                            type="text"
                            value={newProject.name}
                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Description:</label>
                        <textarea
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                            rows={4}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block mb-2">Project Type:</label>
                        <input
                            type="text"
                            value={newProject.project_type}
                            onChange={(e) => setNewProject({ ...newProject, project_type: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Location:</label>
                        <input
                            type="text"
                            value={newProject.location}
                            onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Start Date:</label>
                        <input
                            type="date"
                            value={newProject.start_date}
                            onChange={(e) => setNewProject({ ...newProject, start_date: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">End Date:</label>
                        <input
                            type="date"
                            value={newProject.end_date}
                            onChange={(e) => setNewProject({ ...newProject, end_date: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Value:</label>
                        <input
                            type="number"
                            value={newProject.value}
                            onChange={(e) => setNewProject({ ...newProject, value: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <SpecializationSelector
                        onSpecializationChange={(id) => setSpecializationId(id)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Project
                    </button>
                </form>
            </section>
        </div>
    );
}