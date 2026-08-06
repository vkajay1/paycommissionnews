import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
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
import { PAY_LEVELS } from "@/lib/pay-matrix";
import { compareSalary, type City } from "@/lib/cpc";
import { CURRENT_DA } from "@/lib/da-rates";
import { inr, num } from "@/lib/format";

const PATH = "/8th-pay-commission-salary-calculator-in-hindi";

const faq: HindiFaq[] = [
  {
    q: "8वां वेतन आयोग कब से लागू होगा?",
    a: "आयोग 3 नवंबर 2025 को अधिसूचित हुआ और रिपोर्ट लगभग मई 2027 तक अपेक्षित है। संशोधन की संदर्भ तिथि 1 जनवरी 2026 मानी जा रही है, इसलिए आदेश जारी होने पर पिछली तारीख से एरियर मिलने की संभावना है।",
  },
  {
    q: "फिटमेंट फैक्टर कितना होगा?",
    a: "सरकार ने कोई आंकड़ा तय नहीं किया है। कर्मचारी संगठन 2.28x से 2.86x तक मांग रहे हैं, जबकि वित्त मंत्रालय का शुरुआती रुख 1.82x से 1.92x के आसपास बताया जाता है। इस कैलकुलेटर में आप स्लाइडर से कोई भी मान चुन सकते हैं।",
  },
  {
    q: "नया मूल वेतन कैसे निकालें?",
    a: "मौजूदा मूल वेतन को फिटमेंट फैक्टर से गुणा करें और परिणाम को पे मैट्रिक्स के अगले उपलब्ध सेल पर पूर्णांकित करें। उदाहरण के लिए ₹44,900 × 2.28 = ₹1,02,372, जो मैट्रिक्स में लगभग ₹1,02,400 बनेगा।",
  },
  {
    q: "नए वेतन पर DA कितना मिलेगा?",
    a: "जब भी नया वेतनमान लागू होता है, DA शून्य से फिर शुरू होता है क्योंकि पुराना DA मूल वेतन में समाहित हो जाता है। 7वें वेतन आयोग में भी यही हुआ था। इसलिए शुरुआत में बढ़ोतरी केवल मूल वेतन और HRA/TA में दिखती है।",
  },
  {
    q: "HRA और परिवहन भत्ता कैसे बदलेगा?",
    a: "HRA नए वेतन पर 24/16/8 प्रतिशत (X/Y/Z शहर) से दोबारा शुरू होने की संभावना है और DA 25% व 50% पार करने पर क्रमशः 27/18/9 तथा 30/20/10 प्रतिशत हो जाता है। परिवहन भत्ता स्तर के अनुसार तय रहता है और उस पर मौजूदा DA जुड़ता है।",
  },
  {
    q: "क्या यह कैलकुलेटर सरकारी है?",
    a: "नहीं। यह एक स्वतंत्र अनुमान उपकरण है जो सार्वजनिक रूप से उपलब्ध पे मैट्रिक्स और चर्चित फिटमेंट परिदृश्यों पर आधारित है। अंतिम आंकड़े अधिसूचना के बाद ही मान्य होंगे।",
  },
];

export const Route = createFileRoute(
  "/8th-pay-commission-salary-calculator-in-hindi",
)({
  head: () =>
    hindiHead({
      path: PATH,
      english: "/salary",
      title:
        "8वां वेतन आयोग सैलरी कैलकुलेटर 2026 — हिंदी में वेतन गणना",
      description:
        "8वें वेतन आयोग सैलरी कैलकुलेटर हिंदी में — फिटमेंट फैक्टर, DA 60%, HRA, TA और नए मूल वेतन का तुरंत अनुमान लगाएं। केंद्रीय और राज्य कर्मचारियों के लिए मुफ्त।",
      keywords:
        "8वां वेतन आयोग, 8th pay commission salary calculator in hindi, 8वां वेतन आयोग कैलकुलेटर, फिटमेंट फैक्टर, वेतन गणना हिंदी, 8 CPC सैलरी कैलकुलेटर",
      faq,
      appName: "8वां वेतन आयोग सैलरी कैलकुलेटर",
    }),
  component: HindiSalaryPage,
});

