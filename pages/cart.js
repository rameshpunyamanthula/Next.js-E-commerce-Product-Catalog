import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../store/cartSlice";
import { useState } from "react";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return <p data-testid="cart-empty">Cart is empty</p>;
  }

  return (
    <main>
      <h1>Cart</h1>

      {cartItems.map((item) => {
        const [qty, setQty] = useState(item.quantity);

        return (
          <div key={item.id}>
            <p>{item.title}</p>

            <input
              type="number"
              min="1"
              value={qty}
              data-testid={`cart-item-quantity-input-${item.id}`}
              onChange={(e) => setQty(Number(e.target.value))}
            />

            <button
              data-testid={`cart-item-quantity-update-${item.id}`}
              onClick={() =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: qty,
                  })
                )
              }
            >
              Update
            </button>

            <button
              data-testid={`cart-item-remove-button-${item.id}`}
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        );
      })}
    </main>
  );
}
