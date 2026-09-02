import { createFileRoute, Link } from "@tanstack/react-router";
import { PAY_LEVELS } from "@/lib/pay-matrix";
import { CURRENT_DA, CURRENT_DA_FROM } from "@/lib/da-rates";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { DiscussionBox } from "@/components/comments/DiscussionBox";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/format";

const SITE = "https://paycommissionnews.co.in";

const faqs = [
  {
    q: "8वां वेतन आयोग क्या है?",
    a: "8वां वेतन आयोग (8th Pay Commission) केंद्र सरकार द्वारा गठित एक समिति है जो केंद्रीय कर्मचारियों और पेंशनभोगियों के वेतन, भत्तों और पेंशन की समीक्षा कर सिफारिश देती है। आयोग की रिपोर्ट सरकार द्वारा स्वीकार होने के बाद ही नया वेतनमान लागू होता है।",
  },
  {
    q: "8वें वेतन आयोग में सैलरी कितनी बढ़ेगी?",
    a: "बढ़ोतरी फिटमेंट फैक्टर पर निर्भर है। 2.57x पर ₹18,000 का बेसिक लगभग ₹46,260 और 2.86x पर लगभग ₹51,480 हो जाता है। चूंकि नए बेसिक पर DA शून्य से शुरू होता है, ग्रॉस सैलरी में वास्तविक बढ़ोतरी सामान्यतः 20%–35% के बीच रहती है।",
  },
  {
    q: "8वें वेतन आयोग की सैलरी कैलकुलेटर हिंदी में कहाँ है?",
    a: "इसी वेबसाइट पर हिंदी सैलरी कैलकुलेटर उपलब्ध है — अपना लेवल और बेसिक पे डालकर अनुमानित नया वेतन देख सकते हैं। पेंशन, एरियर, DA और फिटमेंट फैक्टर के हिंदी टूल भी अलग-अलग पेज पर हैं।",
  },
  {
    q: "8वां वेतन आयोग कब लागू होगा?",
    a: "पिछले आयोगों की तरह लागू होने की तिथि 1 जनवरी 2026 मानी जा रही है, लेकिन भुगतान रिपोर्ट स्वीकार होने के बाद शुरू होता है और बीच की अवधि का भुगतान एरियर के रूप में मिलता है। आधिकारिक पुष्टि वित्त मंत्रालय की अधिसूचना और PIB रिलीज से ही मानें।",
  },
  {
    q: "अभी DA कितना है?",
    a: `7वें वेतन आयोग के अंतर्गत महंगाई भत्ता ${CURRENT_DA}% है, जो ${CURRENT_DA_FROM} से प्रभावी है। नया वेतनमान लागू होने पर DA नए बेसिक पर 0% से पुनः शुरू होगा।`,
  },
  {
    q: "क्या राज्य कर्मचारियों पर भी 8वां वेतन आयोग लागू होगा?",
    a: "सीधे नहीं। केंद्र की सिफारिशें केंद्रीय कर्मचारियों पर लागू होती हैं; राज्य सरकारें अपने वित्तीय संसाधनों के अनुसार, आमतौर पर कुछ महीनों से एक-दो वर्ष की देरी से, अपनी अधिसूचना जारी करती हैं।",
  },
];

