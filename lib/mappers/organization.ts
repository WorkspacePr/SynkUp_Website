import { OrganizationFormData } from "@/components/forms/OrganizationForm";

export function mapOrganizationToForm(data: any): OrganizationFormData {
  const org = data?.organizational_info || {};
  const admin = data?.admin_info || {};
  const billing = data?.billing_info || {};

  return {
    organization_name: org.name ?? "",
    official_email: org.official_email ?? "",
    organization_type: org.organization_type ?? "",
    industry_sector: org.industry_sector ?? "",
    country: org.country ?? "Nigeria",
    city: org.city ?? "",
    plan: billing.plan ?? "",
    subdomain: org.subdomain ?? "",
    password: "",
    confirm_password: "",
    first_name: admin.first_name ?? "",
    last_name: admin.last_name ?? "",
    email: admin.email ?? "",
  };
}