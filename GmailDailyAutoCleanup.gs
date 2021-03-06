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
  if (threads.length) {
    Logger.log("Marking read and archiving found BookBub threads older than " + cutoff.toISOString());
    threads.forEach(function(element) {markReadAndArchiveOlderThanDate(element, cutoff);});
  } else {
    Logger.log("No BookBub threads found; nothing to do.");
  }
}

function didntEat24() {
  var cutoff = new Date();
  cutoff.setUTCHours(8, 0, 0, 0);
  cutoff.setUTCDate(cutoff.getUTCDate() - cutoff.getUTCDay());
  Logger.log("Searching for weekend coupon messages from Eat24 that are unread or in the inbox...");
  var threads = GmailApp.search('from:eat24hrs.com subject:"Your Weekend Coupon" (is:unread|in:inbox) older_than:2d');
  if (threads.length) {
    Logger.log("Marking read and archiving found Eat24 coupon threads older than last Sunday (" + cutoff.toISOString() + ")");
    threads.forEach(function(element) {markReadAndArchiveOlderThanDate(element, cutoff);});
  } else {
    Logger.log("No Eat24 threads found; nothing to do.");
  }
}

function oldegg() {
  var cutoff = new Date();
  cutoff.setUTCHours(8, 0, 0, 0);
  cutoff.setUTCDate(cutoff.getUTCDate() - 2);
  Logger.log("Searching for Newegg deal emails that are unread or in the inbox and more than two days old...");
  var threads = GmailApp.search('from:promo@(promo|e).newegg.com (is:unread|in:inbox) older_than:2d');
  if (threads.length) {
    Logger.log("Marking read and archiving found Newegg threads older than " + cutoff.toISOString() + ")");
    threads.forEach(function(element) {markReadAndArchiveOlderThanDate(element, cutoff);});
  } else {
    Logger.log("No Newegg threads found; nothing to do.");
  }
}

function doCleanup() {
  goAwayBookBub();
  didntEat24();
  oldegg();
  Logger.log("Cleanup finished.");
}
