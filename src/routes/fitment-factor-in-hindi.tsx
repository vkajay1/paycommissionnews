import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sigma } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const PATH = "/fitment-factor-in-hindi";

const SCENARIOS = [
  { factor: 1.82, who: "वित्त मंत्रालय का संभावित शुरुआती रुख" },
  { factor: 1.92, who: "मीडिया में सबसे अधिक चर्चित आंकड़ा" },
  { factor: 2.08, who: "कन्फेडरेशन का मध्यम प्रस्ताव" },
  { factor: 2.28, who: "राष्ट्रीय परिषद (JCM) कर्मचारी पक्ष" },
  { factor: 2.57, who: "7वें वेतन आयोग जितना गुणक दोहराने की मांग" },
  { factor: 2.86, who: "अधिकतम कर्मचारी मांग" },
];

const faq: HindiFaq[] = [
  {
    q: "फिटमेंट फैक्टर क्या है?",
    a: "यह वह गुणक है जिससे पुराने मूल वेतन को गुणा करके नया मूल वेतन तय किया जाता है। 7वें वेतन आयोग में यह 2.57 था और 6वें में प्रभावी रूप से 1.86।",
  },
  {
    q: "8वें वेतन आयोग का फिटमेंट फैक्टर कितना रहेगा?",
    a: "अभी तय नहीं है। चर्चा में आ रहा दायरा 1.82x से 2.86x का है। सरकार का फैसला आयोग की रिपोर्ट के बाद होगा, जो लगभग मई 2027 तक अपेक्षित है।",
  },
  {
    q: "पिछला फिटमेंट फैक्टर क्या था?",
    a: "7वें वेतन आयोग (2016) में 2.57 और 6वें वेतन आयोग (2006) में 1.86। दोनों बार गुणक में उस समय का DA विलय शामिल था।",
  },
  {
    q: "2.57 गुणक का मतलब 157% बढ़ोतरी है?",
    a: "नहीं। 2.57 में उस समय का 125% DA पहले से शामिल था, इसलिए वास्तविक बढ़ोतरी केवल लगभग 14.29% थी। इसी तरह 8वें आयोग में भी कुल गुणक और वास्तविक लाभ अलग-अलग होंगे।",
  },
  {
    q: "क्या फिटमेंट फैक्टर सभी स्तरों पर एक जैसा होता है?",
    a: "मोटे तौर पर हाँ, लेकिन पे मैट्रिक्स के सेल पर पूर्णांकन के कारण कुछ स्तरों पर प्रभावी गुणक थोड़ा अलग निकलता है। 7वें आयोग में स्तर 13 का सूचकांक बाद में 2.57 से 2.67 कर दिया गया था।",
  },
];

export const Route = createFileRoute("/fitment-factor-in-hindi")({
  head: () =>
    hindiHead({
      path: PATH,
      english: "/fitment-factor",
      title: "फिटमेंट फैक्टर कैलकुलेटर — 8वां वेतन आयोग (हिंदी)",
      description:
        "फिटमेंट फैक्टर कैलकुलेटर हिंदी में — 1.82x से 2.86x तक हर परिदृश्य में नया मूल वेतन देखें, साथ में 6वें और 7वें वेतन आयोग के गुणक की तुलना।",
      keywords:
        "फिटमेंट फैक्टर, fitment factor in hindi, 2.28 फिटमेंट फैक्टर, 2.57 फिटमेंट फैक्टर, फिटमेंट टेबल, फिटमेंट कैलकुलेटर",
      faq,
      appName: "फिटमेंट फैक्टर कैलकुलेटर",
    }),
  component: HindiFitmentPage,
});

