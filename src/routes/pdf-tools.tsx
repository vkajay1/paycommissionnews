import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, ShieldCheck, Zap, FileStack } from "lucide-react";

const SITE = "https://www.editovaniepdf.com";

const TITLE = "Free Online PDF Tools — Merge, Split, Compress & Convert PDF";
const DESC =
  "Use free browser-based PDF tools to merge, split, compress, rotate, sign, protect and convert PDF to Word, Excel, JPG and PowerPoint. Files never leave your device.";

type Tool = { name: string; slug: string; note: string };
type Group = { title: string; blurb: string; tools: Tool[] };

const GROUPS: Group[] = [
  {
    title: "Organise PDF pages",
    blurb:
      "Rearrange the structure of a document before you file it, email it or print it.",
    tools: [
      { name: "Merge PDF", slug: "merge-pdf", note: "Combine appointment letters, marksheets and ID proofs into one attachment." },
      { name: "Split PDF", slug: "split-pdf", note: "Break a long notification PDF into the pages you actually need." },
      { name: "Rotate PDF", slug: "rotate-pdf", note: "Fix sideways scans of forms and admit cards." },
      { name: "Delete Pages", slug: "delete-pages", note: "Drop blank or duplicate pages from scanned files." },
      { name: "Extract Pages", slug: "extract-pages", note: "Pull a single page, such as a pay slip month, out of a bundle." },
      { name: "Reorder Pages", slug: "reorder-pages", note: "Drag pages into the order an application form demands." },
      { name: "Scan to PDF", slug: "scan-to-pdf", note: "Turn phone photos of documents into a clean PDF." },
      { name: "Rename PDF", slug: "rename-pdf", note: "Give files clear names before uploading to a portal." },
    ],
  },
  {
    title: "Edit and annotate",
    blurb: "Add the marks a document needs without buying desktop software.",
    tools: [
      { name: "Sign PDF", slug: "sign-pdf", note: "Draw or upload a signature for undertakings and declarations." },
      { name: "Watermark PDF", slug: "watermark-pdf", note: "Stamp copies as confidential or date-marked." },
      { name: "Add Page Numbers", slug: "add-page-numbers", note: "Number reports, dossiers and legal paper books." },
      { name: "Crop PDF", slug: "crop-pdf", note: "Trim wide scan margins to a tidy page size." },
      { name: "Add Image", slug: "add-image", note: "Place a photo, logo or thumb impression on a page." },
    ],
  },
  {
    title: "Convert file formats",
    blurb:
      "Move between PDF and the Office or image formats recruitment portals ask for.",
    tools: [
      { name: "PDF to Word", slug: "pdf-to-word", note: "Make a PDF editable for drafting and corrections." },
      { name: "PDF to Excel", slug: "pdf-to-excel", note: "Lift pay matrix or vacancy tables into a spreadsheet." },
      { name: "PDF to JPG", slug: "pdf-to-jpg", note: "Create image previews for WhatsApp or web upload." },
      { name: "PDF to PowerPoint", slug: "pdf-to-powerpoint", note: "Reuse slide decks shared as PDF." },
      { name: "JPG to PDF", slug: "jpg-to-pdf", note: "Combine photo proofs into a single upload-ready PDF." },
      { name: "Word to PDF", slug: "word-to-pdf", note: "Lock formatting before sending a document out." },
      { name: "Excel to PDF", slug: "excel-to-pdf", note: "Share salary or arrear sheets exactly as laid out." },
      { name: "PowerPoint to PDF", slug: "powerpoint-to-pdf", note: "Distribute presentations that open anywhere." },
      { name: "HTML to PDF", slug: "html-to-pdf", note: "Save a web page, invoice or receipt as PDF." },
      { name: "PDF to PDF/A", slug: "pdf-to-pdfa", note: "Produce an archival file for long-term records." },
    ],
  },
  {
    title: "Optimise, secure and read",
    blurb:
      "Shrink oversized uploads, lock private files and pull text out of scans.",
    tools: [
      { name: "Compress PDF", slug: "compress-pdf", note: "Meet the 200 KB or 1 MB limits on government forms." },
      { name: "Repair PDF", slug: "repair-pdf", note: "Recover a file that refuses to open." },
      { name: "Protect PDF", slug: "protect-pdf", note: "Password-protect service records and bank statements." },
      { name: "OCR PDF", slug: "ocr-pdf", note: "Make a scanned order searchable and copyable." },
      { name: "Translate PDF", slug: "translate-pdf", note: "Read a circular in another language." },
    ],
  },
];

const FAQS = [
  {
    q: "Are these PDF tools free to use?",
    a: "Yes. Every tool listed on this page is free and needs no signup, subscription or software installation. You open the tool in your browser, choose your file and download the result.",
  },
  {
    q: "Do my documents get uploaded to a server?",
    a: "No. The tools run entirely inside your browser, so the file is processed on your own device and is never uploaded to a remote server. That matters when you handle pay slips, service books, PAN or Aadhaar copies and bank statements.",
  },
  {
    q: "How do I compress a PDF to fit a government upload limit?",
    a: "Open the Compress PDF tool, add your file and download the reduced version. If a portal caps uploads at 200 KB or 1 MB, compress first, then check the page quality before submitting. For scanned documents, cropping the extra margin before compressing usually gives a smaller file at the same readability.",
  },
  {
    q: "Can I merge my documents into a single application PDF?",
    a: "Yes. Use Merge PDF to combine certificates, photo ID and experience letters in the exact order an application asks for, then use Reorder Pages if you need to adjust the sequence afterwards.",
  },
  {
    q: "Can I convert a pay matrix or vacancy table into Excel?",
    a: "Use PDF to Excel to pull tabular data out of a notification or pay matrix PDF into a spreadsheet, where you can sort, filter and run your own salary calculations.",
  },
  {
    q: "What file size can these tools handle?",
    a: "Documents up to about 100 MB work comfortably. Very large scanned files depend on your device memory, so on a low-end phone it helps to split the PDF first and process it in parts.",
  },
];

