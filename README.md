# Student Council Website

A plain static site: 6 HTML pages plus an `images` folder. No server, no database.

```
index.html   about.html   videos.html   events.html   polls.html   suggestions.html
images/      (10 pictures used by the pages)
google-sheets-script.gs   (NOT uploaded to the website; it goes inside your Google Sheet)
```

## 1. Preview locally (optional)

Double-click `index.html`. Everything looks right, but the YouTube videos may show an error
when opened straight from your computer. They work once the site is online.

## 2. Put it online (GitHub Pages)

1. Create a repository named `YourOrgName.github.io` (see the chat instructions for the clean-link setup), set to **Public**.
2. **Add file > Upload files**, then drag in all 6 `.html` files **and the whole `images` folder** together. Commit.
3. **Settings > Pages**: Source = **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. Wait about a minute, then open your link.

To update later, upload the changed file(s) again. GitHub overwrites the old ones. Each page carries its own
styling, so uploading one page can never break the others.

File names are case-sensitive on GitHub, so keep the `images` file names exactly as they are.

## 3. Suggestion box AND poll -> your own Google Sheet

One Google Sheet, one script, two tabs: **Suggestions** and **Polls**. If you already
set this up before, you only need to redo steps 2 and 3 below (the script changed to
add poll support) — your existing sheet, URL, and Suggestions data all stay put.

Use a **personal** Google account (school accounts often block this).

1. Go to https://sheets.new and name the sheet "Student Council Suggestions" (skip this if you already have one).
2. **Extensions > Apps Script**. Delete *everything* in the editor, paste in the full contents of
   `google-sheets-script.gs`, click the Save icon.
3. Deploy it:
   - **First time ever**: click **Deploy > New deployment**, click the gear next to "Select type," choose
     **Web app**, set Execute as **Me** and Who has access **Anyone**, click **Deploy**. Click **Authorize
     access**, pick your account, then **Advanced > Go to (project name) > Allow** (Google warns because you
     wrote the script yourself — that's normal). Copy the **Web app URL** (ends in `/exec`).
   - **Already deployed before, just updating the script**: click **Deploy > Manage deployments**, click the
     pencil icon, change Version to **New version**, click **Deploy**. This keeps your existing URL — you do
     **not** need to update `suggestions.html` again.
4. Open `suggestions.html` in a text editor. If `var SHEET_URL = ...` doesn't already have your real URL in
   it, paste it in now, between the quotes.
5. Open `polls.html` the same way, find `var SHEET_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';`, and paste in the
   **same** URL from step 3. One script now handles both forms.
6. Save both files and re-upload them.
7. Test both: submit a suggestion and cast a poll vote on the live site. You should see a new row appear in
   the **Suggestions** tab and the **Polls** tab (the tabs are created automatically the first time each gets
   a submission).

You own the sheet, so you have full access. Use the **Share** button to give other council members access.

### Changing the monthly poll

Open `polls.html` and look for the big comment near the top of `<main>` — it walks through exactly which
lines to edit. Short version: change the question text in `<h2 class="poll-topic">`, change each answer's
visible text and its `value="..."`, save, re-upload just that one file. No script changes needed to swap the
question each month.

### About poll results

Nothing on the site shows which answer is winning — that was intentional. You can see every vote (with a
timestamp) anytime in the **Polls** tab of your sheet; nobody else can unless you share the sheet with them.

## Editing content

- **Text**: open the page in a text editor and edit it directly.
- **Photos**: replace a file in `images/` with a new picture that has the *same file name*. For the Events
  page, the dashed "Photo coming soon" boxes have a comment right above them in `events.html` showing exactly
  what to swap in once you have real photos.
- **Videos**: copy a `<article class="card">` block in `videos.html` and swap in a YouTube ID
  (the part after `v=`, or after `/shorts/`).
- **Class presidents**: in `about.html`, find the "Class Presidents" section — four small squares for
  Freshman/Sophomore/Junior/Senior. Each currently shows a placeholder letter and "TBD." Edit the name and
  role text directly; there's a comment showing how to swap the letter for a real photo once you have one.
- **Current Fundraisers**: on `events.html`, this section just shows "No fundraisers running right now." When
  you have one, replace that `<div class="empty-state">...</div>` block with your own card (copy the style of
  an event card above it, or ask me to build it once you know the details).
- **Games Sign-Up**: also on `events.html`. This form is visual only right now — every field is disabled and
  it can't actually submit anything, on purpose, per your request. When you're ready to make it real (saving
  sign-ups to a sheet, limiting one entry per grade, etc.), let me know and I'll wire it up the same way the
  suggestion box and poll work.
- **Colors**: each file has a `<style>` block near the top; the colors are defined once under `:root`
  (`--plum`, `--gold`, `--fuchsia`, etc.). The block is repeated in all 6 files, so change it in each one if
  you want a different palette everywhere (or ask me to update all of them at once).

## What's new in this version

- **Events page** — Upcoming Events, Past Events (photo placeholders ready for when you send real pictures),
  Current Fundraisers (empty for now), and a Games Sign-Up section (visual preview, not functional yet).
- **Polls page** — a monthly poll that saves anonymous votes to your sheet, with no public results display.
- **Class president squares** — four placeholder cards on the About page for Freshman through Senior
  presidents.
- **Scroll animations** — cards and sections now gently fade/slide into view as you scroll down each page,
  and grid items (events, council members) stagger in one after another. Respects an "animations off" setting
  if a visitor has one turned on in their system, so it won't bother anyone who finds motion distracting.