function HindiFitmentPage() {
  const [basic, setBasic] = useState(44900);

  const rows = useMemo(() => {
    const mergeBase = basic * (1 + CURRENT_DA / 100);
    return SCENARIOS.map((s) => {
      const newBasic = Math.round(basic * s.factor);
      const real = ((newBasic - mergeBase) / mergeBase) * 100;
      return { ...s, newBasic, real };
    });
  }, [basic]);

  const mergeBase = Math.round(basic * (1 + CURRENT_DA / 100));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <HindiHeader
        icon={Sigma}
        kicker="फिटमेंट फैक्टर"
        title="फिटमेंट फैक्टर कैलकुलेटर (हिंदी)"
        sub="अपना मूल वेतन डालें और हर संभावित गुणक पर नया मूल वेतन तथा वास्तविक बढ़ोतरी देखें।"
        english="/fitment-factor"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
        <HindiCard title="मूल वेतन">
          <div className="space-y-2">
            <Label>मौजूदा मूल वेतन (₹)</Label>
            <Input
              type="number"
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value) || 0)}
            />
          </div>
          <HindiRow label={`DA विलय आधार (${CURRENT_DA}%)`} value={inr(mergeBase)} />
          <p className="text-xs text-muted-foreground">
            वास्तविक बढ़ोतरी इसी विलय आधार से नापी जाती है, मूल वेतन से नहीं।
          </p>
        </HindiCard>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">गुणक</th>
                <th className="px-4 py-3 text-right">नया मूल वेतन</th>
                <th className="px-4 py-3 text-right">वास्तविक वृद्धि</th>
                <th className="px-4 py-3 text-left">कौन सुझा रहा है</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.factor} className="border-t border-border/60">
                  <td className="px-4 py-3 font-semibold">{r.factor.toFixed(2)}x</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {inr(r.newBasic)}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {r.real >= 0 ? "+" : ""}
                    {r.real.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{r.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <HindiContent
        exclude={PATH}
        heading="फिटमेंट फैक्टर कैसे काम करता है?"
        intro="फिटमेंट फैक्टर वेतन संशोधन का सबसे महत्वपूर्ण आंकड़ा है क्योंकि यही तय करता है कि आपका नया मूल वेतन कितना होगा। बाकी सब — DA, HRA, परिवहन भत्ता, पेंशन और ग्रेच्युटी — इसी नए मूल वेतन से निकलते हैं। यह समझना जरूरी है कि गुणक में मौजूदा DA का विलय पहले से शामिल होता है, इसलिए बड़ा दिखने वाला गुणक भी जेब में उतनी बड़ी वृद्धि नहीं देता।"
        method={[
          {
            title: "गुणक की संरचना",
            body: "फिटमेंth गुणक = (1 + DA अनुपात) × (1 + वास्तविक वृद्धि)। 2016 में DA 125% था, इसलिए 2.25 × 1.1429 ≈ 2.57 बना। 2026 में DA 60% रहने पर 1.60 × 1.1429 ≈ 1.83 बनेगा, जबकि 1.60 × 1.425 ≈ 2.28 बनता है।",
          },
          {
            title: "6वें और 7वें आयोग की तुलना",
            body: "6वें वेतन आयोग में पे बैंड और ग्रेड पे व्यवस्था के साथ प्रभावी गुणक 1.86 रहा। 7वें वेतन आयोग ने उसे हटाकर 19 स्तरों वाला पे मैट्रिक्स दिया और 2.57 का समान गुणक लागू किया, जिससे न्यूनतम वेतन ₹7,000 से ₹18,000 हुआ।",
          },
          {
            title: "मैट्रिक्स सेल पर पूर्णांकन",
            body: "गुणा का परिणाम सीधे वेतन नहीं बनता। उसे आपके स्तर के मैट्रिक्स में बराबर या उससे ऊपर वाले पहले सेल पर तय किया जाता है, इसलिए वास्तविक आंकड़ा गणना से कुछ अधिक हो सकता है।",
          },
          {
            title: "पेंशन पर भी वही गुणक",
            body: "पिछले दोनों आयोगों में मौजूदा पेंशनभोगियों की मूल पेंशन पर भी वही गुणक लगाया गया था। इसलिए फिटमेंट फैक्टर का असर 65 लाख से अधिक पेंशनभोगियों पर भी पड़ता है।",
          },
        ]}
        formula={[
          "नया मूल वेतन = मौजूदा मूल वेतन × फिटमेंट फैक्टर",
          "DA विलय आधार = मूल वेतन × (1 + DA% ÷ 100)",
          "वास्तविक वृद्धि% = (नया मूल वेतन − विलय आधार) ÷ विलय आधार × 100",
          "संशोधित पेंशन = मूल पेंशन × फिटमेंट फैक्टर",
        ]}
        faq={faq}
      />
    </div>
  );
}