export const Route = createFileRoute("/8th-pay-commission-kya-hai")({
  head: () => ({
    meta: [
      {
        title: "8वां वेतन आयोग क्या है? 8th Pay Commission News in Hindi 2026",
      },
      {
        name: "description",
        content:
          "8वां वेतन आयोग क्या है, फिटमेंट फैक्टर, सैलरी कितनी बढ़ेगी, पे मैट्रिक्स, पेंशन और एरियर — 8th Pay Commission news in Hindi के साथ हिंदी सैलरी कैलकुलेटर।",
      },
      {
        name: "keywords",
        content:
          "8th pay commission kya hai, 8वां वेतन आयोग, 8th vetan aayog, 8th pay commission news in hindi, 8th pay commission hindi, 8th pay commission salary calculator hindi, 8th pay commission news hindi, 8वें वेतन आयोग में सैलरी कितनी बढ़ेगी",
      },
      { property: "og:type", content: "article" },
      { property: "og:locale", content: "hi_IN" },
      {
        property: "og:title",
        content: "8वां वेतन आयोग क्या है? पूरी जानकारी हिंदी में",
      },
      {
        property: "og:description",
        content:
          "फिटमेंट फैक्टर, नया पे मैट्रिक्स, पेंशन, एरियर और लागू होने की तिथि — सब कुछ हिंदी में।",
      },
      { property: "og:url", content: `${SITE}/8th-pay-commission-kya-hai` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "8वां वेतन आयोग क्या है?" },
      {
        name: "twitter:description",
        content: "8th Pay Commission की पूरी जानकारी हिंदी में, कैलकुलेटर के साथ।",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE}/8th-pay-commission-kya-hai` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "hi-IN",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: KyaHaiPage,
});

function KyaHaiPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12" lang="hi">
      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          हिंदी गाइड
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          8वां वेतन आयोग क्या है? (8th Pay Commission in Hindi)
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          8वें वेतन आयोग से जुड़ी हर बात एक जगह — आयोग का काम, फिटमेंट फैक्टर का
          गणित, अनुमानित नया पे मैट्रिक्स, पेंशन और एरियर, तथा लागू होने की
          संभावित तिथि। नीचे दी गई तालिका से आप अपने लेवल का अनुमानित बेसिक पे
          देख सकते हैं और हिंदी कैलकुलेटर में अपना सटीक आंकड़ा निकाल सकते हैं।
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/8th-pay-commission-salary-calculator-in-hindi">
              हिंदी सैलरी कैलकुलेटर
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/blog">8th Pay Commission news in Hindi</Link>
          </Button>
        </div>
      </header>

      <DisclaimerBanner />

      <div className="mt-8 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] text-sm">
          <caption className="sr-only">
            8वें वेतन आयोग में लेवल अनुसार अनुमानित बेसिक पे
          </caption>
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-3 py-2.5 font-semibold">लेवल</th>
              <th className="px-3 py-2.5 font-semibold">पद</th>
              <th className="px-3 py-2.5 font-semibold">वर्तमान बेसिक</th>
              <th className="px-3 py-2.5 font-semibold">2.57x पर</th>
              <th className="px-3 py-2.5 font-semibold">2.86x पर</th>
            </tr>
          </thead>
          <tbody>
            {PAY_LEVELS.map((l) => (
              <tr key={l.level} className="border-t border-border">
                <td className="px-3 py-2.5 font-medium">लेवल {l.level}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{l.grade}</td>
                <td className="px-3 py-2.5">{inr(l.entryPay)}</td>
                <td className="px-3 py-2.5">{inr(Math.round(l.entryPay * 2.57))}</td>
                <td className="px-3 py-2.5 font-medium text-primary">
                  {inr(Math.round(l.entryPay * 2.86))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <article className="prose-article mt-10">
        <h2>वेतन आयोग का काम क्या होता है?</h2>
        <p>
          वेतन आयोग एक सलाहकार समिति है। यह कर्मचारी संगठनों के ज्ञापन, महंगाई के
          आंकड़े, न्यूनतम वेतन की गणना और सरकार की वित्तीय स्थिति देखकर नया
          वेतनमान सुझाता है। सुझाव अपने आप लागू नहीं होते — केंद्रीय मंत्रिमंडल की
          स्वीकृति और व्यय विभाग के संकल्प के बाद ही भुगतान शुरू होता है।
        </p>
        <h2>फिटमेंट फैक्टर का गणित</h2>
        <p>
          नया बेसिक पे = वर्तमान बेसिक पे × फिटमेंट फैक्टर। चर्चा में 1.92x से
          2.86x तक के आंकड़े हैं और कर्मचारी संगठन इससे अधिक की मांग कर रहे हैं।
          विभिन्न फैक्टर पर तुलना{" "}
          <Link to="/fitment-factor-in-hindi">फिटमेंट फैक्टर पेज</Link> पर देखें।
        </p>
        <h2>DA, HRA और ग्रॉस सैलरी</h2>
        <p>
          वर्तमान में DA {CURRENT_DA}% है ({CURRENT_DA_FROM} से प्रभावी)। नया
          वेतनमान लागू होते ही DA नए बेसिक पर 0% हो जाता है, इसलिए पहले वर्ष में
          ग्रॉस बढ़ोतरी बेसिक की बढ़ोतरी से कम दिखती है। शहर श्रेणी के अनुसार HRA
          और परिवहन भत्ता जोड़ने के बाद ही वास्तविक इन-हैंड राशि मिलती है —{" "}
          <Link to="/da-calculator-in-hindi">DA कैलकुलेटर (हिंदी)</Link> देखें।
        </p>
        <h2>पेंशन और एरियर</h2>
        <p>
          पेंशनभोगियों की पेंशन पर भी वही गुणक लगता है। लागू तिथि और वास्तविक
          भुगतान के बीच का अंतर एरियर के रूप में मिलता है। अनुमान के लिए{" "}
          <Link to="/8th-pay-commission-pension-calculator-in-hindi">
            पेंशन कैलकुलेटर (हिंदी)
          </Link>{" "}
          और{" "}
          <Link to="/8th-pay-commission-arrears-calculator-in-hindi">
            एरियर कैलकुलेटर (हिंदी)
          </Link>{" "}
          का उपयोग करें।
        </p>
        <h2>आयोग की प्रक्रिया कहाँ तक पहुँची है?</h2>
        <p>
          संदर्भ शर्तें (Terms of Reference), अध्यक्ष की नियुक्ति, NC-JCM ज्ञापन और
          बजट प्रावधान — इन चारों से लागू होने की तस्वीर बनती है। पूरी प्रक्रिया{" "}
          <Link to="/8th-pay-commission-terms-of-reference">
            terms of reference पेज
          </Link>{" "}
          पर समझाई गई है, और अनुमानित नया{" "}
          <Link to="/8th-pay-commission-pay-matrix">पे मैट्रिक्स टेबल</Link> भी
          उपलब्ध है।
        </p>
      </article>

      <section className="mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">
          अक्सर पूछे जाने वाले प्रश्न
        </h2>
        <dl className="mt-5 space-y-5">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-card p-5">
              <dt className="font-semibold">{f.q}</dt>
              <dd className="mt-1.5 text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <DiscussionBox />
    </div>
  );
}
