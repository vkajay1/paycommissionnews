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

const MIRRORS_CENTRE =
  "The state Revised Pay Rules replicate the central 7th CPC pay matrix level for level, so an 8th CPC fitment factor applied to the central matrix gives a close projection for state employees too.";

export const STATE_PAGES: StatePage[] = [
  st(
    "andhra-pradesh",
    "Andhra Pradesh",
    24,
    "~7 lakh employees & ~4 lakh pensioners",
    "Andhra Pradesh appoints its own Pay Revision Commission (PRC) roughly every five years rather than adopting the central CPC directly.",
    "Andhra Pradesh uses PRC master scales with a state fitment (27% in the 11th PRC). After the 8th CPC is notified, the next AP PRC is expected to benchmark its master scale revision to central levels.",
    [
      c("Junior Assistant", 2, 19900),
      c("Secretariat Assistant", 5, 29200),
      c("Sub-Inspector of Police", 6, 35400),
      c("Group-I Officer (APPSC)", 10, 56100),
      c("Deputy Collector", 11, 67700),
    ],
  ),
  st(
    "arunachal-pradesh",
    "Arunachal Pradesh",
    58,
    "~60,000 employees & pensioners",
    "Arunachal Pradesh adopts central CPC recommendations almost verbatim, usually within 3–6 months.",
    MIRRORS_CENTRE + " Arunachal also pays a Special Compensatory (Remote Locality) Allowance on top.",
  ),
  st(
    "assam",
    "Assam",
    50,
    "~4.5 lakh employees & 2.5 lakh pensioners",
    "Assam adopts the central pay matrix through the Assam Services (ROP) Rules, typically 6–12 months after the centre.",
    MIRRORS_CENTRE + " Assam's ROP rules retained the 14 pay-band structure mapped onto central levels.",
  ),
  st(
    "bihar",
    "Bihar",
    58,
    "~4 lakh employees & 5 lakh pensioners",
    "Bihar adopts central CPC recommendations directly and usually notifies within 6 months.",
    MIRRORS_CENTRE + " Bihar has historically matched central DA rates announcement-for-announcement.",
    [
      c("Panchayat Secretary", 2, 19900),
      c("Revenue Karamchari", 3, 21700),
      c("Bihar Police SI", 6, 35400),
      c("BPSC Civil Services (Entry)", 10, 56100),
      c("SDM / Deputy Collector", 11, 67700),
    ],
  ),
  st(
    "chhattisgarh",
    "Chhattisgarh",
    53,
    "~4 lakh employees & pensioners",
    "Chhattisgarh follows the central pay matrix with a 6–12 month adoption lag.",
    MIRRORS_CENTRE,
  ),
  st(
    "goa",
    "Goa",
    58,
    "~55,000 employees & pensioners",
    "Goa adopts central CPC recommendations with minimal modification, usually within 3–6 months.",
    MIRRORS_CENTRE + " Goa pays central-rate DA and HRA using the Y-class classification for Panaji.",
  ),
  st(
    "gujarat",
    "Gujarat",
    55,
    "~9 lakh employees & pensioners",
    "Gujarat adopts central CPC recommendations with a short 3–6 month lag.",
    MIRRORS_CENTRE + " Gujarat has consistently matched central DA instalments.",
    [
      c("Junior Clerk", 2, 19900),
      c("Bin-Sachivalay Clerk", 3, 21700),
      c("Police Sub-Inspector", 6, 35400),
      c("GPSC Class 1-2 Officer", 10, 56100),
      c("Deputy Collector", 11, 67700),
    ],
  ),
  st(
    "haryana",
    "Haryana",
    55,
    "~3.5 lakh employees & 2.5 lakh pensioners",
    "Haryana adopts the central pay matrix and DA rates, typically within 3–6 months.",
    MIRRORS_CENTRE + " Gurugram and Faridabad employees draw HRA at the higher city slab.",
  ),
  st(
    "himachal-pradesh",
    "Himachal Pradesh",
    45,
    "~2.2 lakh employees & 1.9 lakh pensioners",
    "Himachal appoints a state pay commission that maps central levels onto HP scales, usually 12–24 months later.",
    "Himachal implemented the 7th CPC-linked revision with a 2.25 fitment. Given the state's fiscal position, 8th CPC alignment may be phased with arrears released in instalments.",
  ),
  st(
    "jharkhand",
    "Jharkhand",
    58,
    "~2.5 lakh employees & pensioners",
    "Jharkhand adopts central CPC recommendations directly, usually within 6 months.",
    MIRRORS_CENTRE,
  ),
  st(
    "karnataka",
    "Karnataka",
    "" as unknown as number || 33,
    "~7.5 lakh employees & 5.7 lakh pensioners",
    "Karnataka runs its own State Pay Commission (7th State Pay Commission implemented a 27.5% fitment) rather than adopting the central CPC.",
    "Karnataka uses state master scales with its own DA formula. The next state pay commission is expected to reference 8th CPC levels while retaining the state master-scale structure.",
    [
      c("Second Division Assistant", 2, 19900),
      c("First Division Assistant", 5, 29200),
      c("Police Sub-Inspector", 6, 35400),
      c("KAS Officer (Entry)", 10, 56100),
      c("Assistant Commissioner", 11, 67700),
    ],
  ),
  st(
    "kerala",
    "Kerala",
    12,
    "~5.2 lakh employees & 6 lakh pensioners",
    "Kerala constitutes a Pay Revision Commission every five years, independent of the central CPC.",
    "Kerala's 11th Pay Revision Commission fixed a minimum pay of ₹23,000 with its own DA formula. Kerala DA instalments run behind the central rate, so pending DA arrears are a major component of any revision.",
    [
      c("LD Clerk", 2, 19900),
      c("UD Clerk / Assistant", 5, 29200),
      c("Sub-Inspector of Police", 6, 35400),
      c("Kerala Administrative Service", 10, 56100),
      c("Deputy Collector", 11, 67700),
    ],
  ),
  st(
    "madhya-pradesh",
    "Madhya Pradesh",
    55,
    "~7 lakh employees & 4.5 lakh pensioners",
    "Madhya Pradesh adopts the central pay matrix; DA instalments usually follow the centre with a 3–9 month lag.",
    MIRRORS_CENTRE + " MP pensioners' DR is shared with Chhattisgarh under the state reorganisation rules.",
  ),
  st(
    "maharashtra",
    "Maharashtra",
    55,
    "~19 lakh employees & pensioners",
    "Maharashtra's Bakshi Committee has historically mirrored central pay revisions with a 12–18 month lag.",
    "Maharashtra's MCSR pay rules follow the central pay matrix and the state has consistently adopted central DA rates without deviation.",
    [
      c("Clerk-Typist (MPSC)", 4, 25500),
      c("Talathi", 4, 25500),
      c("Police Sub-Inspector", 6, 35400),
      c("MPSC State Services (Deputy Collector)", 11, 67700),
    ],
  ),
  st(
    "manipur",
    "Manipur",
    50,
    "~80,000 employees & pensioners",
    "Manipur adopts central CPC recommendations with a 6–18 month lag depending on central assistance.",
    MIRRORS_CENTRE,
  ),
  st(
    "meghalaya",
    "Meghalaya",
    50,
    "~65,000 employees & pensioners",
    "Meghalaya constitutes a state pay commission that maps central levels onto state scales.",
    MIRRORS_CENTRE,
  ),
  st(
    "mizoram",
    "Mizoram",
    50,
    "~40,000 employees & pensioners",
    "Mizoram adopts central CPC recommendations, generally within 12 months.",
    MIRRORS_CENTRE,
  ),
  st(
    "nagaland",
    "Nagaland",
    50,
    "~55,000 employees & pensioners",
    "Nagaland adopts the central pay matrix with a 6–12 month lag.",
    MIRRORS_CENTRE,
  ),
  st(
    "odisha",
    "Odisha",
    55,
    "~4.5 lakh regular employees + 4 lakh pensioners",
    "Odisha typically adopts central CPC recommendations within 6–12 months of central rollout.",
    "The Odisha Revised Pay Rules mirror the central pay matrix. Once the 8th CPC is notified, Odisha ORP is expected to follow with matching level-wise revision.",
    [
      c("Junior Clerk", 2, 19900),
      c("Junior Assistant", 5, 29200),
      c("OAS (Group A Entry)", 10, 56100),
      c("OES / OMS", 10, 56100),
    ],
  ),
  st(
    "punjab",
    "Punjab",
    38,
    "~3.5 lakh employees & 3 lakh pensioners",
    "Punjab appoints its own pay commission; the 6th Punjab Pay Commission applied a 2.59 multiplication factor.",
    "Punjab uses state pay bands derived from central levels with a 2.59 factor and lags on DA instalments, so DA arrears usually accompany any revision.",
  ),
  st(
    "rajasthan",
    "Rajasthan",
    55,
    "~8 lakh employees & 4.5 lakh pensioners",
    "Rajasthan adopts central CPC recommendations directly under the RCS (Revised Pay) Rules, usually within 6 months.",
    MIRRORS_CENTRE + " Rajasthan has matched central DA rates instalment for instalment.",
    [
      c("Lower Division Clerk", 2, 19900),
      c("Patwari", 3, 21700),
      c("Police Sub-Inspector", 6, 35400),
      c("RAS Officer (Entry)", 10, 56100),
      c("Sub-Divisional Magistrate", 11, 67700),
    ],
  ),
  st(
    "sikkim",
    "Sikkim",
    50,
    "~40,000 employees & pensioners",
    "Sikkim adopts central CPC recommendations with a 6–12 month lag.",
    MIRRORS_CENTRE,
  ),
  st(
    "tamil-nadu",
    "Tamil Nadu",
    55,
    "~16 lakh employees & pensioners",
    "Tamil Nadu follows central CPC with an official state pay committee — usually a 12–18 month lag.",
    "Tamil Nadu constitutes its own State Pay Commission which reviews central 8th CPC recommendations before notifying the revised TNRP rules.",
    [
      c("Village Administrative Officer", 3, 21700),
      c("Assistant, TN Secretariat", 6, 35400),
      c("TNPSC Group I Officer", 10, 56100),
      c("Deputy Collector", 11, 67700),
    ],
  ),
  st(
    "telangana",
    "Telangana",
    24,
    "~5 lakh employees & 3 lakh pensioners",
    "Telangana appoints its own Pay Revision Commission; the last PRC gave a 30% fitment.",
    "Telangana uses PRC master scales with a state DA formula. An 8th CPC notification is expected to influence the next Telangana PRC's fitment benchmark.",
    [
      c("Junior Assistant", 2, 19900),
      c("Senior Assistant", 5, 29200),
      c("Sub-Inspector of Police", 6, 35400),
      c("Group-I Officer (TGPSC)", 10, 56100),
      c("Deputy Collector", 11, 67700),
    ],
  ),
  st(
    "tripura",
    "Tripura",
    40,
    "~1.4 lakh employees & pensioners",
    "Tripura adopts the central pay matrix through state ROP rules with a 12–18 month lag.",
    MIRRORS_CENTRE + " Tripura DA has historically trailed the central rate.",
  ),
  st(
    "uttar-pradesh",
    "Uttar Pradesh",
    55,
    "~16 lakh employees & 12 lakh pensioners",
    "Uttar Pradesh generally adopts central CPC recommendations within 6–9 months.",
    "The UP Revised Pay Rules replicate the central pay matrix. State DA is aligned with the central rate and is expected to be rebased to 0% on 8th CPC implementation.",
    [
      c("Junior Assistant (UPSSSC)", 2, 19900),
      c("Lekhpal", 3, 21700),
      c("PCS (Entry)", 10, 56100),
      c("PCS-J Judge", 11, 67700),
    ],
  ),
  st(
    "uttarakhand",
    "Uttarakhand",
    55,
    "~2.7 lakh employees & pensioners",
    "Uttarakhand adopts central CPC recommendations almost immediately, usually within 3–6 months.",
    MIRRORS_CENTRE + " Uttarakhand pays central-rate DA and a hill compensatory allowance in notified areas.",
  ),
  st(
    "west-bengal",
    "West Bengal",
    18,
    "~10 lakh employees & pensioners",
    "West Bengal has historically followed its own ROPA — expect delayed 8th CPC alignment.",
    "West Bengal follows its own Revision of Pay & Allowances (ROPA) rules with a state-specific DA rate. 8th CPC alignment is expected but usually with modifications, and pending DA arrears remain under litigation.",
    [
      c("LDA (WBCS Support)", 6, 22700),
      c("Sub-Inspector (WBP)", 10, 32100),
      c("WBCS Executive (Entry)", 16, 56100),
    ],
  ),

  // ---------------- Union Territories ----------------
  st(
    "delhi",
    "Delhi",
    58,
    "~4.5 lakh employees & pensioners (GNCTD + local bodies)",
    "Delhi employees are on central scales and get 8th CPC benefits from the same date as central government staff.",
    "GNCTD employees draw the central pay matrix, central DA and X-class HRA (30% of basic pre-revision), so 8th CPC revision applies directly without a state lag.",
    [
      c("Multi-Tasking Staff", 1, 18000),
      c("Junior Assistant (DSSSB)", 2, 19900),
      c("Delhi Police Constable", 3, 21700),
      c("Assistant Teacher (DoE)", 7, 44900),
      c("DANICS Officer (Entry)", 10, 56100),
    ],
  ),
  st(
    "jammu-kashmir",
    "Jammu & Kashmir",
    58,
    "~4.5 lakh employees & pensioners",
    "Since reorganisation, J&K follows central pay rules, so 8th CPC benefits apply on the central date.",
    "J&K UT employees are on the central pay matrix with central DA. Winter/remote-area allowances are paid over and above the revised pay.",
  ),
  st(
    "ladakh",
    "Ladakh",
    58,
    "~25,000 employees & pensioners",
    "Ladakh UT follows central pay rules with same-date 8th CPC applicability.",
    "Ladakh employees draw the central pay matrix plus Special Duty Allowance and high-altitude allowances, which are revised with the pay commission.",
  ),
  st(
    "chandigarh",
    "Chandigarh",
    58,
    "~40,000 employees & pensioners",
    "Chandigarh administration employees are on central scales and receive 8th CPC benefits from the central date.",
    MIRRORS_CENTRE + " Chandigarh is classified as a Y-class city for HRA purposes.",
  ),
  st(
    "puducherry",
    "Puducherry",
    58,
    "~65,000 employees & pensioners",
    "Puducherry follows central pay rules, so revision applies from the central implementation date.",
    MIRRORS_CENTRE,
  ),
  st(
    "andaman-nicobar",
    "Andaman & Nicobar Islands",
    58,
    "~20,000 employees & pensioners",
    "A&N Administration employees are on central scales with same-date 8th CPC applicability.",
    MIRRORS_CENTRE + " Island Special Duty Allowance is paid as a percentage of basic pay, so it rises with the fitment factor.",
  ),
  st(
    "lakshadweep",
    "Lakshadweep",
    58,
    "~8,000 employees & pensioners",
    "Lakshadweep Administration employees follow central pay rules directly.",
    MIRRORS_CENTRE + " Island Special Duty Allowance and free ration privileges apply in addition.",
  ),
  st(
    "dadra-nagar-haveli-daman-diu",
    "Dadra & Nagar Haveli and Daman & Diu",
    58,
    "~12,000 employees & pensioners",
    "The merged UT follows central pay rules with same-date 8th CPC applicability.",
    MIRRORS_CENTRE,
  ),
];

export function getStatePage(slug: string): StatePage | undefined {
  return STATE_PAGES.find((s) => s.slug === slug);
}
