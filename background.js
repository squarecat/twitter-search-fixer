// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const options = {
  twitterFixerSettingHide: true
};

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo.status === 'complete' && tab.url.match(/twitter\.com/)) {
//     chrome.pageAction.show(tabId);
//   } else {
//     chrome.pageAction.hide(tabId);
//   }
// });

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(options);
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([
  //     {
  //       conditions: [
  //         new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: { hostEquals: 'twitter.com', schemes: ['http', 'https'] },
  //           css: ['.search-input']
  //         })
  //       ],
  //       actions: [new chrome.declarativeContent.ShowPageAction()]
  //     }
  //   ]);
  // });
});

function onWebNav(details) {
  if (details.frameId === 0) {
    // Top-level frame
    chrome.pageAction.show(details.tabId);
  }
}
const filter = {
  url: [
    {
      hostEquals: 'twitter.com'
    }
  ]
};
chrome.webNavigation.onCommitted.addListener(onWebNav, filter);
chrome.webNavigation.onHistoryStateUpdated.addListener(onWebNav, filter);
