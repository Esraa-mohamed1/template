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
import CheckoutPage, { OrderPayload } from "./pages/CheckoutPage";

import { User, Order, Transaction, CartItem } from "./types";
import { ProductDetail } from "./types/api";
import { authService, authStorage } from "./services/authService";
import { mapAuthUserToUser } from "./utils/mapUser";
import Swal from "sweetalert2";

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

  // ── الطلب اتنفذ فعليًا جوه CheckoutPage (عن طريق orderService.create اللي بيكلم الـ API) ──
  // هنا بس بنستقبل النتيجة، نحدث الـ state المحلي، ونعمل تنقل
  const handleCheckoutComplete = (
    method: string,
    gatewayId?: number,
    receipt?: File | null,
    orderData?: OrderPayload,
    orderId?: number,
  ) => {
    if (!currentUser) {
      navigate("/auth");
      return;
    }

    if (orderId && orderData) {
      const newOrder: Order = {
        id: orderId,
        items: orderData.items,
        total: orderData.totals.total,
        status: "pending",
        createdAt: new Date().toISOString(),
      } as unknown as Order;

      const newTransaction: Transaction = {
        id: orderId,
        orderId,
        amount: orderData.totals.total,
        method,
        status: "pending",
        createdAt: new Date().toISOString(),
      } as unknown as Transaction;

      setOrders((prev) => [newOrder, ...prev]);
      setTransactions((prev) => [newTransaction, ...prev]);
    }

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
      />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onProductClick={(p: { slug?: string; id: string }) =>
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
                onLoginRequired={() => navigate("/auth")}
                onCheckout={() => {
                  if (currentUser) {
                    navigate("/checkout");
                  } else {
                    Swal.fire({
                      icon: "info",
                      title: "سجّل دخولك الأول",
                      text: "لازم تسجل دخول عشان تكمل عملية الشراء",
                      confirmButtonText: "تمام",
                      confirmButtonColor: "#2563eb",
                    });
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
                currentUser={currentUser ?? undefined}
              />
            }
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
      onNavigateToLogin={() => navigate("/auth")}
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
