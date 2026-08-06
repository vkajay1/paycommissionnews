import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  HindiCard,
  HindiContent,
  HindiHeader,
  HindiRow,
  hindiHead,
  type HindiFaq,
} from "@/components/hindi/HindiShell";
import { CURRENT_DA } from "@/lib/da-rates";
import { inr } from "@/lib/format";

const PATH = "/8th-pay-commission-arrears-calculator-in-hindi";

const faq: HindiFaq[] = [
  {
    q: "एरियर (बकाया) क्या होता है?",
    a: "जब वेतन संशोधन पिछली तारीख से लागू होता है लेकिन आदेश बाद में जारी होते हैं, तो बीच के महीनों का अंतर एकमुश्त दिया जाता है। इसी राशि को एरियर या बकाया कहते हैं।",
  },
  {
    q: "एरियर कैसे गिनें?",
    a: "पहले हर महीने का नया सकल वेतन निकालें, उसमें से उसी महीने का पुराना सकल वेतन घटाएँ, और फिर इस अंतर को लागू होने की तारीख से आदेश जारी होने तक के महीनों की संख्या से गुणा करें।",
  },
  {
    q: "एरियर पर कटौती लगती है?",
    a: "हाँ। NPS अंशदान नए वेतन के अनुसार समायोजित होता है और पूरी राशि पर आयकर देय होता है क्योंकि भुगतान उसी वित्त वर्ष में मिलता है जिसमें वह प्राप्त हुआ है।",
  },
  {
    q: "धारा 89(1) राहत क्या है?",
    a: "आयकर अधिनियम की धारा 89(1) के तहत आप एरियर को उन वर्षों में बाँटकर कर की गणना करा सकते हैं जिनसे वह संबंधित है। इसके लिए फॉर्म 10E भरना आवश्यक है, वरना राहत नहीं मिलती।",
  },
  {
    q: "क्या पेंशनभोगियों को भी एरियर मिलेगा?",
    a: "हाँ। संशोधित पेंशन भी उसी संदर्भ तिथि से लागू होती है, इसलिए पेंशनभोगियों को मूल पेंशन और महंगाई राहत के अंतर का बकाया मिलता है।",
  },
];

export const Route = createFileRoute(
  "/8th-pay-commission-arrears-calculator-in-hindi",
)({
  head: () =>
    hindiHead({
      path: PATH,
      english: "/8th-pay-commission-arrears-calculator",
      title: "8वां वेतन आयोग एरियर कैलकुलेटर — हिंदी में बकाया गणना",
      description:
        "8वें वेतन आयोग एरियर कैलकुलेटर हिंदी में — लागू तिथि से आदेश तक का वेतन बकाया, DA अंतर और धारा 89(1) कर राहत की पूरी जानकारी।",
      keywords:
        "8वां वेतन आयोग एरियर कैलकुलेटर, salary arrear calculator in hindi, बकाया वेतन गणना, DA एरियर, फॉर्म 10E, धारा 89(1)",
      faq,
      appName: "8वां वेतन आयोग एरियर कैलकुलेटर",
    }),
  component: HindiArrearPage,
});

