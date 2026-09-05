import { describe, it, expect } from 'vitest';
import { cn, formatCOP } from '@/lib/utils';

describe('lib/utils', () => {
  describe('cn', () => {
    it('combines class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'active', false && 'hidden')).toBe('base active');
    });

    it('merges tailwind classes correctly', () => {
      expect(cn('p-2 p-4')).toBe('p-4');
      expect(cn('text-red-500 text-blue-500')).toBe('text-blue-500');
    });

    it('handles empty inputs', () => {
      expect(cn()).toBe('');
      expect(cn('')).toBe('');
    });
  });

  describe('formatCOP', () => {
    it('formats numbers as COP currency', () => {
      expect(formatCOP(129990)).toBe('$ 129.990');
    });

    it('handles zero', () => {
      expect(formatCOP(0)).toBe('$ 0');
    });

    it('handles large numbers', () => {
      expect(formatCOP(1500000)).toBe('$ 1.500.000');
    });

    it('handles decimals (rounds to nearest)', () => {
      expect(formatCOP(129990.5)).toBe('$ 129.991');
    });
  });
});