import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="text-base font-bold">8th CPC Calculator</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Modern salary, pension and arrear estimators for Central Government employees.
            </p>
          </div>
          <FooterCol
            title="Calculators"
            links={[
              { label: "Salary Calculator", to: "/salary" },
              { label: "Pension Calculator", to: "/pension" },
              { label: "Arrear Calculator", to: "/arrear" },
              { label: "DA Calculator", to: "/da-calculator" },
              { label: "MACP & Pay Fixation", to: "/macp-calculator" },
              { label: "6th CPC Calculator", to: "/6th-pay-commission-calculator" },
            ]}
          />
          <FooterCol
            title="Resources"
            links={[
              { label: "Fitment Factor Table", to: "/fitment-factor" },
              { label: "Pay Matrix Levels", to: "/pay-level" },
              { label: "State-wise Salary", to: "/state" },
              { label: "Role-wise Salary", to: "/role" },
              { label: "Blog & News", to: "/blog" },
            ]}
          />

          <FooterCol
            title="State pages"
            links={[
              { label: "8th CPC Tamil Nadu", to: "/8th-pay-commission-tamil-nadu" },
              { label: "8th CPC Maharashtra", to: "/8th-pay-commission-maharashtra" },
              { label: "8th CPC Uttar Pradesh", to: "/8th-pay-commission-uttar-pradesh" },
              { label: "8th CPC West Bengal", to: "/8th-pay-commission-west-bengal" },
              { label: "8th CPC Odisha", to: "/8th-pay-commission-odisha" },
            ]}
          />


          <FooterCol
            title="हिंदी में"
            links={[
              { label: "सैलरी कैलकुलेटर", to: "/8th-pay-commission-salary-calculator-in-hindi" },
              { label: "पेंशन कैलकुलेटर", to: "/8th-pay-commission-pension-calculator-in-hindi" },
              { label: "एरियर कैलकुलेटर", to: "/8th-pay-commission-arrears-calculator-in-hindi" },
              { label: "DA कैलकुलेटर", to: "/da-calculator-in-hindi" },
              { label: "फिटमेंट फैक्टर", to: "/fitment-factor-in-hindi" },
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
