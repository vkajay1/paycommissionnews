import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — 8th CPC Calculator" },
      { name: "description", content: "Get in touch with 8th CPC Calculator for feedback, corrections, feature requests or calculator support." },
      { property: "og:title", content: "Contact Us — 8th CPC Calculator" },
      { property: "og:description", content: "Contact 8th CPC Calculator for feedback, corrections and support." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://paycommissionnews.co.in/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Us — 8th CPC Calculator" },
      { name: "twitter:description", content: "Contact 8th CPC Calculator for feedback, corrections and support." },
    ],
    links: [{ rel: "canonical", href: "https://paycommissionnews.co.in/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact 8th CPC Calculator",
          url: "https://paycommissionnews.co.in/contact",
          mainEntity: {
            "@type": "Organization",
            name: "8th CPC Calculator",
            url: "https://paycommissionnews.co.in",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              availableLanguage: ["English", "Hindi"],
            },
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        Contact Us
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Have a question, suggestion or correction? We would love to hear from you. Fill out the form below and our team will respond as soon as possible.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <Mail className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-base font-semibold">Email</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            support@paycommissionnews.co.in
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <MapPin className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-base font-semibold">Headquarters</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            India (online-only service)
          </p>
        </div>
      </div>

      <form
        className="mt-10 space-y-5 rounded-2xl border border-border bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);
          const subject = encodeURIComponent(`Contact form: ${data.get("name")}`);
          const body = encodeURIComponent(
            `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nMessage:\n${data.get("message")}`
          );
          window.location.href = `mailto:support@paycommissionnews.co.in?subject=${subject}&body=${body}`;
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="Feedback, bug report or feature request" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" rows={5} placeholder="How can we help you?" required />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          <MessageSquare className="mr-2 h-4 w-4" />
          Send message
        </Button>
        <p className="text-xs text-muted-foreground">
          This form opens your default email client. If it does not work, email us directly at{" "}
          <a href="mailto:support@paycommissionnews.co.in" className="text-primary hover:underline">support@paycommissionnews.co.in</a>.
        </p>
      </form>
    </main>
  );
}
