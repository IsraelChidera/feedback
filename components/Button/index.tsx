import React from 'react'

type ButtonProps = {
    children: React.ReactNode,
    className?: string,
    onClick?: any,
    type?: any,
    props?: any,
    disable?: boolean,
}

const index = ({ children, className, onClick, type, disable, ...props }: ButtonProps) => {
    return (
        <button type={type} onClick={onClick} className={`rounded-[24px] py-[10px] text-base font-medium ${className}`} {...props} disabled={disable}>
            {children}
        </button>
    )
}

export default index