import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND_CONFIG } from '../config';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aurum_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('aurum_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (product, variant = "18K Yellow Gold", qty = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id && item.variant === variant);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].qty += qty;
        return updated;
      }
      return [...prev, {
        id: product.id,
        sku: product.sku,
        name: product.name,
        price: product.price,
        image: product.images[0],
        variant: variant,
        qty: qty
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, variant) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.variant === variant)));
  };

  const updateQty = (id, variant, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.variant === variant) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  const shippingFee = subtotal >= BRAND_CONFIG.freeShippingThreshold || subtotal === 0 ? 0 : 150;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'flat') {
      discount = appliedCoupon.discount;
    } else if (appliedCoupon.type === 'percent') {
      discount = Math.round((subtotal * appliedCoupon.discount) / 100);
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    setCouponError('');
    if (BRAND_CONFIG.coupons[clean]) {
      const c = BRAND_CONFIG.coupons[clean];
      if (subtotal < c.minSpend) {
        setCouponError(`Min. spend of ₹${c.minSpend.toLocaleString()} required for this code.`);
        return false;
      }
      setAppliedCoupon({ code: clean, ...c });
      return true;
    } else {
      setCouponError('Invalid coupon code. Try BRIDAL500 or FESTIVE10');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      currency,
      setCurrency,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      subtotal,
      shippingFee,
      discount,
      grandTotal,
      couponCode,
      setCouponCode,
      appliedCoupon,
      couponError,
      applyCoupon,
      removeCoupon,
      totalItems: cart.reduce((acc, it) => acc + it.qty, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
