# Tabs

Electron does not support tabs out of the box.

There is a really terrible library called electron-tabs which is deprecated. Do not use it.

Anything you look up online will suggest to make HTML tabs inside of the window. That is a bad idea. We want to make a custom window title bar that has tabs, so it will look like Chrome.

This should work for our purposes. Anything more involved with tab features besides basic dragging, opening, closing, etc, we would maybe want to consider extending Chromium, but that's a much larger project.

We may want to do this on the window title bar: https://github.com/adamschwartz/chrome-tabs

