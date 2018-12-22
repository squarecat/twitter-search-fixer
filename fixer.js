// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// TODO allow user to specify what to hide
// - recent searches
// - saved searches
// - topics
// - user accounts

let hideSetting;
chrome.storage.sync.get('twitterFixerSettingHide', function(data) {
  hideSetting = data.twitterFixerSettingHide;
});

chrome.storage.onChanged.addListener(function({ twitterFixerSettingHide }) {
  hideSetting = twitterFixerSettingHide.newValue;
  resetStuff();
});

const searchInput = document.querySelector('.search-input');
const toHide =
  '.typeahead-recent-searches, .typeahead-saved-searches, .typeahead-topics';

const typeaheadSelector = '.typeahead';
const resultsSelector = '.js-typeahead-results';
const accountsSelector = '.typeahead-accounts';

const hideClass = 'twitter-fixer-hide-me';
const reverseClass = 'twitter-fixer-reverse';
const hideAccountBorderClass = 'twitter-fixer-accounts';

searchInput.addEventListener('focus', doTheMagic);
searchInput.addEventListener('blur', doTheMagic);
searchInput.addEventListener('input', doTheMagic);

function resetStuff() {
  showStuff();
  unReverseStuff();
}

function doTheMagic({ currentTarget }) {
  if (hideSetting) {
    if (currentTarget.value) {
      hideStuff();
    } else {
      showStuff();
    }
  } else {
    showStuff();
    reverseStuff();
  }
}

function reverseStuff() {
  const results = document.querySelector(resultsSelector);
  results.classList.add(reverseClass);
  fixAccountBorder(true);
}

function unReverseStuff() {
  const results = document.querySelector(resultsSelector);
  results.classList.remove(reverseClass);
  fixAccountBorder(false);
}

function hideStuff() {
  const typeahead = document.querySelector(typeaheadSelector);
  [...typeahead.querySelectorAll(toHide)].forEach(el =>
    el.classList.add(hideClass)
  );
  fixAccountBorder(true);
}

function showStuff() {
  const typeahead = document.querySelector(typeaheadSelector);
  [...typeahead.querySelectorAll(toHide)].forEach(el =>
    el.classList.remove(hideClass)
  );
  fixAccountBorder(false);
}

function fixAccountBorder(remove) {
  if (remove) {
    document
      .querySelector(accountsSelector)
      .classList.add(hideAccountBorderClass);
  } else {
    document
      .querySelector(accountsSelector)
      .classList.remove(hideAccountBorderClass);
  }
}