export const Route = createFileRoute("/pdf-tools")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://paycommissionnews.co.in/pdf-tools" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://paycommissionnews.co.in/pdf-tools" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESC,
          url: "https://paycommissionnews.co.in/pdf-tools",
          hasPart: GROUPS.flatMap((g) =>
            g.tools.map((t) => ({
              "@type": "WebApplication",
              name: t.name,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any (web browser)",
              url: `${SITE}/tools/${t.slug}`,
              offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            })),
          ),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: PdfToolsPage,
});

function ToolLink({ tool }: { tool: Tool }) {
  return (
    <a
      href={`${SITE}/tools/${tool.slug}`}
      target="_blank"
      rel="noopener"
      className="group flex flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-secondary/50"
    >
      <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-primary">
        {tool.name}
        <ExternalLink className="h-3 w-3 opacity-60" />
      </span>
      <span className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
        {tool.note}
      </span>
    </a>
  );
}

function PdfToolsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        Free Online PDF Tools — Merge, Split, Compress and Convert PDF
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Government paperwork almost always arrives as a PDF: pay slips, pension orders,
        recruitment notifications, admit cards and pay matrix tables. This page collects the
        free browser-based PDF tools we use ourselves, so you can merge, split, compress,
        sign and convert documents without installing software or creating an account.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={SITE}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Open all PDF tools <ExternalLink className="h-4 w-4" />
        </a>
        <a
          href={`${SITE}/tools/compress-pdf`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          Compress a PDF <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: "Processed on your device",
            body: "Files are handled inside your browser, so private documents are never uploaded to a server.",
          },
          {
            icon: Zap,
            title: "No signup, no waiting",
            body: "Pick a tool, add the file, download the result. No account, watermark or trial limits.",
          },
          {
            icon: FileStack,
            title: "27+ tools in one place",
            body: "Organise, edit, convert, compress, protect and OCR — everything a document workflow needs.",
          },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border border-border bg-card p-4">
            <f.icon className="h-5 w-5 text-primary" />
            <div className="mt-2.5 text-sm font-semibold">{f.title}</div>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>

      {GROUPS.map((g) => (
        <section key={g.title} className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">{g.title}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">{g.blurb}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {g.tools.map((t) => (
              <ToolLink key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      ))}

      <section className="prose-article mt-12">
        <h2>How to edit a PDF online in three steps</h2>
        <ol>
          <li>
            <strong>Choose the right tool.</strong> Decide what the document needs — merging,
            splitting, compressing, signing or converting — and open that tool from the lists above.
          </li>
          <li>
            <strong>Add your file.</strong> Drop the PDF into the tool or browse from your phone or
            computer. Processing starts on your own device.
          </li>
          <li>
            <strong>Download the result.</strong> Save the finished file and check it once before
            uploading it to a portal or emailing it.
          </li>
        </ol>

        <h2>Why these tools matter for government paperwork</h2>
        <p>
          Recruitment and pension portals are strict about file format and size. An application may
          demand a single PDF under 1 MB containing a photograph, signature, matriculation
          certificate and caste or EWS certificate in a fixed order. Doing that by hand is painful;
          with <strong>Merge PDF</strong>, <strong>Reorder Pages</strong> and{" "}
          <strong>Compress PDF</strong> it takes a couple of minutes. Similarly, when a pay
          commission notification or DA order lands as a scanned image, <strong>OCR PDF</strong>{" "}
          makes the text searchable so you can quote the exact clause, and <strong>PDF to Excel</strong>{" "}
          lets you copy a pay matrix table into a spreadsheet and run your own numbers alongside our{" "}
          <a href="/salary">8th CPC salary calculator</a> and{" "}
          <a href="/arrear">arrear calculator</a>.
        </p>

        <h2>Good habits when handling document PDFs</h2>
        <ul>
          <li>Keep the original file untouched and work on a copy.</li>
          <li>Name files clearly, for example <em>pension-order-2026-03.pdf</em>.</li>
          <li>Compress before emailing, but confirm the text is still legible.</li>
          <li>Password-protect anything with bank, PAN or Aadhaar details.</li>
          <li>Prefer PDF/A for records you must keep for years.</li>
          <li>Re-check page order after every merge or split.</li>
        </ul>

        <h2>Frequently asked questions</h2>
        {FAQS.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <p className="text-sm text-muted-foreground">
          The PDF tools linked here open on our companion site{" "}
          <a href={SITE} target="_blank" rel="noopener">
            editovaniepdf.com
          </a>
          . They are general document utilities and are not connected to any government department.
        </p>
      </section>
    </main>
  );
}
