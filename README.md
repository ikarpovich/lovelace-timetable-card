# 📅 Timetable Card for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![CI](https://github.com/ikarpovich/lovelace-timetable-card/actions/workflows/ci.yml/badge.svg)](https://github.com/ikarpovich/lovelace-timetable-card/actions/workflows/ci.yml)
[![Version](https://img.shields.io/github/v/release/ikarpovich/lovelace-timetable-card)](https://github.com/ikarpovich/lovelace-timetable-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/ikarpovich/lovelace-timetable-card?style=flat)](https://github.com/ikarpovich/lovelace-timetable-card/stargazers)

A beautiful, interactive school timetable card for [Home Assistant](https://www.home-assistant.io/) — perfect for families with multiple children at different schools.

Originally created by [AyKay35](https://github.com/AyKay35). Thanks to the original author for the foundation of this project.

---

## ✨ Features

- 📅 **Weekly timetable** — full Monday–Friday overview at a glance
- 👨‍👩‍👧‍👦 **Multiple children** — one tab per child, personal color theme and emoji
- 🏫 **Per-child time slots** — different schools, different schedules, no problem
- 🎨 **Fully customizable subjects** — define your own subjects with individual colors
- ✏️ **Visual editor** — configure everything without touching YAML
- 🖱️ **Drag & drop + tap-to-place** — fill in the timetable intuitively
- 💾 **Stored in HA config** — backed up automatically with Home Assistant
- 📱 **Tablet-optimized** — designed for wall-mounted tablets
- 🌙 **Dark mode support** — respects Home Assistant theme variables

---

## 📦 Installation

### Via HACS (recommended)

1. Open **HACS** → **Frontend** → three-dot menu (⋮) → **Custom repositories**
2. Add:
   ```
   https://github.com/ikarpovich/lovelace-timetable-card
   ```
   Category: **Dashboard**
3. Find **Timetable Card** → **Download**
4. Hard-refresh your browser (`Ctrl+Shift+R`)

### Manual

1. Download `timetable-card.js` from the [latest release](https://github.com/ikarpovich/lovelace-timetable-card/releases)
2. Copy to `/config/www/timetable-card.js`
3. Add as Lovelace resource: `/local/timetable-card.js` (JavaScript module)

---

## 🚀 Quick Start

1. Add card → search **Timetable**
2. Card appears with example data
3. Click card → **Edit** to open the visual editor
4. Add your children, set time slots, fill in the timetable

No YAML required. Everything works through the visual editor.

The card shows the timetable only by default. Use the **Subjects** and **Lesson counts** display toggles in the visual editor if you want the sections below the table.

---

## 🖼️ Visual Editor

The editor is split into tabs — one per child — plus a **🎨 Subjects** section for subject management.

### Per-child configuration

| Element      | Action                                           |
| ------------ | ------------------------------------------------ |
| Emoji        | Click to open emoji picker                       |
| Name / Class | Click to edit, saves on blur (Tab or click away) |
| Color dots   | Click to change color theme                      |
| Days         | Select 5, 6, or 7 visible days for this child    |
| ⏱ Time slots  | Toggle time slot editor                          |
| **+** button | Add a new child                                  |

### Filling in the timetable

- **Tap-to-place**: tap a subject in the palette → tap a cell
- **Drag & drop**: drag from palette directly into a cell
- **Remove**: tap the × on a filled cell

### Managing subjects (🎨 Subjects section)

- Click the colored circle to open a color picker
- Edit name directly in the field
- Add / remove subjects freely
- Live preview shows all chips with their colors

---

## ⚙️ Full YAML Reference

```yaml
type: custom:timetable-card
show_subject_legend: false # show subject pills below the table
show_day_summary: false # show lesson counts below the table

subjects:
  - name: Math
    color: "#1d4ed8"
  - name: German
    color: "#854d0e"
  - name: English
    color: "#065f46"
  - name: Physical Education
    color: "#5b21b6"
  - name: Class Council # custom school-specific subjects
    color: "#7e22ce"
  - name: Study Hall
    color: "#14532d"
  # add as many as you need...

kids:
  - name: Lena
    age: Grade 3
    days: 5 # visible days: 5, 6, or 7
    emoji: "🌸"
    color: "#f472b6" # tab accent color
    accent: "#be185d" # darker shade for text
    light: "#fdf2f8" # light background for active tab
    slots:
      - slot: 1
        time: "08:00"
        end: "08:45"
      - slot: 2
        time: "08:45"
        end: "09:30"
      - slot: 3
        time: "09:50"
        end: "10:35"
      - slot: 4
        time: "10:35"
        end: "11:20"
      # afternoon lessons:
      # - slot: 7
      #   time: "14:00"
      #   end: "14:45"
    schedule:
      Mon:
        - slot: 1
          subject: German
        - slot: 2
          subject: Math
        - slot: 3
          subject: Physical Education
      Tue:
        - slot: 1
          subject: Math
        - slot: 2
          subject: English
      Wed: []
      Thu:
        - slot: 1
          subject: Art
        - slot: 2
          subject: Music
      Fri:
        - slot: 1
          subject: German
        - slot: 2
          subject: Physical Education

  - name: Jonas
    age: Grade 5
    days: 5
    emoji: "🚀"
    color: "#60a5fa"
    accent: "#1d4ed8"
    light: "#eff6ff"
    slots: # Jonas's school starts earlier
      - slot: 1
        time: "07:55"
        end: "08:40"
      - slot: 2
        time: "08:40"
        end: "09:25"
      - slot: 3
        time: "09:45"
        end: "10:30"
    schedule:
      Mon:
        - slot: 1
          subject: English
        - slot: 2
          subject: Math
      Tue: []
      Wed: []
      Thu: []
      Fri: []
```

Day keys use the English abbreviations `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, and `Sun`. Set `days` to `5`, `6`, or `7` for each child; six days includes Saturday and seven days includes Sunday. The **Days** control in the visual editor changes the setting for the selected child. Existing configurations using the legacy `Mo`, `Di`, `Mi`, `Do`, and `Fr` keys are still imported automatically.

### Child color presets

| Color     | `color`   | `accent`  | `light`   |
| --------- | --------- | --------- | --------- |
| 🔴 Red    | `#f87171` | `#b91c1c` | `#fff1f2` |
| 🩷 Pink   | `#f472b6` | `#be185d` | `#fdf2f8` |
| 🔵 Blue   | `#60a5fa` | `#1d4ed8` | `#eff6ff` |
| 🟢 Green  | `#4ade80` | `#15803d` | `#f0fdf4` |
| 🟠 Orange | `#fb923c` | `#c2410c` | `#fff7ed` |
| 🟣 Purple | `#a78bfa` | `#6d28d9` | `#f5f3ff` |
| 🟡 Yellow | `#fbbf24` | `#b45309` | `#fffbeb` |
| 🩵 Teal   | `#2dd4bf` | `#0f766e` | `#f0fdfa` |

---

## 💾 Backup & Restore

Timetable data is stored in the Lovelace config and included in every HA backup automatically.

For manual backup: **↓ Export backup** in the editor downloads a JSON file.
To restore: **↑ Import backup** reads it back in.

---

## 🗺️ Roadmap

- [x] English language support
- [ ] Configurable break line positions (currently fixed after slots 2 and 4)
- [ ] Week A/B alternating schedules
- [ ] Holiday / no-school day indicators

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you'd like to change.

---

## ☕ Support

If this card is useful for your family:

[Support the project on GitHub](https://github.com/sponsors/ikarpovich)

---

## 📄 License

MIT © [ikarpovich](https://github.com/ikarpovich)
