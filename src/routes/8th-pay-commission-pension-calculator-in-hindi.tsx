import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PiggyBank } from "lucide-react";
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

const PATH = "/8th-pay-commission-pension-calculator-in-hindi";

const faq: HindiFaq[] = [
  {
    q: "8वें वेतन आयोग में पेंशन कैसे संशोधित होगी?",
    a: "पिछली परंपरा के अनुसार मौजूदा मूल पेंशन को उसी फिटमेंट फैक्टर से गुणा किया जाता है जो कार्यरत कर्मचारियों के वेतन पर लागू होता है। 7वें वेतन आयोग में 2.57 का गुणक पेंशनभोगियों पर भी लगाया गया था।",
  },
  {
    q: "महंगाई राहत (DR) क्या है?",
    a: "पेंशनभोगियों को दिया जाने वाला महंगाई भत्ता महंगाई राहत कहलाता है। इसकी दर कर्मचारियों के DA के बराबर होती है और वर्तमान में यह 60% है। नया वेतनमान लागू होने पर DR भी शून्य से दोबारा शुरू होता है।",
  },
  {
    q: "कम्युटेशन का असर पेंशन पर क्या पड़ता है?",
    a: "सेवानिवृत्ति पर आप मूल पेंशन का अधिकतम 40% एकमुश्त राशि के रूप में भुना सकते हैं। उतना हिस्सा 15 वर्ष तक मासिक पेंशन से काटा जाता है, उसके बाद पूरी पेंशन बहाल हो जाती है। DR की गणना हमेशा पूरी मूल पेंशन पर होती है, कटौती के बाद वाली राशि पर नहीं।",
  },
  {
    q: "न्यूनतम पेंशन कितनी होगी?",
    a: "7वें वेतन आयोग में न्यूनतम पेंशन ₹9,000 है। यदि फिटमेंट फैक्टर 2.28x रहा तो यह लगभग ₹20,500 तक पहुँच सकती है, और 1.92x पर करीब ₹17,300 होगी।",
  },
  {
    q: "क्या 31 दिसंबर 2025 से पहले सेवानिवृत्त लोग शामिल हैं?",
    a: "हाँ। संदर्भ की शर्तों में उन पेंशनभोगियों को शामिल किया गया है जो संशोधन की संदर्भ तिथि से पहले सेवानिवृत्त हुए हैं, इसलिए मौजूदा पेंशनभोगियों को भी संशोधित पेंशन और एरियर मिलने की अपेक्षा है।",
  },
];

export const Route = createFileRoute(
  "/8th-pay-commission-pension-calculator-in-hindi",
)({
  head: () =>
    hindiHead({
      path: PATH,
      english: "/pension",
      title: "8वां वेतन आयोग पेंशन कैलकुलेटर — हिंदी में पेंशन गणना 2026",
      description:
        "8वें वेतन आयोग पेंशन कैलकुलेटर हिंदी में — संशोधित मूल पेंशन, महंगाई राहत 60%, कम्युटेशन और पारिवारिक पेंशन का अनुमान लगाएं।",
      keywords:
        "8वां वेतन आयोग पेंशन कैलकुलेटर, 8th pay commission pension calculator in hindi, पेंशन गणना हिंदी, महंगाई राहत, कम्युटेशन पेंशन",
      faq,
      appName: "8वां वेतन आयोग पेंशन कैलकुलेटर",
    }),
  component: HindiPensionPage,
});

