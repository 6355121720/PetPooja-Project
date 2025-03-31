import { useState } from "react";



const EditForm = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        medicalHistory: user.medicalHistory || "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await onSave(formData);
            onClose();
        } catch (err) {
            setError(err.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-emerald-500 transition-colors"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-emerald-500 mb-6">
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 mb-2">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">
                                Medical History
                            </label>
                            <textarea
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleChange}
                                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                                rows="3"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border-2 border-emerald-500 text-emerald-500 rounded-full hover:bg-emerald-500/10 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white rounded-full hover:opacity-90 transition-opacity flex items-center"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                            {loading && (
                                <span className="ml-2 animate-spin">🌀</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default EditForm;