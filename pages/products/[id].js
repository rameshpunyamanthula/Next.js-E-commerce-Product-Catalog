import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { toggleWishlist } from "../../store/wishlistSlice";
import { toast } from "react-toastify";
import { setLastToastMessage } from "../../utils/toastStore";

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Item added to cart!");
    setLastToastMessage("Item added to cart!");
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <>
      {/* ✅ STEP 14: SEO META TAGS */}
      <Head>
        <title>{product.title}</title>
        <meta
          name="description"
          content={product.description}
        />
      </Head>

      <main>
        <h1 data-testid="product-title">{product.title}</h1>
        <p data-testid="product-price">{product.price}</p>
        <p data-testid="product-description">{product.description}</p>

        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
        />

        <br />

        <button
          data-testid="add-to-cart-button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <button
          data-testid="add-to-wishlist-button"
          onClick={handleToggleWishlist}
        >
          Toggle Wishlist
        </button>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );

  return {
    props: {
      product: res.data,
    },
  };
}