function HindiPensionPage() {
  const [pension, setPension] = useState(31000);
  const [fit, setFit] = useState(2.28);
  const [commutePct, setCommutePct] = useState(0);
  const [family, setFamily] = useState(false);

  const r = useMemo(() => {
    const curBasic = family ? pension * 0.6 : pension;
    const curDr = (curBasic * CURRENT_DA) / 100;
    const newBasic = Math.round(curBasic * fit);
    const commuted = Math.round((newBasic * commutePct) / 100);
    const netBasic = newBasic - commuted;
    return {
      curBasic,
      curDr,
      curTotal: curBasic + curDr,
      newBasic,
      commuted,
      netBasic,
      newTotal: netBasic,
      lumpSum: Math.round(commuted * 12 * 8.194),
      diff: newBasic - (curBasic + curDr),
    };
  }, [pension, fit, commutePct, family]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <HindiHeader
        icon={PiggyBank}
        kicker="पेंशन कैलकुलेटर"
        title="8वां वेतन आयोग पेंशन कैलकुलेटर (हिंदी)"
        sub="मूल पेंशन, फिटमेंट फैक्टर और कम्युटेशन प्रतिशत डालकर संशोधित पेंशन का अनुमान लगाएं।"
        english="/pension"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <HindiCard title="अपनी जानकारी भरें">
          <div className="space-y-2">
            <Label>मौजूदा मूल पेंशन (₹)</Label>
            <Input
              type="number"
              value={pension}
              onChange={(e) => setPension(Number(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label>पेंशन का प्रकार</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFamily(false)}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium ${
                  !family
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:bg-secondary"
                }`}
              >
                सेवा पेंशन
              </button>
              <button
                type="button"
                onClick={() => setFamily(true)}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium ${
                  family
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:bg-secondary"
                }`}
              >
                पारिवारिक पेंशन (60%)
              </button>
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
              <Label>कम्युटेशन (अधिकतम 40%)</Label>
              <span className="text-sm font-bold text-primary">
                {commutePct}%
              </span>
            </div>
            <Slider
              min={0}
              max={40}
              step={1}
              value={[commutePct]}
              onValueChange={(v) => setCommutePct(v[0])}
            />
          </div>
        </HindiCard>

        <div className="grid gap-5 sm:grid-cols-2">
          <HindiCard title="वर्तमान स्थिति (7वां वेतन आयोग)">
            <HindiRow label="मूल पेंशन" value={inr(r.curBasic)} />
            <HindiRow
              label={`महंगाई राहत (${CURRENT_DA}%)`}
              value={inr(r.curDr)}
            />
            <HindiRow label="कुल मासिक पेंशन" value={inr(r.curTotal)} highlight />
          </HindiCard>

          <HindiCard title="अनुमानित पेंशन (8वां वेतन आयोग)">
            <HindiRow label="संशोधित मूल पेंशन" value={inr(r.newBasic)} />
            <HindiRow label="महंगाई राहत (0%)" value={inr(0)} />
            <HindiRow
              label="कम्युटेशन कटौती"
              value={`− ${inr(r.commuted)}`}
              negative
            />
            <HindiRow label="कुल मासिक पेंशन" value={inr(r.newTotal)} highlight />
          </HindiCard>

          <div className="sm:col-span-2">
            <HindiCard title="सार">
              <HindiRow label="मासिक बढ़ोतरी" value={inr(r.diff)} highlight />
              <HindiRow
                label="अनुमानित कम्युटेशन एकमुश्त राशि"
                value={inr(r.lumpSum)}
              />
              <HindiRow label="वार्षिक बढ़ोतरी" value={inr(r.diff * 12)} />
            </HindiCard>
          </div>
        </div>
      </div>

      <HindiContent
        exclude={PATH}
        heading="8वें वेतन आयोग में पेंशन की गणना कैसे होगी?"
        intro="पेंशन संशोधन का तरीका वेतन संशोधन जैसा ही है। जो फिटमेंट फैक्टर कार्यरत कर्मचारियों के मूल वेतन पर लगेगा, वही मौजूदा मूल पेंशन पर भी लागू होने की अपेक्षा है। इसके बाद महंगाई राहत शून्य से दोबारा शुरू होती है और आगे की किस्तों के साथ बढ़ती है। यह कैलकुलेटर सेवा पेंशन तथा पारिवारिक पेंशन दोनों के लिए अनुमान देता है और कम्युटेशन का असर भी दिखाता है।"
        method={[
          {
            title: "मूल पेंशन का संशोधन",
            body: "संशोधित मूल पेंशन = मौजूदा मूल पेंशन × फिटमेंट फैक्टर। उदाहरण के लिए ₹31,000 की पेंशन 2.28x पर लगभग ₹70,680 हो जाएगी। यदि गुणक 1.92x रहा तो वही पेंशन करीब ₹59,520 बनेगी।",
          },
          {
            title: "पारिवारिक पेंशन",
            body: "साधारण पारिवारिक पेंशन अंतिम मूल वेतन के 30% पर तय होती है, और सेवा पेंशन के मुकाबले लगभग 60% बैठती है। इस पर भी वही फिटमेंट फैक्टर और महंगाई राहत लागू होती है।",
          },
          {
            title: "कम्युटेशन और उसकी वसूली",
            body: "आप संशोधित मूल पेंशन का अधिकतम 40% भुना सकते हैं। एकमुश्त राशि लगभग भुनाई गई मासिक राशि × 12 × कम्युटेशन गुणक होती है, और यह हिस्सा 15 वर्ष तक मासिक पेंशन से कटता है। इसके बाद पेंशन पूरी तरह बहाल हो जाती है।",
          },
          {
            title: "अतिरिक्त पेंशन",
            body: "80 वर्ष की आयु पूरी होने पर मूल पेंशन का 20% अतिरिक्त जुड़ता है, 85 वर्ष पर 30%, 90 वर्ष पर 40%, 95 वर्ष पर 50% और 100 वर्ष पर 100%। यह वृद्धि संशोधित मूल पेंशन पर लागू होती है।",
          },
        ]}
        formula={[
          "संशोधित मूल पेंशन = मौजूदा मूल पेंशन × फिटमेंट फैक्टर",
          "महंगाई राहत = मूल पेंशन × DR% / 100",
          "कम्युटेशन राशि = संशोधित मूल पेंशन × कम्युटेशन% / 100",
          "एकमुश्त भुगतान = कम्युटेशन राशि × 12 × कम्युटेशन गुणक",
          "कुल मासिक पेंशन = मूल पेंशन − कम्युटेशन कटौती + महंगाई राहत",
        ]}
        faq={faq}
      />
    </div>
  );
}
