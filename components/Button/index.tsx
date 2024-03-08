import React from 'react'

type ButtonProps = {
    children: React.ReactNode,
    className?: string,
    onClick?: any,
    props?: any
}

const index = ({ children, className, onClick, ...props }: ButtonProps) => {
    return (
        <button onClick={onClick} className={`rounded-[24px] py-[10px] text-base font-medium text-white ${className}`} {...props}>
            {children}
        </button>
    )
}

export default index