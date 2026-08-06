import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
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
import {
  CURRENT_DA,
  CURRENT_DA_FROM,
  DA_OPTIONS,
  PREVIOUS_DA,
  daPctFor,
} from "@/lib/da-rates";
import { inr } from "@/lib/format";

const PATH = "/da-calculator-in-hindi";

const faq: HindiFaq[] = [
  {
    q: "वर्तमान महंगाई भत्ता कितना है?",
    a: `केंद्रीय कर्मचारियों का DA ${CURRENT_DA_FROM} से ${CURRENT_DA}% है। इससे पहली किस्त 1 जुलाई 2025 से ${PREVIOUS_DA}% थी।`,
  },
  {
    q: "DA की गणना कैसे होती है?",
    a: "DA = मूल वेतन × DA प्रतिशत ÷ 100। इसमें कोई भत्ता शामिल नहीं होता, केवल पे मैट्रिक्स का मूल वेतन लिया जाता है।",
  },
  {
    q: "DA प्रतिशत कौन तय करता है?",
    a: "श्रम ब्यूरो द्वारा जारी औद्योगिक श्रमिकों के उपभोक्ता मूल्य सूचकांक (AICPI-IW) के 12 महीने के औसत के आधार पर व्यय विभाग हर छह महीने में दर घोषित करता है।",
  },
  {
    q: "DA साल में कितनी बार बढ़ता है?",
    a: "दो बार — 1 जनवरी और 1 जुलाई से। घोषणा आमतौर पर मार्च और सितंबर-अक्टूबर के आसपास होती है और पिछली तारीख से बकाया दिया जाता है।",
  },
  {
    q: "8वें वेतन आयोग के बाद DA का क्या होगा?",
    a: "नया वेतनमान लागू होते ही मौजूदा DA मूल वेतन में समाहित हो जाता है और DA शून्य से दोबारा शुरू होता है। 2016 में भी यही हुआ था।",
  },
];

export const Route = createFileRoute("/da-calculator-in-hindi")({
  head: () =>
    hindiHead({
      path: PATH,
      english: "/da-calculator",
      title: `महंगाई भत्ता कैलकुलेटर — वर्तमान DA ${CURRENT_DA}% (हिंदी)`,
      description: `महंगाई भत्ता कैलकुलेटर हिंदी में — वर्तमान DA ${CURRENT_DA}% और पिछली किस्तों के अनुसार मासिक DA, DA अंतर और बकाया की गणना करें।`,
      keywords:
        "महंगाई भत्ता कैलकुलेटर, da calculator in hindi, वर्तमान DA, DA कैलकुलेटर बेसिक सैलरी, केंद्रीय कर्मचारी DA, DA एरियर",
      faq,
      appName: "महंगाई भत्ता कैलकुलेटर",
    }),
  component: HindiDaPage,
});

