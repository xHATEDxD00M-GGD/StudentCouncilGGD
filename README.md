# Student Council Website

A plain static site — no server, no database, nothing to keep running on your
computer. Just 4 files, no folders. Deploy it once and the link works forever
(or until you take it down).

## 1. Preview it locally (optional)

Just double-click `index.html` and it opens in your browser. Click around —
everything works except the suggestion form, which needs step 3 below.

## 2. Put it online (about 1 minute)

**Recommended — GitHub Pages (never pauses, no usage limits to worry about):**

1. Sign up free at https://github.com (no card needed)
2. Click the **+** top right → **New repository**. Name it (e.g. `council-site`), set it to **Public**, click Create
3. Click **Add file → Upload files**, drag in the 4 files — `index.html`, `about.html`, `videos.html`, `suggestions.html` — click **Commit changes**
4. Go to **Settings → Pages**. Under "Build and deployment," set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**. Click Save
5. Wait ~1 minute, refresh that same page — your live link appears, like `yourusername.github.io/council-site`

To edit later: repeat step 3 with your updated file(s) — GitHub overwrites the old version. There's no `css` folder to keep track of anymore — each page carries its own styling internally, so dragging in a single updated file can never break the look of the site.

Note: the repo is public (visible source code), which is fine here since nothing
in this site is secret.

**Alternative — Netlify Drop:**

1. Go to https://app.netlify.com/drop
2. Drag the 4 HTML files onto the page (as files, not inside a folder)
3. Netlify gives you a live link immediately, like `https://random-name-123.netlify.app`

Netlify's free tier now runs on a monthly credit system (300 credits). A site
this size won't come close to the limit in normal use, but if you want zero
chance of ever hitting a cap, GitHub Pages above is the safer long-term choice.

**Alternative — Cloudflare Pages:** pages.cloudflare.com offers unmetered
bandwidth for static sites like this one — also a solid no-shutdown-risk
choice, with a setup flow similar to GitHub Pages.

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
7. Re-upload just that one file to GitHub (or Netlify) to redeploy

To get an email every time someone submits: in the Google Form editor, open the
**Responses** tab, click the three-dot menu, then **"Get email notifications for
new responses."** You can also view every response as a spreadsheet from that
same tab at any time.

## Editing content

Everything is plain HTML with the styling built directly into each page — no
build step, no separate CSS file to link correctly:
- **About page**: open `about.html`, edit the text and the council member cards directly
- **Videos**: open `videos.html`, copy one of the existing `<section class="card">` blocks and swap in your own YouTube video ID (the part after `v=` in a YouTube URL)
- **Styling**: each file has a `<style>` block near the top, right after `<title>`. Colors are defined once at the top of that block under `:root` — change `--navy` and `--gold` there to shift the whole color scheme. Since the style block is duplicated in all 4 files, update it in each one if you want the change everywhere (or ask me to do it — I can update all 4 at once).

## What I'd extend first

1. **A real custom domain** — GitHub Pages and Netlify both let you connect one for free if the school (or you) owns one, e.g. `lincolnhscouncil.com`.
2. **A simple photo gallery page** the same way the video page works, if you want more than video content.
3. **Restrict form access to school accounts** — if your school uses Google Workspace, Google Forms settings let you require sign-in with a school email, cutting down spam automatically.
4. **Moving to a real backend later** — if the council grows and you want a searchable archive of suggestions or a members-only dashboard, the Node.js version I built earlier is a natural next step; happy to help wire the two together.
