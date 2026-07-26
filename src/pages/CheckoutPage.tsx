import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Swal from "sweetalert2";
import "animate.css";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  Check,
  Upload,
  MapPin,
  Building2,
  Loader2,
} from "lucide-react";
import { CartItem } from "../types";
import { Governorate, Branch } from "../types/api";
import { paymentGatewayService } from "../services/Paymentgatewayservice";
import {
  governorateService,
  ShippingMethod,
  ShippingConfigResponse,
} from "../services/governorateService";
import { orderService } from "../services/orderService";

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
   Types
   ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */

interface PaymentGateway {
  id: number;
  name: string;
  image: string;
  value: string | null;
  requires_receipt: 0 | 1;
  is_active: 0 | 1;
}

interface UserProfile {
  name?: string;
  email?: string;
  phone?: string;
  phone2?: string;
  address?: string;
  governorate_id?: number;
  branch_id?: number;
}

export interface OrderItemPayload {
  product_id: number | string;
  name: string;
  price: number;
  quantity: number;
  size: string | null;
  line_total: number;
}

export interface OrderPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
    phone2: string | null;
  };
  shipping: {
    address: string;
    shipping_method_id: number | null;
    shipping_method_type: string | null;
    governorate_id: number | null;
    governorate_name: string | null;
    branch_id: number | null;
    branch_name: string | null;
    shipping_cost: number;
  };
  payment: {
    gateway_id: number | null;
    gateway_name: string | null;
    requires_receipt: boolean;
    has_receipt: boolean;
  };
  items: OrderItemPayload[];
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
  };
}

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: (
    method: string,
    gatewayId?: number,
    receipt?: File | null,
    orderData?: OrderPayload,
    orderId?: number,
  ) => void;
  currentUser?: UserProfile;
  key?: React.Key;
}

/* ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
   Component
   ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */

