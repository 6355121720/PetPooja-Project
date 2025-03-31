import React, { useRef, useState } from "react";

const UploadGood = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [items, setItems] = useState(null);
    const [finalResponse, setFinalResponse] = useState(null);
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false);
    const ref = useRef()

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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/v1/predict/getgood`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setItems(data);
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
                body: JSON.stringify({itemsData, isWaste:false}),
                timeout: 30000
            });

            const finalData = await response.json();
            setFinalResponse(finalData.message);
            if (response.status<400){
                console.log('viral dobariya')
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
            <h1 className="text-2xl font-bold text-center mb-4">🍏 Upload & Analyze Fresh Produce</h1>
                <p className="text-center mb-6 text-gray-300">
                    Upload an image of fresh fruits and vegetables to identify and count them automatically.
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

export default UploadGood;


// import React, { useState } from "react";

// const UploadGood = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [items, setItems] = useState(null);
//     const [finalResponse, setFinalResponse] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [processing, setProcessing] = useState(false);

//     // Handle file selection
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setSelectedFile(file);
//         setPreview(URL.createObjectURL(file)); // Show preview
//     };

//     // Upload Image API
//     const handleUpload = async () => {
//         if (!selectedFile) {
//             alert("Please select an image first!");
//             return;
//         }

//         setUploading(true);
//         const formData = new FormData();
//         formData.append("image", selectedFile);

//         try {
//             const response = await fetch("http://localhost:5000/upload-image", {
//                 method: "POST",
//                 body: formData,
//             });

//             const data = await response.json();
//             setItems(data);
//             setUploading(false);
//         } catch (error) {
//             console.error("Error uploading image:", error);
//             setUploading(false);
//         }
//     };

//     // Send JSON to Another API
//     const handleProcessItems = async () => {
//         if (!items) {
//             alert("Upload image first to extract items!");
//             return;
//         }

//         setProcessing(true);
//         try {
//             const response = await fetch("http://localhost:5000/process-items", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(items),
//             });

//             const finalData = await response.json();
//             setFinalResponse(finalData);
//             setProcessing(false);
//         } catch (error) {
//             console.error("Error processing items:", error);
//             setProcessing(false);
//         }
//     };

//     // Reset Everything
//     const handleReset = () => {
//         setSelectedFile(null);
//         setPreview(null);
//         setItems(null);
//         setFinalResponse(null);
//     };

//     return (
//         <div className="flex flex-col items-center p-5 text-white">
//             {/* File Input */}
//             <input type="file" onChange={handleFileChange} className="mb-4 border p-2" />

//             {/* Image Preview */}
//             {preview && (
//                 <img src={preview} alt="Preview" className="w-40 h-40 object-cover mb-4 rounded" />
//             )}

//             {/* Buttons */}
//             <div className="flex gap-3">
//                 <button
//                     onClick={handleUpload}
//                     className="bg-blue-500 text-white p-2 rounded"
//                     disabled={uploading}
//                 >
//                     {uploading ? "Uploading..." : "Upload"}
//                 </button>

//                 <button
//                     onClick={handleProcessItems}
//                     className="bg-green-500 text-white p-2 rounded"
//                     disabled={processing}
//                 >
//                     {processing ? "Processing..." : "Process"}
//                 </button>

//                 <button
//                     onClick={handleReset}
//                     className="bg-red-500 text-white p-2 rounded"
//                 >
//                     Reset
//                 </button>
//             </div>

//             {/* Extracted Items */}
//             {items && (
//                 <div className="mt-4 p-3 border rounded">
//                     <h3 className="text-lg font-semibold">Extracted Items:</h3>
//                     <pre>{JSON.stringify(items, null, 2)}</pre>
//                 </div>
//             )}

//             {/* Final API Response */}
//             {finalResponse && (
//                 <div className="mt-4 p-3 border rounded">
//                     <h3 className="text-lg font-semibold">Final API Response:</h3>
//                     <pre>{JSON.stringify(finalResponse, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UploadGood;
