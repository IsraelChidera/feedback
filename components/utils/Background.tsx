import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { BsDownload } from "react-icons/bs";

const Background = ({ children }: { children: React.ReactNode }) => {
    const [backgroundColor, setBackgroundColor] = useState<any>(generateRandomColor());
    const backgroundRef: any = useRef(null);

    // Function to generate a random color
    function generateRandomColor() {
        const randomColor = '#f7f7f7';
        return randomColor;
    }

    // Function to change background color
    function changeBackgroundColor() {
        setBackgroundColor(generateRandomColor());
    }

    // Function to capture and download the background image
    function downloadBackground() {
        html2canvas(backgroundRef.current).then(canvas => {
            canvas.toBlob((blob: any) => {
                saveAs(blob, 'background.png');
            });
        });
    }

    return (
        <div

        >
            <div ref={backgroundRef}
                style={{
                    backgroundColor: backgroundColor,
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
                className='rounded-lg pb-2'
            >
                {children}

            </div>
            <div className='mt-3 flex justify-center items-center'>
                <button type="button" className='bg-primary p-3 text-white cursor-pointer rounded-full' onClick={downloadBackground}>
                    <BsDownload className='text-2xl ' />
                </button>
            </div>
        </div>
    );
};

export default Background;
