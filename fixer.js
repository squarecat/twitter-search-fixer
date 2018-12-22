// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// TODO allow user to specify what to hide
// - recent searches
// - saved searches
// - topics
// - user accounts

const searchInput = document.querySelector('.search-input');
const toHide =
  '.typeahead-recent-searches, .typeahead-saved-searches, .typeahead-topics';

searchInput.addEventListener('focus', doTheMagic);
searchInput.addEventListener('blur', doTheMagic);
searchInput.addEventListener('input', doTheMagic);

function doTheMagic({ currentTarget }) {
  if (currentTarget.value) {
    hideStuff();
  } else {
    showStuff();
  }
}

function reverseStuff() {
  const results = document.querySelector('.js-typeahead-results');
  results.classList.add('twitter-fixer-reverse-me');
}

function showStuff() {
  const typeahead = document.querySelector('.typeahead');
  [...typeahead.querySelectorAll(toHide)].forEach(el =>
    el.classList.remove('twitter-fixer-hide-me')
  );
  document
    .querySelector('.js-typeahead-accounts')
    .classList.add('twitter-fixer-accounts-improved');
}

function hideStuff() {
  const typeahead = document.querySelector('.typeahead');
  [...typeahead.querySelectorAll(toHide)].forEach(el =>
    el.classList.add('twitter-fixer-hide-me')
  );
  document
    .querySelector('.js-typeahead-accounts')
    .classList.remove('twitter-fixer-accounts-improved');
}
