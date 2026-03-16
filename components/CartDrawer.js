'use client'
import { useCart } from './CartProvider'

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, closeCart, isOpen, total, checkout, checkingOut } = useCart()

  return (
    <>
      <div className={`cart-overlay${isOpen ? ' open' : ''}`} onClick={closeCart} />
      <aside className={`cart-drawer${isOpen ? ' open' : ''}`} aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Your Cart</h2>
          <button className="cart-drawer-close" onClick={closeCart} aria-label="Close cart">&#x2715;</button>
        </div>

        <div className="cart-drawer-body" id="cartItems">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p style={{fontSize:'16px',opacity:0.6}}>Your cart is empty</p>
              <p style={{fontSize:'14px',opacity:0.4,marginTop:'8px'}}>Add something to get started</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <img
                  className="cart-item-img"
                  src={item.img || '/dld-dynamics/images/magnesium.jpg'}
                  alt={item.name}
                  onError={e => { e.target.style.display = 'none' }}
                />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{item.price}</div>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(idx)} aria-label="Remove">&#x2715;</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p style={{fontSize:'12px',opacity:0.55,marginBottom:'20px'}}>Shipping &amp; taxes calculated at checkout</p>
            <button
              className="btn btn-dark"
              style={{width:'100%',padding:'18px',fontSize:'15px',borderRadius:'16px',opacity:checkingOut?0.7:1}}
              onClick={checkout}
              disabled={checkingOut}
            >
              {checkingOut ? 'Redirecting to checkout...' : 'Proceed to Checkout →'}
            </button>
            <button
              className="btn btn-outline"
              style={{width:'100%',padding:'14px',fontSize:'13px',marginTop:'12px',borderRadius:'16px'}}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