function HindiArrearPage() {
  const [basic, setBasic] = useState(44900);
  const [fit, setFit] = useState(2.28);
  const [months, setMonths] = useState(18);
  const [hraPct, setHraPct] = useState(30);

  const r = useMemo(() => {
    const curDa = (basic * CURRENT_DA) / 100;
    const curHra = (basic * hraPct) / 100;
    const curGross = basic + curDa + curHra;
    const newBasic = Math.round(basic * fit);
    const newHra = Math.round((newBasic * (hraPct * 0.8)) / 100);
    const newGross = newBasic + newHra;
    const monthly = newGross - curGross;
    const total = monthly * months;
    const nps = Math.round(total * 0.1);
    return { curGross, newBasic, newGross, monthly, total, nps, net: total - nps };
  }, [basic, fit, months, hraPct]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <HindiHeader
        icon={Receipt}
        kicker="एरियर कैलकुलेटर"
        title="8वां वेतन आयोग एरियर कैलकुलेटर (हिंदी)"
        sub="लागू होने की तारीख और आदेश जारी होने के बीच के महीनों का बकाया वेतन जानें।"
        english="/8th-pay-commission-arrears-calculator"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <HindiCard title="अपनी जानकारी भरें">
          <div className="space-y-2">
            <Label>मौजूदा मूल वेतन (₹)</Label>
            <Input
              type="number"
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label>मौजूदा HRA दर (%)</Label>
            <div className="flex gap-2">
              {[30, 20, 10].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHraPct(h)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium ${
                    hraPct === h
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {h}%
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>फिटमेंट फैक्टर</Label>
              <span className="text-sm font-bold text-primary">
                {fit.toFixed(2)}x
              </span>
            </div>
            <Slider
              min={1.5}
              max={3}
              step={0.01}
              value={[fit]}
              onValueChange={(v) => setFit(v[0])}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>बकाया अवधि (महीने)</Label>
              <span className="text-sm font-bold text-primary">{months}</span>
            </div>
            <Slider
              min={1}
              max={36}
              step={1}
              value={[months]}
              onValueChange={(v) => setMonths(v[0])}
            />
            <p className="text-xs text-muted-foreground">
              1 जनवरी 2026 से आदेश जारी होने तक का अनुमान — रिपोर्ट लगभग मई 2027
              तक अपेक्षित है।
            </p>
          </div>
        </HindiCard>

        <div className="grid gap-5 sm:grid-cols-2">
          <HindiCard title="मासिक अंतर">
            <HindiRow label="वर्तमान सकल वेतन" value={inr(r.curGross)} />
            <HindiRow label="संशोधित मूल वेतन" value={inr(r.newBasic)} />
            <HindiRow label="संशोधित सकल वेतन" value={inr(r.newGross)} />
            <HindiRow label="मासिक अंतर" value={inr(r.monthly)} highlight />
          </HindiCard>
          <HindiCard title="कुल बकाया">
            <HindiRow label={`${months} महीने का बकाया`} value={inr(r.total)} highlight />
            <HindiRow label="NPS समायोजन (10%)" value={`− ${inr(r.nps)}`} negative />
            <HindiRow label="अनुमानित शुद्ध भुगतान" value={inr(r.net)} />
          </HindiCard>
        </div>
      </div>

      <HindiContent
        exclude={PATH}
        heading="वेतन बकाया की गणना कैसे करें?"
        intro="एरियर की गणना का आधार बहुत सीधा है — हर महीने का नया वेतन निकालिए, उसी महीने का पुराना वेतन घटाइए और अंतर को महीनों से गुणा कर दीजिए। जटिलता तब आती है जब बीच में DA की नई किस्त जुड़ती है, पदोन्नति होती है या वार्षिक वेतनवृद्धि लगती है, क्योंकि तब हर महीने का अंतर बदल जाता है। नीचे दिए चरण दोनों तरह की स्थिति संभालने में मदद करते हैं।"
        method={[
          {
            title: "चरण 1 — दो तारीखें तय करें",
            body: "पहली तारीख वह है जिससे संशोधन लागू होगा (संभावित रूप से 1 जनवरी 2026) और दूसरी वह जिस महीने से आपको संशोधित वेतन नकद मिलना शुरू होगा। इन दोनों के बीच के महीनों की संख्या ही बकाया अवधि है।",
          },
          {
            title: "चरण 2 — पुराना वेतन जोड़ें",
            body: "हर महीने के लिए मूल वेतन, उस महीने लागू DA, HRA और परिवहन भत्ता जोड़ें। ध्यान रखें कि जुलाई और जनवरी में DA की नई किस्त लागू हो सकती है, इसलिए अलग-अलग अवधि के लिए अलग गणना करें।",
          },
          {
            title: "चरण 3 — नया वेतन जोड़ें",
            body: "संशोधित मूल वेतन पर नए HRA प्रतिशत और परिवहन भत्ते को जोड़ें। नए वेतनमान की शुरुआत में DA शून्य रहता है, इसलिए बकाया अवधि के शुरुआती महीनों में DA जुड़ता नहीं है।",
          },
          {
            title: "चरण 4 — कटौतियाँ घटाएँ",
            body: "बकाया राशि से NPS का 10% अंशदान काटा जाता है और शेष राशि उस वित्त वर्ष की आय में जुड़ती है। बड़ी राशि होने पर धारा 89(1) के तहत फॉर्म 10E भरकर कर का बोझ कई वर्षों में बाँटा जा सकता है।",
          },
        ]}
        formula={[
          "मासिक अंतर = नया सकल वेतन − पुराना सकल वेतन",
          "कुल बकाया = मासिक अंतर × बकाया महीनों की संख्या",
          "DA एरियर = मूल वेतन × (नया DA% − पुराना DA%) / 100 × महीने",
          "NPS समायोजन = कुल बकाया × 10%",
          "शुद्ध भुगतान = कुल बकाया − NPS − देय आयकर",
        ]}
        faq={faq}
      />
    </div>
  );
}
