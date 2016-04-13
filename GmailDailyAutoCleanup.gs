function markReadAndArchiveOlderThanDate(thread, cutoff) {
  if (thread.getLastMessageDate() < cutoff) {
    Logger.log("Marking read and archiving thread " + thread.getId());
    thread.markRead();
    thread.moveToArchive();
  }
}

function goAwayBookBub() {
  var cutoff = new Date();
  cutoff.setUTCHours(8, 0, 0, 0);
  Logger.log("Searching for daily deal messages from BookBub that are unread or in the inbox...");
  var threads = GmailApp.search('from:BookBub subject:"Your ebook bargains for" (is:unread|in:inbox)');
  Logger.log("Marking read and archiving found BookBub threads older than " + cutoff.toISOString());
  threads.forEach(function(element) {markReadAndArchiveOlderThanDate(element, cutoff);});
}

function doCleanup() {
  goAwayBookBub();
}
