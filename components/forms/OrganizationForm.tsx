"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuthedFetch } from "@/lib/use-authed-fetch";
import { useToast } from "../common/ToastProvider";
import { CustomDropdown } from "../ui/CustomDropdown";
import { useRouter } from "next/navigation";

interface OrganizationFormProps {
  mode: "create" | "edit";
  initialData?: Partial<OrganizationFormData>;
  saving: boolean;
  onSubmit: (data: OrganizationFormData) => void;
}

interface PlanOption {
  id: number | string;
  name: string;
  value: string;
}

export interface OrganizationFormData {
  organization_name: string;
  official_email: string;
  organization_type: string;
  industry_sector: string;
  country: string;
  city: string;
  plan: string;
  subdomain: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options?: SelectOption[];
}

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  show: boolean;
  toggle: () => void;
}

export const ORGANIZATION_TYPES = [
  { label: "Educational Institution", value: "education" },
  { label: "Corporate Organization", value: "corporate" },
  { label: "Government Institution", value: "government" },
  { label: "Non-Profit Organization", value: "non_profit" },
  { label: "Religious Organization", value: "religious" },
  { label: "Healthcare Institution", value: "healthcare" },
  { label: "Training / Academy", value: "training" },
  { label: "Event-Based Organization", value: "event" },
  { label: "Other", value: "other" },
];

export const INDUSTRY_SECTORS = [
  { label: "Education", value: "education" },
  { label: "Information Technology", value: "it" },
  { label: "Finance & Banking", value: "finance" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Retail & E-commerce", value: "retail" },
  { label: "Telecommunications", value: "telecom" },
  { label: "Oil & Gas", value: "oil_gas" },
  { label: "Construction & Real Estate", value: "construction" },
  { label: "Transportation & Logistics", value: "logistics" },
  { label: "Hospitality & Tourism", value: "hospitality" },
  { label: "Media & Entertainment", value: "media" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Energy & Utilities", value: "energy" },
  { label: "Government / Public Sector", value: "public_sector" },
  { label: "Non-Profit / NGO", value: "ngo" },
  { label: "Other", value: "other" },
];

export default function OrganizationForm({
  mode,
  initialData,
  onSubmit,
  saving,
}: OrganizationFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const authedFetch = useAuthedFetch();
  const [planOptions, setPlanOptions] = useState<PlanOption[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState<OrganizationFormData>({
    organization_name: initialData?.organization_name || "",
    official_email: initialData?.official_email || "",
    organization_type: initialData?.organization_type || "",
    industry_sector: initialData?.industry_sector || "",
    country: initialData?.country || "Nigeria",
    city: initialData?.city || "",
    plan: initialData?.plan || "",
    subdomain: initialData?.subdomain || "",
    password: "",
    confirm_password: "",
    first_name: initialData?.first_name || "",
    last_name: initialData?.last_name || "",
    email: initialData?.email || "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchPlanOptions = async () => {
      try {
        const res = await authedFetch(
          "/api/dashboard/system_admin_plans_options",
          {
            cache: "no-store",
          },
        );

        if (!res) {
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch plan options");
        }

        const data: unknown = await res.json();
        if (isMounted && Array.isArray(data)) {
          setPlanOptions(data);
        }
      } catch (error) {
        console.error("PLAN_OPTIONS_FETCH_ERROR:", error);
      }
    };

    fetchPlanOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.organization_type) {
      showToast("Please select an organization type", { variant: "error" });
      return;
    }

    if (!formData.industry_sector) {
      showToast("Please select an industry sector", { variant: "error" });
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button onClick={() => router.push("/organizations")}>
            <ArrowLeft className="text-black mr-2" />
          </button>

          <div>
            <h1 className="text-2xl font-bold mb-2 text-black">
              {mode === "create" ? "Add Organization" : "Edit Organization"}
            </h1>
            <p className="text-gray-500">
              Kindly fill all fields to complete the registration process
            </p>
          </div>
        </div>

        <div className="">
          <button
            onClick={handleSubmit}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            {saving && mode === "create"
              ? "Creating..."
              : saving && mode === "edit"
                ? "Updating..."
                : !saving && mode === "create"
                  ? "Create"
                  : "Update"}
          </button>
        </div>
      </div>

      {/* ORGANIZATION INFO */}
      <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
        <h2 className="font-semibold mb-6 text-[#4F4F4F]">
          Organizational Information
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Organization Name"
            name="organization_name"
            value={formData.organization_name}
            onChange={handleChange}
          />

          <Input
            label="Official Email"
            name="official_email"
            value={formData.official_email}
            onChange={handleChange}
          />

          <CustomDropdown
            label="Organization Type"
            name="organization_type"
            value={formData.organization_type}
            onChange={(val) =>
              setFormData({ ...formData, organization_type: val })
            }
            placeholder="Select organization type"
            options={ORGANIZATION_TYPES}
          />

          <CustomDropdown
            label="Industry Sector"
            name="industry_sector"
            value={formData.industry_sector}
            onChange={(val) =>
              setFormData({ ...formData, industry_sector: val })
            }
            placeholder="Select industry sector"
            options={INDUSTRY_SECTORS}
          />

          <Select
            label="Country"
            name="country"
            value="Nigeria"
            disabled={true}
            options={[{ label: "Nigeria", value: "Nigeria" }]}
          />

          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <Select
            label="Plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            options={[
              { label: "Select a plan", value: "" },
              ...planOptions.map((plan) => ({
                label: plan.name,
                value: plan.value,
              })),
            ]}
          />
          <CustomDropdown
            label="Plan"
            name="plan"
            value={formData.plan}
            onChange={(val) => setFormData({ ...formData, plan: val })}
            placeholder="Select a plan"
            options={ORGANIZATION_TYPES}
          />

          <Input
            label="Subdomain"
            name="subdomain"
            value={formData.subdomain}
            onChange={handleChange}
          />

          {mode === "create" && (
            <>
              <PasswordInput
                label="Enter a strong password..."
                name="password"
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                onChange={handleChange}
              />

              <PasswordInput
                label="Confirm Password"
                name="confirm_password"
                show={showConfirm}
                toggle={() => setShowConfirm(!showConfirm)}
                onChange={handleChange}
              />
            </>
          )}
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="font-semibold mb-6 text-[#4F4F4F]">
          Personal Information
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />

          <Input
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />

          <Input
            label="Enter valid email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            {mode === "create" ? "Save" : "Update"}
          </button>
        </div> */}
      </div>
    </div>
  );
}

/* ---------- Reusable Inputs ---------- */

function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        {...props}
        className="p-2 bg-input-bg border border-bd-primary rounded-lg text-sm text-input-text placeholder-sub-text focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <label className="text-xs text-gray-500">{label}</label>
    </div>
  );
}

function Select({ label, options = [], ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <select
        {...props}
        className="p-3 bg-input-bg border border-bd-primary rounded-lg text-sm text-input-text placeholder-sub-text focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label className="text-xs text-gray-500">{label}</label>
    </div>
  );
}

function PasswordInput({ label, show, toggle, ...props }: PasswordInputProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      <input
        type={show ? "text" : "password"}
        {...props}
        className="p-2 bg-input-bg border border-bd-primary rounded-lg text-sm text-input-text placeholder-sub-text focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-2.5 text-gray-500"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
      <label className="text-xs text-gray-500">{label}</label>
    </div>
  );
}
