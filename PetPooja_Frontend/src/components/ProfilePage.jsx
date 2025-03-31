import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import EditForm from "./EditForm";

axios.defaults.withCredentials = true;

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const handleSaveProfile = async (updatedData) => {
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_BACKEND_API}/api/v1/user/profile`,
                updatedData
            );
            setUser(data);
        } catch (error) {
            console.error("Error updating profile:", error);
            throw new Error("Failed to update profile");
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_API}/api/v1/user/profile`
                );
                setUser(data);
            } catch (error) {
                setError("Failed to load profile. Please try again.");
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/v1/auth/logout`);
            setAuthState(false);
            console.log("Logged out and setAuthState(false) called");
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
            setError("Failed to log out. Please try again.");
        }
    };

    const handleRoleBasedRedirect = () => {
        switch (user.role) {
            
            case "patient":
                navigate("/patient-dashboard");  // Change to kebab-case
                break;
            case "clinic_admin":
                navigate("/clinic-admin-dashboard");  // Change to kebab-case
                break;
            case "doctor":
                navigate("/doctor-dashboard");  // Change to kebab-case
                break;
            default:
                navigate("/");
        }
    
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="bg-gray-950 text-white font-sans antialiased min-h-screen">
            <section className="py-16 bg-gray-950">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-500">
                            {user.username}
                        </h1>
                        <p className="text-gray-400 mb-4">{user.email}</p>
                        <p className="text-gray-400 mb-4">
                            {user.phone ? user.phone : "Phone number not provided"}
                        </p>
                        <p className="text-gray-400 mb-4">
                            {user.address ? user.address : "Address not provided"}
                        </p>

                        {user.medicalHistory && user.medicalHistory.length > 0 ? (
                            <div className="text-gray-400 mb-4">
                                <strong>Medical History:</strong>
                                <ul>
                                    {user.medicalHistory.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-gray-400 mb-4">
                                No medical history available.
                            </p>
                        )}

                        <div className="flex space-x-6 mt-8 flex-wrap justify-center">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg text-xs mb-4"
                            >
                                Edit Profile
                            </button>
                            <button className="bg-transparent border-2 border-emerald-500 text-emerald-500 font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg text-xs mb-4">
                                Change Password
                            </button>
                            <button
                                onClick={handleRoleBasedRedirect}
                                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg text-xs mb-4"
                            >
                                Go to Dashboard
                            </button>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg text-xs"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {isEditModalOpen && (
                <EditForm
                    user={user}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveProfile}
                />
            )}
        </div>
    );
};

export default ProfilePage;
