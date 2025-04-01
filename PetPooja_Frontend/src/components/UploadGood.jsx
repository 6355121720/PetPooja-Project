import React, { useRef, useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';

const UploadGood = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [items, setItems] = useState(null);
    const [finalResponse, setFinalResponse] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const ref = useRef();

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        multiple: false
    });

    // Handle file upload
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
                body: JSON.stringify({ itemsData, isWaste: false }),
                timeout: 30000
            });

            const finalData = await response.json();
            setFinalResponse(finalData.message);
        } catch (error) {
            console.error("Error processing items:", error);
        }
    };

    const formatItems = () => {
        if (!items || !items.items) return null;
        
        return Object.entries(items.items)
            .map(([item, quantity], index) => (
                <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/40 border border-gray-700/30 mb-2 hover:bg-gray-900/60 transition-all duration-200"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-green-400 text-lg">•</span>
                        <span className="capitalize text-gray-200">{item}</span>
                    </div>
                    <span className="px-3 py-1 bg-green-400/10 text-green-400 rounded-full text-sm font-medium">
                        {quantity} items
                    </span>
                </div>
            ));
    };

    return (
        <div className="flex flex-col items-center p-8 text-white max-w-4xl mx-auto bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Upload & Analyze Fresh Produce
            </h1>
            <p className="text-center mb-8 text-gray-300 max-w-2xl">
                Upload images of fresh fruits and vegetables to automatically identify and count them using our advanced AI system.
            </p>

            <div 
                {...getRootProps()} 
                className={`w-full max-w-md p-8 rounded-xl border-2 border-dashed transition-all duration-300
                    ${isDragActive ? 'border-green-400 bg-green-400/10 scale-105' : 'border-gray-400'}
                    ${preview ? 'bg-gray-800/60 backdrop-blur-sm' : 'hover:border-green-400 hover:bg-gray-800/30'}`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-6">
                    {preview ? (
                        <>
                            <div className="relative group">
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    className="w-72 h-72 object-cover rounded-lg shadow-2xl transition-transform group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                    <p className="text-sm text-white font-medium">
                                        Click or drop to replace
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="p-4 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full inline-block">
                                <svg 
                                    className="mx-auto h-16 w-16 text-green-400" 
                                    stroke="currentColor" 
                                    fill="none" 
                                    viewBox="0 0 48 48" 
                                    aria-hidden="true"
                                >
                                    <path 
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                                        strokeWidth={2} 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                    />
                                </svg>
                            </div>
                            <div className="text-gray-300">
                                {isDragActive ? (
                                    <p className="text-green-400 font-medium text-lg">Drop it like it's hot! 🎵</p>
                                ) : (
                                    <p className="text-lg">Drag & drop an image here, or click to select</p>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 bg-gray-700/30 px-3 py-1 rounded-full inline-block">
                                Supports JPG, JPEG, PNG
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {preview && (
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`mt-8 px-8 py-3 rounded-lg font-semibold transition-all duration-300
                        ${loading 
                            ? 'bg-gray-600 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transform hover:-translate-y-1 hover:shadow-xl active:transform active:scale-95'
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center gap-3">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle 
                                    className="opacity-25" 
                                    cx="12" 
                                    cy="12" 
                                    r="10" 
                                    stroke="currentColor" 
                                    strokeWidth="4" 
                                    fill="none"
                                />
                                <path 
                                    className="opacity-75" 
                                    fill="currentColor" 
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Analyzing your image...
                        </span>
                    ) : (
                        'Analyze Image'
                    )}
                </button>
            )}

            {(items || finalResponse) && (
                <div className="w-full max-w-md mt-8 space-y-6">
                    {items && (
                        <div className="p-6 rounded-xl bg-gray-800/60 border border-gray-700/50 backdrop-blur-sm shadow-xl">
                            <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Detected Fresh Items
                            </h3>
                            <div className="space-y-1">
                                {formatItems()}
                            </div>
                        </div>
                    )}

                    {finalResponse && (
                        <div className="p-6 rounded-xl bg-gray-800/60 border border-gray-700/50 backdrop-blur-sm shadow-xl">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">Processing Results:</h3>
                            <pre className="text-sm overflow-auto max-h-60 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                                {JSON.stringify(finalResponse, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UploadGood;