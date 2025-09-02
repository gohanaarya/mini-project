// components/Canteens.jsx
import { Link } from "react-router-dom";
import "./Canteen.css";
import { useCanteens } from "../../context/CanteenContext";
import { useUserAuth } from "../../context/UserAuthContext";

const Canteens = () => {
  const { canteens, loading } = useCanteens();
  const {user}=useUserAuth()

  if (loading) return <p style={{ textAlign: "center" }}>Loading canteens...</p>;

  return (
    <div className="restaurants-container">
      {
user?(<h2>Restaurants in College</h2>):(<h2>Login to get canteens</h2>)
}
      
      <div className="restaurants-grid">
        {canteens.map((restaurant) => (
          <Link
            to={`/canteen/${restaurant._id}1111`}
            key={restaurant._id}
            className="restaurant-card"
          >
            <div className="image-container">
              <img src={restaurant?.imageUrl} alt={restaurant?.name} />
              <div className="offer-tag">{restaurant.offer || "Flat 10% OFF"}</div>
            </div>
            <div className="restaurant-info">
              <div className="name-rating">
                <h3>{restaurant?.canteenName}</h3>
                <span className="rating">4.0 ★</span>
              </div>
              <p className="price">{restaurant?.description}</p>
              <p className="location">{restaurant?.college}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Canteens;
