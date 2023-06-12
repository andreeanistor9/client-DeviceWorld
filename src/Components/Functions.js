export const handleAddToCart = (productId, name, price, setCartItems) => {
  const cartItem = { productId, name, price };
  setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
  fetch("/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, name, price }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const handleAddToWishlist = (
  productId,
  name,
  price,
  setWishlistItems
) => {
  const wishlistItem = { productId, name, price };
  setWishlistItems((prevWishlistItems) => [...prevWishlistItems, wishlistItem]);
  fetch("/wishlist/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, name, price }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
