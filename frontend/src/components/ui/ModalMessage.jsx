import { createPortal } from "react-dom";

const ModalMessage = ({ isOpen, onClose, error, title = "Error" }) => {
    
    if (!isOpen) return null;

    return createPortal(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={onClose} 
        >
            <div 
                className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 relative flex flex-col items-center text-center transform transition-all scale-100"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg 
                        className="w-6 h-6 text-red-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {title}
                </h3>

                <p className="text-sm text-gray-500 mb-6">
                    {error || "Something went wrong. Please try again."}
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
}

export default ModalMessage;