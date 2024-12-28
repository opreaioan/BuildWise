import React, { useEffect, useState } from "react";

interface Specialization {
    idSpecialization: number;
    name: string;
}

interface Props {
    onSpecializationChange: (id: number) => void;
}

const SpecializationSelector: React.FC<Props> = ({ onSpecializationChange }) => {
    const [specializations, setSpecializations] = useState<Specialization[]>([]);
    const [newSpecialization, setNewSpecialization] = useState("");

    useEffect(() => {
        async function fetchSpecializations() {
            const response = await fetch("/api/specializations/list");
            const data: Specialization[] = await response.json();
            setSpecializations(data);
        }
        fetchSpecializations();
    }, []);

    const handleCreateSpecialization = async () => {
        const response = await fetch("/api/specializations/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newSpecialization }),
        });

        const data = await response.json();

        if (response.ok) {
            const newSpec: Specialization = data.specialization;
            setSpecializations([...specializations, newSpec]);
            setNewSpecialization("");
        } else {
            alert(data.message || "An error occurred.");
        }
    };

    return (
        <div>
            <label htmlFor="specialization">Select or Create Specialization:</label>
            <select
                id="specialization"
                onChange={(e) => onSpecializationChange(Number(e.target.value))}
            >
                <option value="">Select a specialization</option>
                {specializations.map((spec) => (
                    <option key={spec.idSpecialization} value={spec.idSpecialization}>
                        {spec.name}
                    </option>
                ))}
            </select>

            <div>
                <input
                    type="text"
                    placeholder="New Specialization"
                    value={newSpecialization}
                    onChange={(e) => setNewSpecialization(e.target.value)}
                />
                <button type="button" onClick={handleCreateSpecialization}>
                    Add Specialization
                </button>
            </div>
        </div>
    );
};

export default SpecializationSelector;