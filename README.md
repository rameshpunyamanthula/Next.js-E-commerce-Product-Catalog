🛒 My E-Commerce Product Catalog

Next.js + Redux Toolkit + Docker

📌 Project Overview

This project is a multi-page e-commerce product catalog built using Next.js with Server-Side Rendering (SSR) and Redux Toolkit for global state management.

The goal of this project is to demonstrate how a modern e-commerce application can be built with:

Fast, SEO-friendly server-rendered pages

URL-driven filtering and pagination

Centralized state management for cart and wishlist

Dockerized setup for one-command execution

Verifiable behaviors for automated evaluation

The application uses FakeStoreAPI as a mock backend to simulate real-world product data.

🧠 What We Implemented (High-Level)

This project covers all core requirements provided in the task:

Server-side rendered product listing

Pagination and category filtering using URL query params

Debounced product search

Product detail pages with SEO meta tags

Shopping cart with quantity update & removal

Wishlist functionality

Toast notifications for user actions

Redux state exposure for automated verification

Docker + Docker Compose with health checks

🛠️ Technology Stack
Area	Technology
Framework	Next.js
Rendering	Server-Side Rendering (getServerSideProps)
State Management	Redux Toolkit
Notifications	React Toastify
API	FakeStoreAPI
Containerization	Docker & Docker Compose
📂 Project Structure (Important for Evaluators)
my-ecommerce-app/
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
├── pages/
│   ├── _app.js                # Redux Provider + global utilities
│   ├── index.js               # Home page
│   ├── cart.js                # Cart page (steps 9 & 10)
│   ├── products/
│   │   ├── index.js           # Product listing (SSR, pagination, search)
│   │   └── [id].js            # Product detail page
│   └── api/
│       └── health.js          # Health check endpoint
├── store/
│   ├── index.js               # Redux store
│   ├── cartSlice.js           # Cart logic
│   └── wishlistSlice.js       # Wishlist logic
├── utils/
│   └── toastStore.js          # Toast verification helper
└── README.md

🔧 Environment Variables

An example environment file is provided as required.

File: .env.example

NEXT_PUBLIC_API_URL=https://fakestoreapi.com
PORT=3000


This ensures no secrets are committed to the repository.

🐳 Docker & One-Command Setup (Core Requirement)
What We Did

Created a Dockerfile to build the Next.js app

Created docker-compose.yml with:

app service

Port mapping (3000:3000)

Health check using /api/health

▶️ How to Run the Application
docker-compose up --build -d

✅ How Evaluators Can Verify Docker Setup

Check container status

docker-compose ps


Expected:

Up (healthy)


Check health endpoint

curl http://localhost:3000/api/health


Expected:

200 OK


Check home page

curl http://localhost:3000


Expected:

200 OK HTML response

🧾 Product Listing Page (/products) – SSR
What We Did

Used getServerSideProps to fetch products on the server

Returned fully rendered HTML

Ensured products are visible even without JavaScript

Added required test IDs

How to Verify
curl http://localhost:3000/products


Check HTML contains:

data-testid="product-item"

📄 Pagination (Server-Side)
What We Did

Displayed 10 products per page

Used page query parameter

Paginated server-side after fetching data

URLs
/products
/products?page=2

Verification

First product on page 1 ≠ first product on page 2

Pagination buttons exist:

data-testid="pagination-prev"

data-testid="pagination-next"

🏷 Category Filtering
What We Did

Supported category filtering using URL params

Example:

/products?category=electronics


Added filter button:

data-testid="category-filter-electronics"

🔍 Debounced Search (Step 6)
What We Did

Added search input with debounce (≥300ms)

Prevented excessive re-renders

Exposed verification function

Input Element
data-testid="search-input"

Verification Function
window.getDebounceStatus()


Returns:

{
  lastSearchTerm: "computer",
  searchCount: 1
}

📦 Product Detail Page (/products/[id])
What We Did

Server-side fetched single product

Displayed:

Title

Price

Description

Image

Test IDs

product-title

product-price

product-description

🛒 Cart Functionality (Steps 8, 9, 10)
Add to Cart

Button:

data-testid="add-to-cart-button"

Update Quantity

Input:

data-testid="cart-item-quantity-input-<id>"


Button:

data-testid="cart-item-quantity-update-<id>"

Remove Item
data-testid="cart-item-remove-button-<id>"

Verification Helper
window.getCartState()

❤️ Wishlist (Step 11)

Toggle wishlist on product page

Button:

data-testid="add-to-wishlist-button"


Verification:

window.getWishlistState()

🔔 Toast Notifications (Step 12)
What We Did

Show toast when product is added to cart

Stored last toast message for verification

Verification
window.getLastToastMessage()


Expected:

Item added to cart!

🔍 SEO Meta Tags (Step 13)

Dynamic <title> and <meta description>

Based on product data

Implemented in /products/[id]