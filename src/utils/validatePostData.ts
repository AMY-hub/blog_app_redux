type ValidateFormFn = (data: {
    [key: string]: string
    | Array<string>
    | number
}) => {
    invalidFields: string[],
    invalid: boolean
};

export const validateFormData: ValidateFormFn = (data) => {
    const invalidFields: string[] = [];

    for (const key in data) {
        const content = data[key];

        if (typeof content === 'string') {
            if (!content.trim()) {
                invalidFields.push(key);
            }
        } else if (Array.isArray(content)) {
            if (content.length === 0) {
                invalidFields.push(key);
            }
        } else if (!content) {
            invalidFields.push(key);
        }
    }
    return {
        invalidFields,
        invalid: !!invalidFields.length
    };
};