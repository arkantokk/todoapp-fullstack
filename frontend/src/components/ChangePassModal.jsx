import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import RegInput from "./ui/RegInput";

const ChangePassModal = ({ isOpen, onClose, onSubmit }) => {
    const [values, setValues] = useState({
        currentPassword: '',
        newPassword: ''
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleChange = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(values);
        }

    };

    if (!isOpen) return null;

    return createPortal(
        <div 
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none font-bold px-2"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <RegInput
                        id="currentPassword"
                        name="currentPassword"
                        type="text"
                        label="Current Password"
                        placeholder="Enter current password"
                        value={values.currentPassword}
                        onChange={handleChange}
                    />
                    
                    <RegInput
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        label="New Password"
                        placeholder="Enter new password"
                        value={values.newPassword}
                        onChange={handleChange}
                    />

                    <div className="flex gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

export default ChangePassModal;