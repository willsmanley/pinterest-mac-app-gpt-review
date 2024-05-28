# Electron vs Tauri

Electron is the popular incumbent and Tauri is a new challenger in the space of building JS apps for native desktop.

While Tauri is very new and exciting, and provides some perf and devex benefits, there are a couple of deal-breakers for this project:
- Uses native platform web engine (so WebKit on Mac), which does not have cross-platform feature-parity like Chromium does
- Back end must be written in Rust, not a core competency for web engineers
