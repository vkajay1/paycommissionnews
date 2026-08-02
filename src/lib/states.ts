// State & UT salary landing-page data (all 28 states + 8 union territories).
// DA percentages are indicative of the latest publicly reported state rates and
// are used only to power illustrative landing pages.

export type StatePage = {
  slug: string;
  name: string;
  keyword: string;
  employees: string;
  daPct: number;
  adoptionLag: string;
  notes: string;
  cadres: { name: string; level: number; basic: number }[];
};

type Cadre = { name: string; level: number; basic: number };

const c = (name: string, level: number, basic: number): Cadre => ({ name, level, basic });

// Generic cadre ladder used where a state mirrors the central pay matrix.
const GENERIC: Cadre[] = [
  c("Junior Clerk / LDC", 2, 19900),
  c("Junior Assistant", 5, 29200),
  c("Police Sub-Inspector", 6, 35400),
  c("State Civil Services (Entry)", 10, 56100),
  c("Deputy Collector", 11, 67700),
];

const st = (
  slug: string,
  name: string,
  daPct: number,
  employees: string,
  adoptionLag: string,
  notes: string,
  cadres: Cadre[] = GENERIC,
): StatePage => ({
  slug,
  name,
  keyword: `${name.toLowerCase()} 8th pay commission salary`,
  employees,
  daPct,
  adoptionLag,
  notes,
  cadres,
});

export const STATE_PAGES: StatePage[] = [
  st(
    "andhra-pradesh",
    "Andhra Pradesh",
    "24" as unknown as number,
    "",
    "",
    "",
  ),
];

export default STATE_PAGES;