function HindiDaPage() {
  const [basic, setBasic] = useState(44900);
  const [nowKey, setNowKey] = useState("2026-01");
  const [prevKey, setPrevKey] = useState("2025-07");
  const [months, setMonths] = useState(6);

  const r = useMemo(() => {
    const now = daPctFor(nowKey);
    const prev = daPctFor(prevKey);
    const daNow = (basic * now) / 100;
    const daPrev = (basic * prev) / 100;
    const diff = daNow - daPrev;
    return { now, prev, daNow, daPrev, diff, arrear: diff * months };
  }, [basic, nowKey, prevKey, months]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <HindiHeader
        icon={TrendingUp}
        kicker="DA कैलकुलेटर"
        title="महंगाई भत्ता (DA) कैलकुलेटर — हिंदी"
        sub={`मूल वेतन और किस्त चुनें — वर्तमान दर ${CURRENT_DA}% (${CURRENT_DA_FROM} से)।`}
        english="/da-calculator"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <HindiCard title="अपनी जानकारी भरें">
          <div className="space-y-2">
            <Label>मूल वेतन / मूल पेंशन (₹)</Label>
            <Input
              type="number"
              value={basic}
              onChange={(e) => setBasic(Number(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label>वर्तमान DA किस्त</Label>
            <select
              value={nowKey}
              onChange={(e) => setNowKey(e.target.value)}
              className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              {DA_OPTIONS.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.label} — {d.pct}%
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>पिछली DA किस्त</Label>
            <select
              value={prevKey}
              onChange={(e) => setPrevKey(e.target.value)}
              className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              {DA_OPTIONS.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.label} — {d.pct}%
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>बकाया महीने</Label>
            <Input
              type="number"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value) || 0)}
            />
          </div>
        </HindiCard>

        <div className="grid gap-5 sm:grid-cols-2">
          <HindiCard title="मासिक महंगाई भत्ता">
            <HindiRow label={`वर्तमान दर (${r.now}%)`} value={inr(r.daNow)} highlight />
            <HindiRow label={`पिछली दर (${r.prev}%)`} value={inr(r.daPrev)} />
            <HindiRow label="मासिक अंतर" value={inr(r.diff)} />
          </HindiCard>
          <HindiCard title="बकाया और कुल">
            <HindiRow label={`${months} महीने का DA बकाया`} value={inr(r.arrear)} highlight />
            <HindiRow label="मूल वेतन + वर्तमान DA" value={inr(basic + r.daNow)} />
            <HindiRow label="वार्षिक DA" value={inr(r.daNow * 12)} />
          </HindiCard>
        </div>
      </div>

      <HindiContent
        exclude={PATH}
        heading="महंगाई भत्ता क्या है और कैसे तय होता है?"
        intro="महंगाई भत्ता वह राशि है जो बढ़ती कीमतों का असर कम करने के लिए मूल वेतन के प्रतिशत के रूप में दी जाती है। पेंशनभोगियों के लिए इसे महंगाई राहत कहा जाता है और दर दोनों के लिए एक समान रहती है। दर हर छह महीने में बदलती है और इसका आधार औद्योगिक श्रमिकों का उपभोक्ता मूल्य सूचकांक होता है।"
        method={[
          {
            title: "सूचकांक से दर तक",
            body: "श्रम ब्यूरो हर महीने AICPI-IW जारी करता है। पिछले बारह महीनों का औसत लेकर आधार वर्ष 2016=100 के अनुसार सूत्र लगाया जाता है, और परिणाम को पूर्णांक प्रतिशत पर लाया जाता है। इसी कारण दो-दो या तीन-तीन प्रतिशत की छलांग दिखती है।",
          },
          {
            title: "किस राशि पर DA मिलता है",
            body: "DA केवल पे मैट्रिक्स के मूल वेतन पर मिलता है। HRA, परिवहन भत्ता या अन्य भत्ते इसमें नहीं जोड़े जाते। हालाँकि परिवहन भत्ते पर अलग से उस समय का DA जुड़ता है।",
          },
          {
            title: "DA का HRA पर असर",
            body: "DA जब 25% पार करता है तो HRA 24/16/8 से बढ़कर 27/18/9 प्रतिशत हो जाता है, और 50% पार करने पर 30/20/10 प्रतिशत। इसलिए DA बढ़ने का लाभ दोहरा होता है।",
          },
          {
            title: "वेतन आयोग बदलने पर",
            body: "नया वेतन आयोग लागू होते ही उस समय का पूरा DA मूल वेतन में जोड़ दिया जाता है और गिनती शून्य से शुरू होती है। 1 जनवरी 2026 को DA 60% है, इसलिए विलय आधार मूल वेतन का 1.60 गुना बनेगा।",
          },
        ]}
        formula={[
          "महंगाई भत्ता = मूल वेतन × DA% ÷ 100",
          "DA अंतर = मूल वेतन × (नया DA% − पुराना DA%) ÷ 100",
          "DA बकाया = DA अंतर × बकाया महीनों की संख्या",
          "विलय आधार = मूल वेतन × (1 + DA% ÷ 100)",
        ]}
        faq={faq}
      />
    </div>
  );
}
