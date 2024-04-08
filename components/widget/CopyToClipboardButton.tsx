// components/CopyToClipboardButton.js
import { useState } from 'react';
import { FaRegClipboard } from "react-icons/fa";

export default function CopyToClipboardButton({ text }: { text: any }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="bg-white hover:bg-white flex items-center space-x-2 text-primary font-bold py-2 px-4 rounded"
        >
            <FaRegClipboard /> {" "}<p>{copied ? 'Copied!' : 'Copy to Clipboard'}</p>
        </button>
    );
}
