# Student Council Website

A plain static site — no server, no database, nothing to keep running on your
computer. Deploy it once and the link works forever (or until you take it down).

## 1. Preview it locally (optional)

Just double-click `index.html` and it opens in your browser. Click around —
everything works except the suggestion form, which needs step 3 below.

## 2. Put it online (about 1 minute)

**Recommended — GitHub Pages (never pauses, no usage limits to worry about):**

1. Sign up free at https://github.com (no card needed)
2. Click the **+** top right → **New repository**. Name it (e.g. `council-site`), set it to **Public**, click Create
3. Click **Add file → Upload files**, drag in every file from this folder (`index.html`, `about.html`, `videos.html`, `suggestions.html`, the `css` folder), click **Commit changes**
4. Go to **Settings → Pages**. Under "Build and deployment," set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**. Click Save
5. Wait ~1 minute, refresh that same page — your live link appears, like `yourusername.github.io/council-site`

To edit later: repeat step 3 with your updated file(s) — GitHub overwrites the old version.

Note: the repo is public (visible source code), which is fine here since nothing
in this site is secret. GitHub Pages has a generous soft bandwidth limit
(100GB/month) that's not enforced for normal small-site traffic — no risk of
your site getting paused mid-month, unlike some other free hosts.

**Alternative — Netlify Drop:**

1. Go to https://app.netlify.com/drop
2. Drag the whole `council-site-static` folder onto the page
3. Netlify gives you a live link immediately, like `https://random-name-123.netlify.app`
4. Send that link to anyone — it works from any device, no login needed to view it

Netlify's free tier now runs on a monthly credit system (300 credits). A site
this size won't come close to the limit in normal use, but if you want zero
chance of ever hitting a cap, GitHub Pages above is the safer long-term choice.
To keep the same Netlify link long-term, click "claim this site" after
dropping it — free, just needs an email.

**Alternative — GitHub Pages (see above), or Cloudflare Pages:** Cloudflare
Pages (pages.cloudflare.com) offers unmetered bandwidth for static sites like
this one — also a solid no-shutdown-risk choice, with a setup flow similar to
GitHub Pages.

## 3. Make the suggestion form actually reach you (~2 minutes, one-time)

The form is wired to a service called Formspree, which forwards submissions to
your email for free (50/month on the free plan — plenty for a student council).

1. Go to https://formspree.io and sign up (free, no card)
2. Click "New Form", name it whatever you like
3. Copy the form URL it gives you — looks like `https://formspree.io/f/abcd1234`
4. Open `suggestions.html` in a text editor, find this line near the top of the form:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
   ```
5. Replace `YOUR_FORM_ID` with your real ID, save
6. Re-drag the folder onto Netlify Drop to redeploy (or push the change to GitHub)

Every submission now lands in your email inbox, and you can also see a log of
all of them anytime at formspree.io.

## Editing content

Everything is plain HTML — no build step, no templating:
- **About page**: open `about.html`, edit the text and the council member cards directly
- **Videos**: open `videos.html`, copy one of the existing `<section class="card">` blocks and swap in your own YouTube video ID (the part after `v=` in a YouTube URL)
- **Styling**: `css/style.css` — colors are defined once at the top under `:root` if you want to change the color scheme

## What I'd extend first

1. **Formspree spam filtering** — their free plan includes basic spam filtering; if you get spam, turn it on in the Formspree dashboard.
2. **A real custom domain** — Netlify lets you connect one for free if the school (or you) owns one, e.g. `lincolnhscouncil.com`.
3. **A simple photo gallery page** the same way the video page works, if you want more than video content.
4. **Moving to a real backend later** — if the council grows and you want a searchable archive of suggestions or a members-only dashboard, the Node.js version I built earlier is a natural next step; happy to help wire the two together.
