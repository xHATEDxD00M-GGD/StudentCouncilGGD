/**
 * Student Council suggestion box + monthly poll -> Google Sheet
 *
 * HOW TO USE: open your Google Sheet, go to Extensions > Apps Script,
 * delete whatever code is there, paste this whole file, and click Save.
 * Then follow the "Suggestion box" steps in README.md to deploy it.
 *
 * This single script handles TWO forms from the website - the suggestion
 * box (suggestions.html) and the monthly poll (polls.html) - and writes
 * each to its own tab in the same spreadsheet. Which one a submission goes
 * to is decided by the hidden "_form" field each page's form sends.
 *
 * POLLS: each vote includes a name, and a person can only vote once per
 * topic - this function checks the Polls tab for an existing row with the
 * same topic + name (case-insensitive) before adding a new one. A new
 * month's topic text is a different topic, so everyone can vote again
 * automatically once the question changes. The site itself never displays
 * which answer is winning - that's a front-end choice, not a privacy
 * guarantee, so the Polls tab (which you can see) does show who voted for
 * what. Nobody else can see it unless you share the sheet with them.
 */

const MAX_LENGTH = 3000; // longest text accepted per field

function doPost(e) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return reply_({ result: 'busy' });

  try {
    const p = (e && e.parameter) || {};
    if (p._gotcha) return reply_({ result: 'ignored' }); // spam trap was filled in: a bot

    const formType = p._form || 'suggestion';
    if (formType === 'poll') return handlePoll_(p);
    return handleSuggestion_(p);
  } catch (err) {
    return reply_({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function handleSuggestion_(p) {
  const message = clean_(p.message);
  if (!message) return reply_({ result: 'error', error: 'Missing suggestion' });

  getSheet_('Suggestions', ['Received', 'Name', 'Topic', 'Suggestion']).appendRow([
    new Date(),
    clean_(p.name) || 'Anonymous',
    clean_(p.topic),
    message
  ]);
  return reply_({ result: 'success' });
}

function handlePoll_(p) {
  const name = clean_(p.name);
  const topic = clean_(p.topic);
  const choice = clean_(p.choice);
  if (!name) return reply_({ result: 'error', error: 'Missing name' });
  if (!choice) return reply_({ result: 'error', error: 'Missing choice' });

  const sheet = getSheet_('Polls', ['Received', 'Topic', 'Name', 'Choice']);

  // One vote per name per topic. Small sheet, so a plain scan is plenty fast.
  const rows = sheet.getDataRange().getValues();
  const topicKey = topic.toLowerCase();
  const nameKey = name.toLowerCase();
  for (let i = 1; i < rows.length; i++) {
    const rowTopic = String(rows[i][1] || '').toLowerCase();
    const rowName = String(rows[i][2] || '').toLowerCase();
    if (rowTopic === topicKey && rowName === nameKey) {
      return reply_({ result: 'error', error: 'already_voted' });
    }
  }

  sheet.appendRow([new Date(), topic, name, choice]);
  return reply_({ result: 'success' });
}

// Visiting the Web app link in a browser should show this message (handy for testing).
function doGet() {
  return ContentService.createTextOutput('The suggestion box and poll are running.');
}

// Gets (or creates) a tab with the given name and header row.
function getSheet_(sheetName, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
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
