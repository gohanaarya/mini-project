import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useCanteenItems } from "../../context/CanteenItemsContext";
import "./CanteenItems.css";
import { toast } from 'react-toastify';
const CanteenItems = () => {
  let { id } = useParams();
  id=id.slice(0,-4);
  console.log(id);
  const { cart, dispatch } = useCart(); // ✅ include `cart`
  const { canteenFoods, setFoodsForCanteen } = useCanteenItems();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const foods = canteenFoods[id] || [];

  useEffect(() => {
    if (canteenFoods[id]) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/canteens/${id}/foods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setFoodsForCanteen(id, res.data.fooditems);
        } else {
          setError("No food found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load foods");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    toast.success("Item added to cart successfully")
    
  };

  const isInCart = (itemId) => {
    return cart.some((cartItem) => cartItem._id === itemId);
  };

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="canteen-items-container">
      <h2>Canteen Menu</h2>
      <div className="food-grid">
        {foods.map((item) => {
          const alreadyInCart = isInCart(item._id);
          return (
            <div className="food-card" key={item._id}>
              <img
                src={item.imageUrl || "https://via.placeholder.com/150"}
                alt={item.itemName}
                className="food-image"
              />
              <div className="food-info">
                <h4>{item.itemName}</h4>
                <p>₹{item.price}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(item)}
                  disabled={alreadyInCart} // ✅ disable if in cart
                >
                  {alreadyInCart ? "In Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CanteenItems;
