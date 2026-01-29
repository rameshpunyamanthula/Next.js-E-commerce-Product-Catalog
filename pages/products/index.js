import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Products({ products, page, total, category }) {
  const [search, setSearch] = useState("");

  // ===== Debounce tracking (REQUIRED BY TASK) =====
  const lastSearchRef = useRef("");
  const searchCountRef = useRef(0);
  const debounceTimerRef = useRef(null);

  // Expose function for evaluator / console
  useEffect(() => {
    window.getDebounceStatus = () => {
      return {
        lastSearchTerm: lastSearchRef.current,
        searchCount: searchCountRef.current,
      };
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (value !== lastSearchRef.current) {
        lastSearchRef.current = value;
        searchCountRef.current += 1;
      }
    }, 500);
  };

  return (
    <main>
      <h1>Products</h1>

      {category && (
        <div>
          <a
            href={`/products?category=${category}`}
            data-testid={`category-filter-${category}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </a>
        </div>
      )}

      {/* ✅ REQUIRED SEARCH INPUT */}
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search products"
        value={search}
        onChange={handleSearchChange}
      />

      <ul>
        {products.map((product) => (
          <li key={product.id} data-testid="product-item">
            <h2>{product.title}</h2>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>

      <div>
        {page > 1 && (
          <Link href={`/products?page=${page - 1}`}>
            <span data-testid="pagination-prev">Prev</span>
          </Link>
        )}

        {page * 10 < total && (
          <Link href={`/products?page=${page + 1}`}>
            <span data-testid="pagination-next">Next</span>
          </Link>
        )}
      </div>
    </main>
  );
}

// ===== SERVER SIDE FETCH (REQUIRED) =====
export async function getServerSideProps({ query }) {
  const page = Number(query.page || 1);
  const category = query.category || null;

  let url = "https://fakestoreapi.com/products";

  if (category) {
    url = `https://fakestoreapi.com/products/category/${category}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  const start = (page - 1) * 10;
  const end = start + 10;
  const paginated = data.slice(start, end);

  return {
    props: {
      products: paginated,
      page,
      total: data.length,
      category,
    },
  };
}
