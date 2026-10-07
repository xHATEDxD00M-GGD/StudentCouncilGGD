# Student Council Website

A plain static site: 8 HTML pages plus an `images` folder. No server, no database.

```
index.html   about.html       videos.html    events.html
polls.html   announcements.html   student-art.html   suggestions.html
images/      (14 pictures used by the pages)
google-sheets-script.gs   (NOT uploaded to the website; it goes inside your Google Sheet)
```

## 1. Preview locally (optional)

Double-click `index.html`. Everything looks right, but the YouTube videos may show an error
when opened straight from your computer. They work once the site is online.

## 2. Put it online (GitHub Pages)

1. Create a repository named `YourOrgName.github.io` (see the chat instructions for the clean-link setup), set to **Public**.
2. **Add file > Upload files**, then drag in all 8 `.html` files **and the whole `images` folder** together. Commit.
3. **Settings > Pages**: Source = **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. Wait about a minute, then open your link.

To update later, upload the changed file(s) again. GitHub overwrites the old ones. Each page carries its own
styling, so uploading one page can never break the others.

File names are case-sensitive on GitHub, so keep the `images` file names exactly as they are.

## 3. Suggestion box AND poll -> your own Google Sheet

One Google Sheet, one script, two tabs: **Suggestions** and **Polls**. The script changed again this round
(polls now collect a name) — if you already had it deployed, you only need to redo steps 2-3 below. Your
sheet, URL, and existing data all stay put.

Use a **personal** Google account (school accounts often block this).

1. Go to https://sheets.new and name the sheet "Student Council Suggestions" (skip if you already have one).
2. **Extensions > Apps Script**. Delete *everything* in the editor, paste in the full contents of
   `google-sheets-script.gs`, click the Save icon.
3. Deploy it:
   - **First time ever**: **Deploy > New deployment**, gear icon next to "Select type" → **Web app**, Execute
     as **Me**, Who has access **Anyone**, click **Deploy**. Click **Authorize access**, pick your account,
     then **Advanced > Go to (project name) > Allow** (Google warns because you wrote the script yourself —
     normal). Copy the **Web app URL** (ends in `/exec`).
   - **Already deployed, just updating the script**: **Deploy > Manage deployments** → pencil icon → Version:
     **New version** → **Deploy**. Keeps your existing URL — no need to touch either HTML file's URL again.
4. `suggestions.html` already has a working URL in it from before — leave it alone unless you're starting
   fresh.
5. Open `polls.html`, find `var SHEET_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';`, and paste in the **same** URL
   from step 3. One script now handles both forms.
6. Save and re-upload whichever file(s) you changed.
7. Test both: submit a suggestion and cast a poll vote on the live site. New rows should appear in the
   **Suggestions** and **Polls** tabs (created automatically on first submission).

You own the sheet, so you have full access. Use the **Share** button to give other council members access.

### Changing the monthly poll

Open `polls.html`, look for the big comment near the top of `<main>`. Short version: edit the question in
`<h2 class="poll-topic">`, edit each answer's visible text and `value="..."`, save, re-upload that file. New
topic text automatically lets everyone vote again — no script changes needed.

### About the one-vote rule and privacy

Voting now asks for a name, specifically so the same person can't vote twice on the same question — the
script checks the Polls tab for a matching name + topic before accepting a new vote. This means the Polls tab
in your sheet **does** show who voted for what (previously it didn't). The site itself still never displays
which answer is winning anywhere public — that part hasn't changed. Only you (and anyone you share the sheet
with) can see the breakdown.

On top of the server-side check, the page also remembers your browser's last vote with `localStorage`, so the
form visibly locks itself right after voting instead of just silently failing on a second try. Clearing
browser data or switching devices doesn't get around the real check — that part happens in the sheet.

## Editing content

- **Text**: open the page in a text editor and edit it directly.
- **Photos**: replace a file in `images/` with a new picture that has the *same file name*.
- **Videos**: copy an `<article class="card">` block in `videos.html` and swap in a YouTube ID.
- **Class presidents**: in `about.html`, under "Class Presidents," each of the 4 squares now has a name, role,
  and a short italic bio line (`<p class="mini-note">`) — edit all three directly. No photos yet, as requested;
  there's a comment showing how to add one later.
- **Announcements**: on `announcements.html`, the gold-glowing card at the top is the pinned one — keep only
  one. Copy a plain `<article class="card reveal announcement">` block to add more, or delete the placeholder
  ones.
- **Student Art**: on `student-art.html`, swap a `<div class="art-frame-placeholder">...</div>` block for a
  real `<img>` once you have art to post — the comment above the gallery shows exactly how. Students are
  pointed to the Suggestions page to tell you where to find their art (this static site can't accept file
  uploads directly).
- **Current Fundraisers / Games Sign-Up**: unchanged from before — on `events.html`, both are placeholders
  (fundraisers is empty on purpose, sign-up form is visual-only and doesn't submit).
- **Colors**: each file has a `<style>` block near the top; colors are defined once under `:root`
  (`--plum`, `--gold`, `--fuchsia`, etc.). The block is repeated in every file, so change it in each one if
  you want a different palette site-wide (or ask me to update them all at once).

## What's new in this version

- **All 10 placeholder/joke images replaced** with the new ones you sent — nothing repeats anywhere on the
  site except the 2 images now used in the scrolling yellow ticker (shown on every page on purpose, same as
  the ticker text was before). Your 4 named council member photos (`president.jpg`, `vp.jpg`, `secretary.jpg`,
  `treasurer.jpg`) were left untouched since they're tied to specific names and videos.
- **Announcements page** — a pinned, gold-glowing "featured" announcement at the top plus a running list below,
  styled like a corkboard. The nav link has a small pulsing dot so it's hard to miss.
- **Student Art page** — explains how to get art featured (via the Suggestions page, since uploads aren't
  possible on a static site) plus a polaroid-style placeholder gallery.
- **Polls now require a name and enforce one vote per person** (details above).
- **Meetings info updated** to "Once a month. No date for October yet!" — the duplicate Meetings banner that
  used to also appear on the About page was removed since it's now only on the homepage.
- **Class president bios added** — each of the 4 squares has a short placeholder bio line now, matching the
  style of the full council member cards. Still no photos, per your note.
- **Yellow ticker now shows two images instead of two quotes**, deliberately stretched sideways for a goofy
  look.
- **A lot more decoration, and every page is deliberately different now**: Home has a slowly drifting crown
  behind the hero and a 5-click logo easter egg (shooting stars). About has council cards that tilt playfully
  on hover plus drifting confetti dots. Videos has a pulsing "Winner" badge that pops a confetti burst after 3
  clicks. Events has shimmering placeholder photo boxes and a bouncing "Upcoming" icon. Polls has a gently
  wiggling doodle and an animated ballot icon. Suggestions has a live, increasingly judgmental character
  counter and a little "launch" animation on the send button. Announcements and Student Art each have their
  own distinct visual identity (corkboard vs. polaroid wall) using icons instead of photos. All animations
  respect a visitor's "reduce motion" accessibility setting, so nobody gets stuck with motion they didn't ask
  for.
