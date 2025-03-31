import React, { useState, useRef } from "react";

const UploadBad = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [items, setItems] = useState(null);
    const [finalResponse, setFinalResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const ref = useRef();

    // Handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]))
    };

    // Upload Image API
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first!");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/v1/predict/getbad`, {
                method: "POST",
                body: formData,
                timeout: 30000
            });

            const data = await response.json();
            setItems(data.items);
            setLoading(false);

            // After getting the items, send them to the next API
            console.log(data)
            handleProcessItems(data);
        } catch (error) {
            console.error("Error uploading image:", error);
            setLoading(false);
        }
    };

    // Send JSON to Another API
    const handleProcessItems = async (itemsData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/v1/record/putrecord`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({itemsData, isWaste:true}),
            });

            const finalData = await response.json();
            setFinalResponse(finalData.message);
            console.log(response.status)
            if (response.status<400){
                // ref.current.value=''
                // setSelectedFile(null)
                // setPreview(null)
            }
        } catch (error) {
            // console.error("Error processing items:", error);
        }
    };

    return (
        <div className="flex flex-col items-center p-5 text-white">
            <h1 className="text-2xl font-bold text-center mb-4">🗑️ Upload & Detect Spoiled Produce</h1>
<p className="text-center mb-6 text-gray-300">
    Upload an image of fruits and vegetables to detect spoiled or bad items automatically.
</p>

            <input type="file" ref={ref} onChange={handleFileChange} className="mb-4 text-white" />
            {preview && (
                <div className="mb-4">
                    <img src={preview} alt="Uploaded Preview" className="w-48 h-48 object-cover border-2 border-gray-400 rounded" />
                </div>
            )}
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white p-2 rounded"
                disabled={loading}
            >
                {loading ? "Uploading..." : "Upload & Process"}
            </button>

            {items && (
                <div className="mt-4 p-3 border rounded">
                    <h3 className="text-lg font-semibold">Extracted Items:</h3>
                    <pre>{JSON.stringify(items, null, 2)}</pre>
                </div>
            )}

            {finalResponse && (
                <div className="mt-4 p-3 border rounded">
                    <h3 className="text-lg font-semibold">Final API Response:</h3>
                    <pre>{JSON.stringify(finalResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default UploadBad;

