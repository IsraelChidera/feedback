import React from 'react'

type InputProps = {
    label: string,
    type: any,
    placeholder: string,
    className?: string,
    value?: any,
    name?: string,
    onChange?: any,
    props?: any
}

const index = ({ label, type, placeholder, className, value, name, onChange, ...props }: InputProps) => {
    return (
        <div>
            <label className='block text-inputText font-medium'>
                {label} <span className='text-[#ff0000]'>*</span>
            </label>

            <input
                type={type}
                placeholder={placeholder}
                className={`rounded-[8px] bg-white text-[#0A0A0C] py-[20px] pl-[14px] pr-[10px] w-full ${className}`}
                name={name}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    )
}

export default index