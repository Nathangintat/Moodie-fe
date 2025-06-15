'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface ReviewFormFieldsProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

export default function ReviewFormFields({ register, errors }: ReviewFormFieldsProps) {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <input
                    {...register('headline')}
                    placeholder="Headline"
                    style={{background: 'linear-gradient(45deg, #F2EDFB 0%, #FFFFFF 50%, #E5DCF8 100%)'}}
                    className="w-full border p-2 rounded-md"
                />
                {errors.headline?.message && (
                    <p className="text-red-500 text-sm">{errors.headline.message as string}</p>
                )}
            </div>

            <div>
        <textarea
            {...register('description')}
            placeholder="Description"
            style={{background: 'linear-gradient(45deg, #F2EDFB 0%, #FFFFFF 50%, #E5DCF8 100%)'}}
            className="w-full border p-2 rounded-md"
        />
                {errors.description?.message && (
                    <p className="text-red-500 text-sm">{errors.description.message as string}</p>
                )}
            </div>
        </div>
    );
}
