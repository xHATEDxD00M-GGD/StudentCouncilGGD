# Student Council Website

A plain static site — no server, no database, nothing to keep running on your
computer. Deploy it once and the link works forever (or until you take it down).

## 1. Preview it locally (optional)

Just double-click `index.html` and it opens in your browser. Click around —
everything works except the suggestion form, which needs step 3 below.

## 2. Put it online (about 1 minute)

**Easiest option — Netlify Drop:**

1. Go to https://app.netlify.com/drop
2. Drag the whole `council-site-static` folder onto the page
3. Netlify gives you a live link immediately, like `https://random-name-123.netlify.app`
4. Send that link to anyone — it works from any device, no login needed to view it

To keep the same link long-term (it can expire if unclaimed) or set a nicer
name/custom domain, click "claim this site" after dropping it — free, just needs
an email.

**Alternative — GitHub Pages:** if you're already comfortable with GitHub, push
this folder to a repo and turn on Pages in Settings. More setup, but free and
under your own GitHub account long-term.

## 3. Make the suggestion form actually reach you (~3 minutes, one-time)

The suggestions page embeds a Google Form. Every response lands in a live
Google Sheet, and you can turn on an email for every new submission.

1. Go to https://forms.google.com and sign in with any Google account
2. Click "Blank form". Add three questions:
   - **Name** — Short answer, not required
   - **Topic** — Short answer, not required
   - **Suggestion** — Paragraph, required
3. Click **Send** (top right), then click the **`< >`** embed icon in the dialog
4. Copy just the URL inside the `src="..."` it gives you — looks like
   `https://docs.google.com/forms/d/e/XXXXXXX/viewform?embedded=true`
5. Open `suggestions.html` in a text editor, find:
   ```html
   <iframe src="YOUR_GOOGLE_FORM_EMBED_URL" ...>
   ```
6. Replace `YOUR_GOOGLE_FORM_EMBED_URL` with the URL you copied, save
7. Re-drag the folder onto Netlify Drop to redeploy (or push the change to GitHub)

To get an email every time someone submits: in the Google Form editor, open the
**Responses** tab, click the three-dot menu, then **"Get email notifications for
new responses."** You can also view every response as a spreadsheet from that
same tab at any time.

## Editing content

Everything is plain HTML — no build step, no templating:
- **About page**: open `about.html`, edit the text and the council member cards directly
- **Videos**: open `videos.html`, copy one of the existing `<section class="card">` blocks and swap in your own YouTube video ID (the part after `v=` in a YouTube URL)
- **Styling**: `css/style.css` — colors are defined once at the top under `:root` if you want to change the color scheme

## What I'd extend first

1. **Google Forms spam control** — Google Forms has solid built-in spam filtering already; if you still get junk responses, you can require sign-in (Settings → Responses → "Restrict to users in [your school domain]") if your school uses Google Workspace accounts.
2. **A real custom domain** — Netlify lets you connect one for free if the school (or you) owns one, e.g. `lincolnhscouncil.com`.
3. **A simple photo gallery page** the same way the video page works, if you want more than video content.
4. **Moving to a real backend later** — if the council grows and you want a searchable archive of suggestions or a members-only dashboard, the Node.js version I built earlier is a natural next step; happy to help wire the two together.
