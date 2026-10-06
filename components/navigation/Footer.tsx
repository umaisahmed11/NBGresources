import Link from "next/link";
import { company } from "@/content/company";
import { footerNav } from "@/content/navigation";
import { PlaceholderValue } from "@/components/ui/Placeholder";

/** Global footer (spec §38). Restrained — not overcrowded. */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-carbon text-text-light">
      <div className="mx-auto max-w-[1520px] px-[18px] py-16 sm:px-8 lg:px-14 lg:py-20 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <span className="font-display text-[16px] font-semibold uppercase tracking-[0.14em]">
              Northbridge Global Resources
            </span>
            <p className="mt-4 text-[15px] leading-relaxed text-text-muted-dark">
              {company.tagline}
            </p>
          </div>

          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Capabilities" links={footerNav.capabilities} />
          <FooterColumn title="Support" links={footerNav.support} />
          <FooterColumn title="Legal" links={footerNav.legal} />
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <FooterMeta label="Email">
            <PlaceholderValue value={company.contact.generalEmail} />
          </FooterMeta>
          <FooterMeta label="Phone">
            <PlaceholderValue value={company.contact.phone} />
          </FooterMeta>
          <FooterMeta label="Address">
            <PlaceholderValue value={company.contact.address} />
          </FooterMeta>
          <FooterMeta label="Connect">
            <PlaceholderValue value="LinkedIn" href={company.social.linkedin} />
          </FooterMeta>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-[12px] text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {company.year} {company.legalName}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.14em]">New York | Serving Global Aviation Markets</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[14px] text-text-muted-dark transition-colors duration-200 hover:text-text-light"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterMeta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate">{label}</p>
      <div className="mt-2 text-[14px] text-text-muted-dark">{children}</div>
    </div>
  );
}
