type FormatDateTime = (
    timestamp: number,
    locale: string,
    param?: 'date' | 'time') => string;

export const formatDateTime: FormatDateTime = (timestamp, locale, param) => {
    const date = new Date(timestamp);
    switch (param) {
        case 'date':
            return date.toLocaleDateString(locale);
        case 'time':
            return date.toLocaleTimeString(locale);
        default:
            return date.toLocaleString(locale);
    }
};