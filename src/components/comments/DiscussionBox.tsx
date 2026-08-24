import { useEffect, useState, useId } from "react";
import { MessageSquare, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useHydrated } from "@/hooks/use-hydrated";

type Comment = {
  id: string;
  author_name: string;
  message: string;
  created_at: string;
  reply_to: string | null;
};

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CommentCard({
  c,
  onReply,
}: {
  c: Comment;
  onReply: (id: string) => void;
}) {
  const initials = c.author_name.trim().slice(0, 2).toUpperCase();
  return (
    <div className="flex gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold">{c.author_name}</span>
          <span className="text-xs text-muted-foreground">{timeAgo(c.created_at)}</span>
        </div>
        <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-foreground/90">
          {c.message}
        </p>
        <button
          type="button"
          onClick={() => onReply(c.id)}
          className="mt-1.5 text-xs font-medium text-muted-foreground hover:text-primary"
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export function DiscussionBox({ pagePath }: { pagePath: string }) {
  const hydrated = useHydrated();
  const nameId = useId();
  const messageId = useId();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function loadComments() {
    setLoading(true);
    const { data, error } = await supabase
      .from("page_comments")
      .select("id, author_name, message, created_at, reply_to")
      .eq("page_path", pagePath)
      .eq("hidden_flag", false)
      .order("created_at", { ascending: true });
    if (!error && data) setComments(data as Comment[]);
    setLoading(false);
  }

  useEffect(() => {
    if (!hydrated) return;
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, pagePath]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    setStatus("submitting");
    const { error } = await supabase.from("page_comments").insert({
      page_path: pagePath,
      author_name: trimmedName,
      message: trimmedMessage,
      reply_to: replyTo,
      hidden_flag: true,
    });

    if (error) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setMessage("");
    setReplyTo(null);
    // Keep the name so repeat comments are easy.
    setTimeout(() => setStatus("idle"), 5000);
  }

  return (
    <section
      className="mt-14 rounded-xl border border-border bg-card p-5 sm:p-6"
      aria-labelledby="discussion-title"
    >
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 id="discussion-title" className="text-xl font-bold">
          Discussion & Questions
        </h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Share your questions or updates about this page. Comments are reviewed before they
        appear publicly.
      </p>

      {/* Submit form */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        {replyTo ? (
          <div className="flex items-center justify-between rounded-md bg-secondary/60 px-3 py-1.5 text-xs">
            <span className="text-muted-foreground">
              Replying to a comment
            </span>
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="font-medium text-primary hover:underline"
            >
              Cancel reply
            </button>
          </div>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
          <div className="space-y-1.5">
            <label htmlFor={nameId} className="text-xs font-medium text-muted-foreground">
              Your name
            </label>
            <Input
              id={nameId}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajesh K."
              maxLength={80}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor={messageId} className="text-xs font-medium text-muted-foreground">
              Your message
            </label>
            <Textarea
              id={messageId}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question or share an update…"
              rows={3}
              maxLength={2000}
              required
            />
          </div>
        </div>

        {status === "success" ? (
          <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Thanks! Your comment has been submitted and will appear once reviewed.
          </div>
        ) : null}
        {status === "error" ? (
          <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            Something went wrong. Please try again in a moment.
          </div>
        ) : null}

        <div className="flex justify-end">
          <Button type="submit" disabled={status === "submitting" || !message.trim() || !name.trim()}>
            {status === "submitting" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Post comment
          </Button>
        </div>
      </form>

      {/* Comment list */}
      <div className="mt-6">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {loading ? "Loading comments…" : `${comments.length} comment${comments.length === 1 ? "" : "s"}`}
        </div>

        {!loading && comments.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
            No comments yet. Be the first to start the discussion.
          </p>
        ) : (
          <div className="space-y-5">
            {comments
              .filter((c) => !c.reply_to)
              .map((c) => (
                <div key={c.id} className="space-y-4">
                  <CommentCard c={c} onReply={setReplyTo} />
                  <div className="ml-12 space-y-4 border-l border-border pl-4">
                    {comments
                      .filter((r) => r.reply_to === c.id)
                      .map((r) => (
                        <CommentCard key={r.id} c={r} onReply={setReplyTo} />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
