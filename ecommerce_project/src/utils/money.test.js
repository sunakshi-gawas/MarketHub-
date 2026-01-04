import { expect, it, describe } from 'vitest';
import { formatMoney } from './money.js';

describe('formatMoney', () => {
    it('formats 1999 cents as ₹199.90', () => { 
expect(formatMoney(1999)).toBe('₹199.90');
});

it('displays 2 decimals', () => { 
    expect(formatMoney(1090)).toBe('₹109.00');
    expect(formatMoney(100)).toBe('₹10.00');
});

});
