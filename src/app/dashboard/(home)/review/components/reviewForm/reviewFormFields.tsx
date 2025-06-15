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
            className="w-full border p-2 rounded-md"
        />
                {errors.description?.message && (
                    <p className="text-red-500 text-sm">{errors.description.message as string}</p>
                )}
            </div>
        </div>
    );
}