function HindiSalaryPage() {
  const [level, setLevel] = useState(7);
  const [basic, setBasic] = useState(44900);
  const [city, setCity] = useState<City>("X");
  const [fit, setFit] = useState(2.28);

  const r = useMemo(
    () =>
      compareSalary({
        level,
        basicPay: basic,
        city,
        daPct: CURRENT_DA,
        fitmentFactor: fit,
      }),
    [level, basic, city, fit],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <HindiHeader
        icon={Wallet}
        kicker="सैलरी कैलकुलेटर"
        title="8वां वेतन आयोग सैलरी कैलकुलेटर (हिंदी)"
        sub="अपना वेतन स्तर, मूल वेतन, शहर श्रेणी और फिटमेंट फैक्टर चुनें — संशोधित वेतन का अनुमान तुरंत दिखेगा।"
        english="/salary"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <HindiCard title="अपनी जानकारी भरें">
          <div className="space-y-2">
            <Label>वेतन स्तर (Pay Level)</Label>
            <select
              value={level}
              onChange={(e) => {
                const l = Number(e.target.value);
                setLevel(l);
                const found = PAY_LEVELS.find((p) => p.level === l);
                if (found) setBasic(found.entryPay);
              }}
              className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              {PAY_LEVELS.map((p) => (
                <option key={p.level} value={p.level}>
                  स्तर {p.level} — {p.grade} (₹{num(p.entryPay)})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>मौजूदा मूल वेतन (₹)</Label>
            <Input
              type="number"
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label>शहर श्रेणी (HRA)</Label>
            <div className="flex gap-2">
              {(["X", "Y", "Z"] as City[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                    city === c
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {c} श्रेणी
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
            <p className="text-xs text-muted-foreground">
              मौजूदा DA {CURRENT_DA}% मानकर गणना — संशोधन के बाद DA शून्य से
              दोबारा शुरू होता है।
            </p>
          </div>
        </HindiCard>

        <div className="grid gap-5 sm:grid-cols-2">
          <HindiCard title="वर्तमान वेतन (7वां वेतन आयोग)">
            <HindiRow label="मूल वेतन" value={inr(r.current.basic)} />
            <HindiRow
              label={`महंगाई भत्ता (${CURRENT_DA}%)`}
              value={inr(r.current.da)}
            />
            <HindiRow label="मकान किराया भत्ता" value={inr(r.current.hra)} />
            <HindiRow label="परिवहन भत्ता" value={inr(r.current.ta)} />
            <HindiRow label="कुल सकल वेतन" value={inr(r.current.gross)} highlight />
          </HindiCard>

          <HindiCard title="अनुमानित वेतन (8वां वेतन आयोग)">
            <HindiRow label="नया मूल वेतन" value={inr(r.projected.basic)} />
            <HindiRow label="महंगाई भत्ता (0%)" value={inr(r.projected.da)} />
            <HindiRow label="मकान किराया भत्ता" value={inr(r.projected.hra)} />
            <HindiRow label="परिवहन भत्ता" value={inr(r.projected.ta)} />
            <HindiRow label="कुल सकल वेतन" value={inr(r.projected.gross)} highlight />
          </HindiCard>

          <div className="sm:col-span-2">
            <HindiCard title="वृद्धि का सार">
              <HindiRow label="मासिक बढ़ोतरी" value={inr(r.diff)} highlight />
              <HindiRow
                label="प्रतिशत वृद्धि"
                value={`${r.pct.toFixed(1)}%`}
              />
              <HindiRow label="वार्षिक बढ़ोतरी" value={inr(r.diff * 12)} />
            </HindiCard>
          </div>
        </div>
      </div>

      <HindiContent
        exclude={PATH}
        heading="8वां वेतन आयोग सैलरी कैलकुलेटर क्या है?"
        intro="यह कैलकुलेटर आपको बताता है कि 8वें वेतन आयोग की सिफारिशें लागू होने पर आपका मूल वेतन, भत्ते और कुल मासिक वेतन कितना हो सकता है। आप मौजूदा मूल वेतन और वेतन स्तर डालते हैं, फिटमेंट फैक्टर चुनते हैं, और पेज पर वर्तमान तथा संशोधित वेतन की तुलना तुरंत दिख जाती है। सभी आंकड़े केंद्र सरकार के कर्मचारियों के लिए प्रचलित पे मैट्रिक्स संरचना पर आधारित हैं और राज्य कर्मचारी भी अपने राज्य के समान स्तर के अनुसार अनुमान लगा सकते हैं।"
        method={[
          {
            title: "चरण 1 — DA का विलय",
            body: "नया वेतनमान बनाते समय आयोग पहले मौजूदा मूल वेतन में उस तारीख का DA जोड़ता है। 1 जनवरी 2026 को DA 60% है, इसलिए विलय आधार मूल वेतन का 1.60 गुना बनता है। यही आधार आगे की गणना का शुरुआती बिंदु होता है।",
          },
          {
            title: "चरण 2 — वास्तविक बढ़ोतरी जोड़ना",
            body: "विलय आधार पर आयोग एक अतिरिक्त वास्तविक वृद्धि देता है। 7वें वेतन आयोग में यह लगभग 14.29% थी, जिससे कुल गुणक 2.57 बना। 8वें आयोग में यदि वही तरीका दोहराया जाए तो गुणक 1.82x के आसपास रहेगा; अधिक उदार सिफारिश पर यह 2.28x या इससे ऊपर जा सकता है।",
          },
          {
            title: "चरण 3 — मैट्रिक्स सेल पर पूर्णांकन",
            body: "गुणा करने के बाद जो राशि बनती है उसे आपके वेतन स्तर के पे मैट्रिक्स में उससे बराबर या ऊपर वाले पहले सेल पर तय किया जाता है। इसी कारण दो कर्मचारियों का गणित एक जैसा होने पर भी अंतिम आंकड़ा कुछ सौ रुपये अलग हो सकता है।",
          },
          {
            title: "चरण 4 — भत्तों की पुनर्गणना",
            body: "नए मूल वेतन पर HRA X श्रेणी में 24%, Y में 16% और Z में 8% से दोबारा शुरू होता है, और DA फिर से शून्य से बढ़ना शुरू करता है। परिवहन भत्ता स्तर के अनुसार तय राशि रहती है जिस पर उस समय का DA जुड़ता है। NPS अंशदान, CGHS और CGEGIS कटौतियाँ नए वेतन पर लागू होती हैं।",
          },
        ]}
        formula={[
          "विलय आधार = मूल वेतन × (1 + DA%/100)",
          "नया मूल वेतन = मौजूदा मूल वेतन × फिटमेंट फैक्टर",
          "HRA = नया मूल वेतन × 24% / 16% / 8% (X / Y / Z)",
          "सकल वेतन = नया मूल वेतन + DA + HRA + परिवहन भत्ता",
          "मासिक लाभ = नया सकल वेतन − वर्तमान सकल वेतन",
        ]}
        faq={faq}
      />
    </div>
  );
}
