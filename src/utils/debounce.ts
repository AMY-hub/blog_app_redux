export const debounce = <F extends (...args: any[]) => any>(
    func: F,
    ms: number,
) => {
    let timeoutId: NodeJS.Timeout;

    const debounced = (...args: Parameters<F>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), ms);
    }

    return debounced as (...args: Parameters<F>) => ReturnType<F>;
}