const CheckoutPage = ({
  items,
  onBack,
  onComplete,
  currentUser,
}: CheckoutPageProps) => {
  const [step, setStep] = useState(1);

  // ΓöÇΓöÇ Payment gateways ΓöÇΓöÇ
  const [gateways, setGateways] = useState<PaymentGateway[]>([]);
  const [gatewaysLoading, setGatewaysLoading] = useState(true);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(
    null,
  );
  const [receiptImage, setReceiptImage] = useState<File | null>(null);

  // ΓöÇΓöÇ Shipping method + Governorates / Branches ΓöÇΓöÇ
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(
    null,
  );
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [governoratesLoading, setGovernoratesLoading] = useState(true);
  const [selectedGovernorate, setSelectedGovernorate] =
    useState<Governorate | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  // ΓöÇΓöÇ Form ΓöÇΓöÇ
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    phone2: "",
  });
  const [touched, setTouched] = useState(false);

  // ΓöÇΓöÇ Order submission ΓöÇΓöÇ
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // ┘ü╪▒┘ê╪╣ ╪º┘ä┘à╪¡╪º┘ü╪╕╪⌐ ╪º┘ä┘à╪«╪¬╪º╪▒╪⌐
  const branches = useMemo(
    () => selectedGovernorate?.branches ?? [],
    [selectedGovernorate],
  );

  // ┘ç┘ä ╪º╪«╪¬┘è╪º╪▒ ╪º┘ä┘ü╪▒╪╣ ╪Ñ╪¼╪¿╪º╪▒┘è╪ƒ ╪¿╪│ ┘ä┘à╪º ┘è┘â┘ê┘å ┘ü┘è┘ç ╪ú┘â╪¬╪▒ ┘à┘å ┘ü╪▒╪╣ ┘ê╪º╪¡╪»
  const isBranchRequired = branches.length > 1;

  // ΓöÇΓöÇ ╪¡╪│╪º╪¿ ╪│╪╣╪▒ ╪º┘ä╪┤╪¡┘å ╪¡╪│╪¿ ┘å┘ê╪╣ ╪º┘ä╪╖╪▒┘è┘é╪⌐ ΓöÇΓöÇ
  const shipping = useMemo(() => {
    if (!shippingMethod) {
      return subtotal > 99 ? 0 : 15;
    }

    switch (shippingMethod.type) {
      case "free":
        return 0;

      case "flat":
        return shippingMethod.flat_rate
          ? parseFloat(shippingMethod.flat_rate)
          : 0;

      case "percentage": {
        const pct = shippingMethod.percentage_value
          ? parseFloat(shippingMethod.percentage_value)
          : 0;
        return (subtotal * pct) / 100;
      }

      case "governorate": {
        if (
          selectedBranch &&
          selectedBranch.shipping_price !== null &&
          selectedBranch.shipping_price !== undefined
        ) {
          return selectedBranch.shipping_price;
        }
        if (selectedGovernorate) {
          return selectedGovernorate.shipping_price ?? 0;
        }
        return 0;
      }

      default:
        return subtotal > 99 ? 0 : 15;
    }
  }, [shippingMethod, selectedBranch, selectedGovernorate, subtotal]);

  const total = subtotal + shipping;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ΓöÇΓöÇ ╪¬╪╣╪¿╪ª╪⌐ ╪¿┘è╪º┘å╪º╪¬ ╪º┘ä┘à╪│╪¬╪«╪»┘à ╪¬┘ä┘é╪º╪ª┘è┘ï╪º ΓöÇΓöÇ
  useEffect(() => {
    if (!currentUser) return;
    setFormData((prev) => ({
      name: prev.name || currentUser.name || "",
      email: prev.email || currentUser.email || "",
      address: prev.address || currentUser.address || "",
      phone: prev.phone || currentUser.phone || "",
      phone2: prev.phone2 || currentUser.phone2 || "",
    }));
  }, [currentUser]);

  // ΓöÇΓöÇ ╪¼┘ä╪¿ ╪¿┘ê╪º╪¿╪º╪¬ ╪º┘ä╪»┘ü╪╣ ΓöÇΓöÇ
  useEffect(() => {
    setGatewaysLoading(true);
    paymentGatewayService
      .getAll()
      .then((res) => {
        const active = (res.data ?? []).filter((g) => g.is_active === 1);
        setGateways(active);
        if (active.length > 0) setSelectedGateway(active[0]);
      })
      .finally(() => setGatewaysLoading(false));
  }, []);

  // ΓöÇΓöÇ ╪¼┘ä╪¿ ╪╖╪▒┘è┘é╪⌐ ╪º┘ä╪┤╪¡┘å + ╪º┘ä┘à╪¡╪º┘ü╪╕╪º╪¬ ┘ê┘ü╪▒┘ê╪╣┘ç╪º ΓöÇΓöÇ
  useEffect(() => {
    setGovernoratesLoading(true);
    governorateService
      .getShippingConfig()
      .then((res) => {
        const method = res.data?.shipping_method ?? null;
        const list = res.data?.governorates ?? [];

        setShippingMethod(method);
        setGovernorates(list);

        let initialGov: Governorate | null = null;
        if (currentUser?.governorate_id) {
          initialGov =
            list.find((g) => g.id === currentUser.governorate_id) ?? null;
        }

        if (initialGov) {
          setSelectedGovernorate(initialGov);

          const govBranches = initialGov.branches ?? [];

          if (govBranches.length === 1) {
            setSelectedBranch(govBranches[0]);
          } else if (govBranches.length > 1 && currentUser?.branch_id) {
            const savedBranch = govBranches.find(
              (b) => b.id === currentUser.branch_id,
            );
            if (savedBranch) setSelectedBranch(savedBranch);
          }
        }
      })
      .finally(() => setGovernoratesLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectGovernorate = (govId: number) => {
    const gov = governorates.find((g) => g.id === govId) ?? null;
    setSelectedGovernorate(gov);

    if (!gov) {
      setSelectedBranch(null);
      return;
    }

    const govBranches = gov.branches ?? [];

    if (govBranches.length === 1) {
      setSelectedBranch(govBranches[0]);
    } else {
      setSelectedBranch(null);
    }
  };

  const handleSelectBranch = (branchId: number) => {
    const branch = branches.find((b) => b.id === branchId) ?? null;
    setSelectedBranch(branch);
  };

  const isShippingValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.phone.trim().length >= 8 &&
    selectedGovernorate !== null &&
    (!isBranchRequired || selectedBranch !== null);

  const handleContinue = () => {
    setTouched(true);
    if (isShippingValid) setStep(2);
  };

  // ΓöÇΓöÇ ╪¬╪¼┘ç┘è╪▓ ┘â┘ä ╪º┘ä╪»╪º╪¬╪º ╪º┘ä┘ä┘è ┘ç╪¬╪¬╪¿╪╣╪¬ ┘ä┘ä╪¿╪º┘â ╪º┘å╪» ΓöÇΓöÇ
  const buildOrderPayload = (): OrderPayload => {
    const orderItems: OrderItemPayload[] = items.map((item) => ({
      product_id: item.id ?? "",
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.selectedSize ?? null,
      line_total: item.price * item.quantity,
    }));

    return {
      customer: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        phone2: formData.phone2.trim() || null,
      },
      shipping: {
        address: formData.address.trim(),
        shipping_method_id: shippingMethod?.id ?? null,
        shipping_method_type: shippingMethod?.type ?? null,
        governorate_id: selectedGovernorate?.id ?? null,
        governorate_name: selectedGovernorate?.name ?? null,
        branch_id: selectedBranch?.id ?? null,
        branch_name: selectedBranch?.name ?? null,
        shipping_cost: shipping,
      },
      payment: {
        gateway_id: selectedGateway?.id ?? null,
        gateway_name: selectedGateway?.name ?? null,
        requires_receipt: selectedGateway?.requires_receipt === 1,
        has_receipt: !!receiptImage,
      },
      items: orderItems,
      totals: {
        subtotal,
        shipping,
        total,
      },
    };
  };

  // ΓöÇΓöÇ ╪¬┘å┘ü┘è╪░ ╪º┘ä╪ú┘ê╪▒╪»╪▒: ╪¿┘è┘å╪»┘ç orderService.create ┘ê╪¿╪╣╪»┘è┘å onComplete ΓöÇΓöÇ
  const handleConfirm = async () => {
    if (!selectedGateway || submitting) return;

    const orderData = buildOrderPayload();
    setSubmitError(null);
    setSubmitting(true);

    try {
      const res = await orderService.create(
        orderData,
        selectedGateway.requires_receipt === 1 ? receiptImage : null,
      );

      const orderId = res.data?.data?.order_id;

      // ΓöÇΓöÇ SweetAlert2: ╪▒╪│╪º┘ä╪⌐ ┘å╪¼╪º╪¡ ╪¬┘å┘ü┘è╪░ ╪º┘ä╪╖┘ä╪¿ ΓöÇΓöÇ
      await Swal.fire({
        icon: "success",
        title: "╪¬┘à ╪Ñ┘å╪┤╪º╪í ╪╖┘ä╪¿┘â ╪¿┘å╪¼╪º╪¡! ≡ƒÄë",
        html: `<p style="font-size:14px;color:#6b7280;margin-top:4px;">╪¬┘é╪»╪▒ ╪¬╪¬╪º╪¿╪╣ ╪╖┘ä╪¿┘â ┘à┘å ╪«┘ä╪º┘ä ╪º┘ä┘à┘ä┘ü ╪º┘ä╪┤╪«╪╡┘è ╪¿╪¬╪º╪╣┘â</p>`,
        confirmButtonText: "╪¬┘à╪º┘à",
        confirmButtonColor: "#2563eb",
        background: "#ffffff",
        color: "#0f172a",
        width: "min(90vw, 420px)",
        customClass: {
          popup: "rounded-[2rem] shadow-xl !px-6 !py-8",
          confirmButton: "rounded-2xl px-8 py-3 font-bold",
        },
        buttonsStyling: true,
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });

      onComplete(
        selectedGateway.name,
        selectedGateway.id,
        selectedGateway.requires_receipt === 1 ? receiptImage : null,
        orderData,
        orderId,
      );
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "╪¡╪╡┘ä ╪«╪╖╪ú ╪ú╪½┘å╪º╪í ╪¬┘å┘ü┘è╪░ ╪º┘ä╪╖┘ä╪¿╪î ╪¡╪º┘ê┘ä ╪¬╪º┘å┘è";
      setSubmitError(message);

      // ΓöÇΓöÇ SweetAlert2: ╪▒╪│╪º┘ä╪⌐ ╪«╪╖╪ú ΓöÇΓöÇ
      Swal.fire({
        icon: "error",
        title: "╪¡╪╡┘ä╪¬ ┘à╪┤┘â┘ä╪⌐",
        text: message,
        confirmButtonText: "╪¡╪│┘å╪º┘ï",
        confirmButtonColor: "#ef4444",
        width: "min(90vw, 420px)",
        customClass: {
          popup: "rounded-[2rem] shadow-xl !px-6 !py-8",
          confirmButton: "rounded-2xl px-8 py-3 font-bold",
        },
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-50/50 min-h-screen pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white rounded-full transition-all group shadow-sm bg-white flex-shrink-0"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-8 order-2 lg:order-1">
            {/* Steps Indicator */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-1 sm:px-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${step >= 1 ? "bg-brand-blue text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  1
                </div>
                <span
                  className={`text-xs font-bold ${step >= 1 ? "text-brand-blue" : "text-gray-400"}`}
                >
                  Shipping
                </span>
              </div>
              <div className="h-px w-8 sm:w-12 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${step >= 2 ? "bg-brand-blue text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  2
                </div>
                <span
                  className={`text-xs font-bold ${step >= 2 ? "text-brand-blue" : "text-gray-400"}`}
                >
                  Payment
                </span>
              </div>
            </div>

            {/* ΓöÇΓöÇ Step 1: Shipping ΓöÇΓöÇ */}
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-gray-100"
              >
                <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
                  Shipping Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 focus:outline-none focus:border-brand-blue transition-colors font-medium text-sm"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 focus:outline-none focus:border-brand-blue transition-colors font-medium text-sm"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      placeholder="Street address, apartment, suite, etc."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 focus:outline-none focus:border-brand-blue transition-colors font-medium text-sm"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  {/* ╪▒┘é┘à ╪º┘ä╪¬┘ä┘è┘ü┘ê┘å ╪º┘ä╪Ñ╪¼╪¿╪º╪▒┘è */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className={`w-full bg-gray-50 border rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 focus:outline-none transition-colors font-medium text-sm ${
                        touched && formData.phone.trim().length < 8
                          ? "border-red-300 focus:border-red-400"
                          : "border-gray-100 focus:border-brand-blue"
                      }`}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                    {touched && formData.phone.trim().length < 8 && (
                      <p className="text-[11px] text-red-400 pl-1">
                        ╪▒┘é┘à ╪º┘ä╪¬┘ä┘è┘ü┘ê┘å ┘à╪╖┘ä┘ê╪¿
                      </p>
                    )}
                  </div>

                  {/* ╪▒┘é┘à ╪¬┘ä┘è┘ü┘ê┘å ╪Ñ╪╢╪º┘ü┘è ╪º╪«╪¬┘è╪º╪▒┘è */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                      Alternative Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 focus:outline-none focus:border-brand-blue transition-colors font-medium text-sm"
                      value={formData.phone2}
                      onChange={(e) =>
                        setFormData({ ...formData, phone2: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* ΓöÇΓöÇ ╪º╪«╪¬┘è╪º╪▒ ╪º┘ä┘à╪¡╪º┘ü╪╕╪⌐ ΓöÇΓöÇ */}
                <div className="mt-8 sm:mt-10">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-gray-400" />
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Governorate <span className="text-red-400">*</span>
                    </h3>
                  </div>

                  {governoratesLoading ? (
                    <div className="h-14 rounded-2xl bg-gray-100 animate-pulse" />
                  ) : governorates.length === 0 ? (
                    <p className="text-sm text-gray-400 py-4">
                      No governorates available.
                    </p>
                  ) : (
                    <select
                      className={`w-full bg-gray-50 border rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 focus:outline-none transition-colors font-bold text-sm appearance-none ${
                        touched && !selectedGovernorate
                          ? "border-red-300 focus:border-red-400"
                          : "border-gray-100 focus:border-brand-blue"
                      }`}
                      value={selectedGovernorate?.id ?? ""}
                      onChange={(e) =>
                        handleSelectGovernorate(Number(e.target.value))
                      }
                    >
                      <option value="" disabled>
                        ╪º╪«╪¬╪▒ ╪º┘ä┘à╪¡╪º┘ü╪╕╪⌐
                      </option>
                      {governorates.map((gov) => (
                        <option key={gov.id} value={gov.id}>
                          {gov.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {touched && !selectedGovernorate && (
                    <p className="text-[11px] text-red-400 mt-2 pl-1">
                      ┘à┘å ┘ü╪╢┘ä┘â ╪º╪«╪¬╪▒ ╪º┘ä┘à╪¡╪º┘ü╪╕╪⌐
                    </p>
                  )}
                </div>

                {/* ΓöÇΓöÇ ╪º╪«╪¬┘è╪º╪▒ ╪º┘ä┘ü╪▒╪╣ ΓöÇΓöÇ */}
                <AnimatePresence>
                  {selectedGovernorate && branches.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 sm:mt-8 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 size={16} className="text-gray-400" />
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Branch <span className="text-red-400">*</span>
                        </h3>
                      </div>
                      <select
                        className={`w-full bg-gray-50 border rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 focus:outline-none transition-colors font-bold text-sm appearance-none ${
                          touched && !selectedBranch
                            ? "border-red-300 focus:border-red-400"
                            : "border-gray-100 focus:border-brand-blue"
                        }`}
                        value={selectedBranch?.id ?? ""}
                        onChange={(e) =>
                          handleSelectBranch(Number(e.target.value))
                        }
                      >
                        <option value="" disabled>
                          ╪º╪«╪¬╪▒ ╪º┘ä┘ü╪▒╪╣
                        </option>
                        {branches.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.name}
                          </option>
                        ))}
                      </select>
                      {touched && !selectedBranch && (
                        <p className="text-[11px] text-red-400 mt-2 pl-1">
                          ┘à┘å ┘ü╪╢┘ä┘â ╪º╪«╪¬╪▒ ╪º┘ä┘ü╪▒╪╣
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleContinue}
                  className="w-full mt-8 sm:mt-10 bg-brand-blue hover:bg-blue-600 text-white font-bold py-3.5 sm:py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
                >
                  Continue to Payment
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            ) : (
              /* ΓöÇΓöÇ Step 2: Payment ΓöÇΓöÇ */
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-gray-100">
                  <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
                    Choose Payment Method
                  </h2>

                  {gatewaysLoading && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="h-28 rounded-[2rem] bg-gray-100 animate-pulse"
                        />
                      ))}
                    </div>
                  )}

                  {!gatewaysLoading && gateways.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-8">
                      No payment methods available.
                    </p>
                  )}

                  {!gatewaysLoading && gateways.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {gateways.map((gw) => {
                        const isSelected = selectedGateway?.id === gw.id;
                        return (
                          <button
                            key={gw.id}
                            onClick={() => {
                              setSelectedGateway(gw);
                              setReceiptImage(null);
                            }}
                            className={`p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border-2 transition-all text-left flex items-center gap-4 group ${
                              isSelected
                                ? "border-brand-blue bg-blue-50/50"
                                : "border-gray-50 hover:border-gray-200 bg-white"
                            }`}
                          >
                            <div
                              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0 ${isSelected ? "ring-2 ring-brand-blue" : ""}`}
                            >
                              <img
                                src={`${gw.image}`}
                                alt={gw.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    "/placeholder.png";
                                }}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm mb-1 truncate">
                                {gw.name}
                              </p>
                              {gw.value && (
                                <p className="text-xs text-gray-400 font-mono truncate">
                                  {gw.value}
                                </p>
                              )}
                              {gw.requires_receipt === 1 && (
                                <span className="inline-block mt-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                  Receipt Required
                                </span>
                              )}
                            </div>

                            {isSelected && (
                              <div className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center flex-shrink-0">
                                <Check size={12} />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {selectedGateway && (
                      <motion.div
                        key={selectedGateway.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 sm:mt-8 p-6 sm:p-8 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-5">
                          {selectedGateway.value && (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <p className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                                Transfer To
                              </p>
                              <div className="flex items-center gap-3">
                                <img
                                  src={`${selectedGateway.image}`}
                                  alt={selectedGateway.name}
                                  className="w-7 h-7 rounded-lg object-cover"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                      "/placeholder.png";
                                  }}
                                />
                                <span className="font-black text-brand-dark font-mono text-sm tracking-widest break-all">
                                  {selectedGateway.value}
                                </span>
                              </div>
                            </div>
                          )}

                          {selectedGateway.requires_receipt === 1 && (
                            <div>
                              <p className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-4">
                                Upload Payment Receipt
                              </p>
                              <label className="border-2 border-dashed border-blue-200 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 text-center relative group cursor-pointer hover:bg-white transition-colors flex flex-col items-center">
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  onChange={(e) =>
                                    setReceiptImage(e.target.files?.[0] || null)
                                  }
                                />
                                {receiptImage ? (
                                  <>
                                    <img
                                      src={URL.createObjectURL(receiptImage)}
                                      alt="receipt preview"
                                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl mb-4 shadow-sm"
                                    />
                                    <p className="text-sm font-bold text-brand-dark break-all px-2">
                                      {receiptImage.name}
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-1">
                                      Click to change
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <Upload
                                      size={32}
                                      className="text-blue-300 mb-4 group-hover:scale-110 transition-transform"
                                    />
                                    <p className="text-sm font-bold text-brand-dark mb-1">
                                      Upload Payment Receipt
                                    </p>
                                    <p className="text-[10px] text-gray-400">
                                      PNG, JPG up to 10MB
                                    </p>
                                  </>
                                )}
                              </label>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {submitError && (
                  <p className="text-xs font-bold text-red-500 text-center -mt-2">
                    {submitError}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setStep(1)}
                    disabled={submitting}
                    className="px-8 py-3.5 sm:py-4 rounded-2xl border border-gray-200 font-bold text-gray-500 hover:bg-white transition-all disabled:opacity-50 order-2 sm:order-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={
                      submitting ||
                      !selectedGateway ||
                      (selectedGateway.requires_receipt === 1 && !receiptImage)
                    }
                    className="flex-1 bg-brand-blue hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 sm:py-4 rounded-2xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-3 order-1 sm:order-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        ╪¼╪º╪▒┘è ╪¬┘å┘ü┘è╪░ ╪º┘ä╪╖┘ä╪¿...
                      </>
                    ) : (
                      <>
                        Confirm Order & Pay
                        <Check size={20} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* ΓöÇΓöÇ Order Summary ΓöÇΓöÇ */}
          <div className="lg:col-span-4 order-1 lg:order-2 lg:sticky lg:top-32">
            <div className="bg-white rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
                Order Summary
              </h2>
              <div className="space-y-6 mb-8 overflow-y-auto max-h-[260px] sm:max-h-[300px] pr-2 scrollbar-hide">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img
                        src={item.img}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold line-clamp-1 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 mb-2">
                        Qty: {item.quantity} ΓÇó {item.selectedSize || "M"}
                      </p>
                      <p className="text-xs font-bold text-brand-blue">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-50 mb-6" />

              {selectedGovernorate && (
                <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Delivering to
                  </p>
                  <p className="text-sm font-bold text-brand-dark break-words">
                    {selectedGovernorate.name}
                    {selectedBranch ? ` ΓÇö ${selectedBranch.name}` : ""}
                  </p>
                </div>
              )}

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-brand-dark">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-green-500" : "text-brand-dark"
                    }
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-black text-brand-dark pt-4 border-t border-gray-50 border-dashed">
                  <span>Total</span>
                  <span className="text-brand-blue">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-green-500" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    SSL Secure Payment
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={16} className="text-blue-500" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Fast Tracked Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
