import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/CartContext';

const TestComponent = () => {
  const { items, count, addItem, removeItem, clearCart } = useCart();
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={() => addItem('test-id')}>Add</button>
      <button onClick={() => removeItem('test-id')}>Remove</button>
      <button onClick={clearCart}>Clear</button>
      <ul>
        {items.map((item) => (
          <li key={item.id} data-testid="cart-item">
            {item.id} x{item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderWithProvider = () => {
  return render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.restoreAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('provides cart context to children', async () => {
    renderWithProvider();
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('adds items to cart', async () => {
    renderWithProvider();
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('increments quantity when adding same item', async () => {
    renderWithProvider();
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });

  it('removes items from cart', async () => {
    renderWithProvider();
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Remove'));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('clears cart', async () => {
    renderWithProvider();
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Clear'));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('persists to localStorage', async () => {
    const setItemSpy = vi.spyOn(localStorage, 'setItem');
    renderWithProvider();
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    fireEvent.click(screen.getByText('Add'));
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(setItemSpy).toHaveBeenCalledWith(
      'armendariz-cart',
      JSON.stringify([{ id: 'test-id', quantity: 1 }])
    );
  });

  it('loads from localStorage on mount', async () => {
    const storedItems = [{ id: 'saved-id', quantity: 3 }];
    vi.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(storedItems));

    renderWithProvider();
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(screen.getByTestId('count')).toHaveTextContent('3');
  });
});