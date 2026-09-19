/**
 * Student Council suggestion box -> Google Sheet
 *
 * HOW TO USE: open your Google Sheet, go to Extensions > Apps Script,
 * delete whatever code is there, paste this whole file, and click Save.
 * Then follow the "Suggestion box" steps in README.md to deploy it.
 */

const SHEET_NAME = 'Suggestions';                      // the tab that receives submissions
const HEADERS = ['Received', 'Name', 'Topic', 'Suggestion'];
const MAX_LENGTH = 3000;                               // longest text accepted per field

function doPost(e) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return reply_({ result: 'busy' });

  try {
    const p = (e && e.parameter) || {};
    if (p._gotcha) return reply_({ result: 'ignored' });   // spam trap was filled in: a bot

    const message = clean_(p.message);
    if (!message) return reply_({ result: 'error', error: 'Missing suggestion' });

    getSheet_().appendRow([
      new Date(),
      clean_(p.name) || 'Anonymous',
      clean_(p.topic),
      message
    ]);
    return reply_({ result: 'success' });
  } catch (err) {
    return reply_({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the Web app link in a browser should show this message (handy for testing).
function doGet() {
  return ContentService.createTextOutput('The suggestion box is running.');
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Trims text, caps its length, and stops anything starting with = + - @ from
// being treated as a spreadsheet formula.
function clean_(value) {
  let text = String(value || '').trim().slice(0, MAX_LENGTH);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function reply_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
