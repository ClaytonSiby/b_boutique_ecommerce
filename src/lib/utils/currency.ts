/**
 * Format a number as South African Rand (ZAR) currency
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "R 1,299.99")
 */
export function formatCurrency(amount: number | string | null | undefined): string {
    if (amount === null || amount === undefined) {
        return 'R 0.00';
    }

    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount)) {
        return 'R 0.00';
    }

    return `R ${numAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

/**
 * Parse a currency string to a number
 * @param currencyString - The currency string to parse (e.g., "R 1,299.99" or "1299.99")
 * @returns The numeric value
 */
export function parseCurrency(currencyString: string): number {
    if (!currencyString) return 0;

    // Remove currency symbols, spaces, and commas
    const cleaned = currencyString.replace(/[R$€£,\s]/g, '');
    const parsed = parseFloat(cleaned);

    return isNaN(parsed) ? 0 : parsed;
}
