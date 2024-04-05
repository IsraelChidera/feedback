import React from 'react'

type InputProps = {
    label: string,
    type: any,
    placeholder: string,
    className?: string,
    value?: any,
    name?: string,
    onChange?: any,
    props?: any,
    id: any
}

const index = ({ label, id, type, placeholder, className, value, name, onChange, ...props }: InputProps) => {
    return (
        <div>
            {
                type !== 'hidden' && <label className='block text-inputText font-medium'>
                    {label} <span className='text-[#ff0000]'>*</span>
                </label>
            }

            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px] ${className}`}
                name={name}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    )
}

export default index