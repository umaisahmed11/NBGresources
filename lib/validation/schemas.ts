import { z } from "zod";

/**
 * Shared form validation schemas (spec §22, §30, §32, §33, §54, §55).
 * Used by both client-side forms and server-side API routes.
 */

const requiredString = (label: string, min = 1) =>
  z.string().trim().min(min, `${label} is required.`).max(5000, "Use at most 5000 characters.");

export const emailField = z.string().trim().email("Enter a valid email address.").max(254);

/* ----------------------------- Contact (spec §35) ----------------------------- */

export const inquiryTypes = [
  "Aircraft",
  "Engines",
  "Parts",
  "Leasing",
  "Consultancy",
  "AOG",
  "Partnership",
  "Careers",
  "General",
] as const;

export const contactSchema = z.object({
  name: requiredString("Name").max(100, "Use at most 100 characters."),
  email: emailField.max(254, "Use at most 254 characters."),
  company: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(50).optional(),
  subject: z.string().trim().max(200).optional(),
  inquiryType: z.enum(inquiryTypes).optional().or(z.literal("")),
  message: requiredString("Message").max(5000, "Use at most 5000 characters."),
  // Honeypot: must remain empty (spec §72 spam protection).
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/* ------------------------------- RFQ (spec §33) ------------------------------- */

export const rfqTypes = [
  "Aircraft",
  "Engine",
  "Parts / Components",
  "Leasing",
  "Consultancy",
  "Other",
] as const;

export type RfqType = (typeof rfqTypes)[number];

export const rfqSchema = z.object({
  rfqType: z.enum(rfqTypes),
  // Common contact block
  company: requiredString("Company"),
  contactName: requiredString("Contact name"),
  email: emailField,
  phone: z.string().trim().optional().or(z.literal("")),
  // Flexible requirement payload — fields differ per type on the client,
  // captured here as an open record so any type can submit.
  details: z.record(z.string().max(100), z.string().max(5000).optional()).optional(),
  notes: z.string().trim().optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export type RfqInput = z.infer<typeof rfqSchema>;

/* ------------------------------- AOG (spec §32) ------------------------------- */

export const aogSchema = z.object({
  company: requiredString("Company"),
  contactName: requiredString("Contact name"),
  email: emailField,
  phone: requiredString("Phone / WhatsApp"),
  aircraftType: z.string().trim().optional().or(z.literal("")),
  aircraftRegistration: z.string().trim().optional().or(z.literal("")),
  msn: z.string().trim().optional().or(z.literal("")),
  partNumber: requiredString("Part number"),
  partDescription: z.string().trim().optional().or(z.literal("")),
  quantity: requiredString("Quantity"),
  conditionAccepted: z.string().trim().optional().or(z.literal("")),
  deliveryAirport: requiredString("Required delivery airport"),
  requiredBy: requiredString("Required by"),
  notes: z.string().trim().optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export type AogInput = z.infer<typeof aogSchema>;

/* ----------------------------- Careers (spec §34) ----------------------------- */

export const careersSchema = z.object({
  name: requiredString("Name"),
  email: emailField,
  phone: z.string().trim().optional().or(z.literal("")),
  location: z.string().trim().optional().or(z.literal("")),
  role: z.string().trim().optional().or(z.literal("")),
  linkedin: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export type CareersInput = z.infer<typeof careersSchema>;

/* ----------------------------- File upload (spec §56) ----------------------------- */

export const ALLOWED_UPLOAD_EXTENSIONS = ["pdf", "xlsx", "xls", "csv", "docx", "txt"] as const;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB reasonable limit (spec §30, §56)
