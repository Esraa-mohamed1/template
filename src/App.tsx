import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

// Layout & Navigation
import Navbar from "./components/layout/Navbar";
import BottomNavbar from "./components/layout/BottomNavbar";
import Footer from "./components/layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CategoriesPage from "./pages/CategoriesPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import BuilderPage from "./pages/BuilderPage";
import AdminLogin from "./components/admin/AdminLogin";
import PagesPage from "./integrate/PagesPage";
import BuilderPageAcademic from "./integrate/BuilderPage";

import { User, Order, Transaction, CartItem } from "./types";
import { ProductDetail } from "./types/api";
import * as orderService from "./services/orderService";
import { authService, authStorage } from "./services/authService";
import { mapAuthUserToUser } from "./utils/mapUser";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // استرجاع الجلسة لو فيه token محفوظ
  useEffect(() => {
    const token = authStorage.get();
    if (!token) {
      setAuthLoading(false);
      return;
    }

    authService
      .me()
      .then((res) => setCurrentUser(mapAuthUserToUser(res.data)))
      .catch(() => authStorage.clear())
      .finally(() => setAuthLoading(false));
  }, []);

  const handleAddToCart = (
    product: ProductDetail,
    quantity: number = 1,
    variant?: { id: number; color: string; size: string },
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === String(product.id) &&
          item.selectedSize === variant?.size &&
          item.selectedColor === variant?.color,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === String(product.id) &&
          item.selectedSize === variant?.size &&
          item.selectedColor === variant?.color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: String(product.id),
          name: product.name,
          price: parseFloat(product.price),
          img: product.gallery?.[0]?.image ?? "/placeholder.png",
          quantity,
          selectedSize: variant?.size,
          selectedColor: variant?.color,
          variantId: variant?.id,
        } as CartItem,
      ];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckoutComplete = (method: string) => {
    if (!currentUser) {
      navigate("/auth");
      return;
    }

    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const shipping = subtotal > 99 ? 0 : 15;
    const orderTotal = subtotal + shipping;

    const newOrder = orderService.createOrder(cartItems, orderTotal);
    const newTransaction = orderService.createTransaction(
      newOrder.id,
      orderTotal,
      method,
    );

    setOrders([newOrder, ...orders]);
    setTransactions([newTransaction, ...transactions]);
    alert("Order placed successfully! Thank you for shopping with E.buy.");
    setCartItems([]);
    navigate("/");
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore network errors on logout
    } finally {
      authStorage.clear();
      setCurrentUser(null);
      setOrders([]);
      setTransactions([]);
      navigate("/");
    }
  };

  const cartTotalCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-brand-light flex flex-col">
      <Navbar
        cartCount={cartTotalCount}
        onCartClick={() => navigate("/cart")}
        onLogoClick={() => navigate("/")}
        onCategoryClick={(cat: string) =>
          navigate(`/categories?cat=${encodeURIComponent(cat)}`)
        }
        onUserClick={() => navigate(currentUser ? "/profile" : "/auth")}
        onBuilderClick={() => navigate("/admin/builder")}
      />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onProductClick={(p: any) =>
                  navigate(`/product/${p.slug ?? p.id}`)
                }
                onCategoryClick={(cat: string) =>
                  navigate(`/categories?cat=${encodeURIComponent(cat)}`)
                }
              />
            }
          />

          <Route
            path="/product/:id"
            element={<ProductPageWrapper onAddToCart={handleAddToCart} />}
          />

          <Route
            path="/cart"
            element={
              <CartPage
                items={cartItems}
                onBack={() => navigate("/")}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onCheckout={() => {
                  if (currentUser) {
                    navigate("/checkout");
                  } else {
                    alert("Please sign in to proceed with checkout.");
                    navigate("/auth");
                  }
                }}
              />
            }
          />

          <Route
            path="/categories"
            element={
              <CategoriesPageWrapper
                onProductClick={(p: { slug?: string; id: string }) =>
                  navigate(`/product/${p.slug ?? p.id}`)
                }
              />
            }
          />

          <Route
            path="/auth"
            element={
              <AuthPage
                onAuthSuccess={handleAuthSuccess}
                onBack={() => navigate("/")}
              />
            }
          />

          <Route
            path="/profile"
            element={
              authLoading ? (
                <div className="min-h-screen flex items-center justify-center text-gray-400">
                  Loading...
                </div>
              ) : currentUser ? (
                <ProfilePage
                  user={currentUser}
                  orders={orders}
                  transactions={transactions}
                  onLogout={handleLogout}
                  onUpdateUser={setCurrentUser}
                />
              ) : (
                <AuthPage
                  onAuthSuccess={handleAuthSuccess}
                  onBack={() => navigate("/")}
                />
              )
            }
          />

          <Route
            path="/checkout"
            element={
              <CheckoutPage
                items={cartItems}
                onBack={() => navigate("/cart")}
                onComplete={handleCheckoutComplete}
              />
            }
          />

          <Route
            path="/admin/builder"
            element={
              <BuilderPage 
                currentUser={currentUser || {
                  id: 'admin-auto',
                  name: 'المسؤول العام',
                  email: 'admin@darab.academy',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
                  joinedAt: new Date().getFullYear().toString(),
                  role: 'admin',
                  isVerified: true
                }} 
                onLogout={handleLogout} 
              />
            }
          />

          <Route
            path="/academic/website/pages"
            element={<PagesPage />}
          />

          <Route
            path="/academic/website/builder"
            element={<BuilderPageAcademic />}
          />
        </Routes>
      </main>

      <BottomNavbar
        currentView={location.pathname}
        cartCount={cartTotalCount}
        onHomeClick={() => navigate("/")}
        onDiscoverClick={() => navigate("/categories?cat=All")}
        onCartClick={() => navigate("/cart")}
        onUserClick={() => navigate(currentUser ? "/profile" : "/auth")}
      />

      <Footer />
      <div className="h-28 md:hidden"></div>
    </div>
  );
}

// Reads :id (id or slug) from the URL and lets ProductPage fetch its own data
function ProductPageWrapper({ onAddToCart }: { onAddToCart: any }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
    return null;
  }

  return (
    <ProductPage
      productId={id}
      onBack={() => navigate(-1)}
      onAddToCart={onAddToCart}
    />
  );
}

function CategoriesPageWrapper({ onProductClick }: { onProductClick: any }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat") || "All";

  return (
    <CategoriesPage
      initialCategory={cat}
      onBack={() => navigate("/")}
      onProductClick={onProductClick}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
