# Student Council Website

A plain static site: 4 HTML pages plus an `images` folder. No server, no database.

```
index.html   about.html   videos.html   suggestions.html
images/      (10 pictures used by the pages)
google-sheets-script.gs   (NOT uploaded to the website; it goes inside your Google Sheet)
```

## 1. Preview locally (optional)

Double-click `index.html`. Everything looks right, but the YouTube videos may show an error
when opened straight from your computer. They work once the site is online.

## 2. Put it online (GitHub Pages)

1. Create a repository named `YourOrgName.github.io` (see the chat instructions for the clean-link setup), set to **Public**.
2. **Add file > Upload files**, then drag in the 4 `.html` files **and the whole `images` folder** together. Commit.
3. **Settings > Pages**: Source = **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. Wait about a minute, then open your link.

To update later, upload the changed file(s) again. GitHub overwrites the old ones. Each page carries its own
styling, so uploading one page can never break the others.

File names are case-sensitive on GitHub, so keep the `images` file names exactly as they are.

## 3. Suggestion box -> your own Google Sheet (about 5 minutes, one time)

Use a **personal** Google account (school accounts often block this).

1. Go to https://sheets.new and name the sheet "Student Council Suggestions".
2. **Extensions > Apps Script**. Delete any code there, paste everything from `google-sheets-script.gs`, click the Save icon.
3. Click **Deploy > New deployment**. Click the gear next to "Select type" and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**.
4. Click **Authorize access**, pick your account, then **Advanced > Go to (project name) > Allow**.
   (Google shows a warning because you wrote the script yourself. That's normal.)
5. Copy the **Web app URL** (it ends in `/exec`).
6. Open `suggestions.html` in a text editor, find `var SHEET_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';`,
   replace the text inside the quotes with your URL, save, and re-upload just that file.
7. Test it: send a suggestion on the live site. A new row appears in the sheet's **Suggestions** tab.

If you ever edit the script: **Deploy > Manage deployments > pencil icon > Version: New version > Deploy**.
That keeps the same URL. ("New deployment" would create a different URL.)

You own the sheet, so you have full access. Use the **Share** button to give other council members access.

## Editing content

- **Text**: open the page in a text editor and edit it directly.
- **Photos**: replace a file in `images/` with a new picture that has the *same file name*.
- **Videos**: copy a `<article class="card">` block in `videos.html` and swap in a YouTube ID
  (the part after `v=`, or after `/shorts/`).
- **Colors**: each file has a `<style>` block near the top; the colors are defined once under `:root`.
  The block is repeated in all 4 files, so change it in each (or ask me to update all 4).
