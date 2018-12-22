// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const $checkbox = document.getElementById('hide-setting');

chrome.storage.sync.get('twitterFixerSettingHide', function(data) {
  $checkbox.checked = data.twitterFixerSettingHide;
});

$checkbox.addEventListener('change', () => {
  chrome.storage.sync.set({ twitterFixerSettingHide: $checkbox.checked });
});
