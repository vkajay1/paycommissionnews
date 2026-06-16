import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-base font-bold">8th CPC Calculator</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Modern salary, pension and arrear estimators for Central Government employees.
            </p>
          </div>
          <FooterCol
            title="Calculators"
            links={[
              { label: "Salary", to: "/salary" },
              { label: "Pension (soon)", to: "/salary" },
              { label: "Arrear (soon)", to: "/salary" },
            ]}
          />
          <FooterCol
            title="Resources"
            links={[
              { label: "About", to: "/" },
              { label: "FAQ", to: "/" },
              { label: "Pay Matrix (soon)", to: "/" },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { label: "Disclaimer", to: "/" },
              { label: "Privacy", to: "/" },
              { label: "Contact", to: "/" },
            ]}
          />
        </div>
        <div className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          Figures shown are estimates based on sample data. Not affiliated with any government body.
          © {new Date().getFullYear()} 8th CPC Calculator.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-foreground/80 transition-colors hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
