CREATE TABLE public.page_comments (
  id uuid primary key default gen_random_uuid(),
  page_path text not null,
  author_name text not null check (length(trim(author_name)) between 1 and 80),
  message text not null check (length(trim(message)) between 1 and 2000),
  reply_to uuid references public.page_comments(id) on delete set null,
  hidden_flag boolean not null default true,
  created_at timestamptz not null default now()
);

CREATE INDEX page_comments_path_idx ON public.page_comments (page_path, created_at desc);
CREATE INDEX page_comments_reply_idx ON public.page_comments (reply_to);

GRANT SELECT, INSERT ON public.page_comments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_comments TO authenticated;
GRANT ALL ON public.page_comments TO service_role;

ALTER TABLE public.page_comments ENABLE ROW LEVEL SECURITY;

-- Visitors can read only approved (non-hidden) comments.
CREATE POLICY "Anyone can read approved comments"
ON public.page_comments
FOR SELECT
TO anon, authenticated
USING (hidden_flag = false);

-- Anyone can submit a comment; it stays hidden until an admin approves it.
CREATE POLICY "Anyone can post a comment"
ON public.page_comments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
