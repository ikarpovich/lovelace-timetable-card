# 📅 Timetable Card

**The school timetable card for families — built for Home Assistant.**

Manage school schedules for all your children in one place. Designed for wall-mounted tablets, optimized for touch, and fully editable without touching a single line of YAML.

---

## 🖼️ What it looks like

| Display                         | Visual Editor                          |
| ------------------------------- | -------------------------------------- |
| Clean weekly overview per child | Full drag & drop timetable editor      |
| Color-coded subjects            | Manage children, time slots & subjects |
| Today highlighted automatically | All changes saved to HA config         |

---

## ✨ Key Features

**👨‍👩‍👧‍👦 Multiple children — one card**
Each child gets their own tab with a personal color theme and emoji. Switch between them with a single tap.

**🏫 Different schools, different schedules**
Every child has their own time slots — because not every school starts at the same time.

**🎨 Fully customizable subjects**
Define your own subjects (Math, Class Council, Study Hall, Coach — whatever your school uses) with individual colors. One click in the visual editor, no YAML needed.

**✏️ Visual editor — no YAML required**
Everything is configurable through Home Assistant's built-in card editor:

- Add & edit children (name, class, emoji, color)
- Set time slots per child
- Fill in the timetable with tap-to-place or drag & drop
- Manage subjects and their colors

**💾 Data stored in HA config**
Your timetable lives in your Lovelace configuration — automatically included in every Home Assistant backup. No external storage, no cloud, no localStorage.

**📱 Tablet-optimized**
Built for wall-mounted tablets running Fully Kiosk Browser or similar. Touch-friendly, responsive, and works great with HA's dark mode.

---

## 🚀 Getting Started

After installation, add the card to your dashboard:

1. Edit your dashboard → **Add card**
2. Search for **Timetable**
3. The card appears with example data
4. Click the card → **Edit** to open the visual editor
5. Add your children, set their time slots, and fill in the timetable

No YAML needed. Everything works through the visual editor.

---

## ⚙️ Minimal YAML (for reference)

```yaml
type: custom:timetable-card
subjects:
  - name: Math
    color: "#1d4ed8"
  - name: German
    color: "#854d0e"
  - name: English
    color: "#065f46"
kids:
  - name: Lena
    age: Grade 3
    emoji: "🌸"
    color: "#f472b6"
    accent: "#be185d"
    light: "#fdf2f8"
    slots:
      - slot: 1
        time: "08:00"
        end: "08:45"
      - slot: 2
        time: "08:45"
        end: "09:30"
    schedule:
      Mon:
        - slot: 1
          subject: German
        - slot: 2
          subject: Math
      Tue: []
      Wed: []
      Thu: []
      Fri: []
```

Day keys use the English abbreviations `Mon`, `Tue`, `Wed`, `Thu`, and `Fri`. Existing configurations using the legacy `Mo`, `Di`, `Mi`, `Do`, and `Fr` keys are still imported automatically.

---

## 💡 Tips

**Afternoon lessons?**
Just add more slots with higher numbers (`slot: 7`, `slot: 8`, ...). The card adapts automatically.

**Different break times per school?**
No problem — break lines are shown automatically after slots 2 and 4. Each child's slots are completely independent.

**Backup your timetable?**
Use the **↓ Export backup** button in the editor. This downloads a JSON file you can restore anytime via **↑ Import backup**.

---

## 🗺️ Planned Features

- 📅 Week A/B alternating schedules
- 🎉 Holiday & no-school day markers
- ⚙️ Configurable break line positions

---

## ☕ Support the Project

If this card is useful for your family, consider supporting the project:

[Support the project on GitHub](https://github.com/sponsors/ikarpovich)

---

## 📄 Full Documentation

For the complete documentation including the full YAML reference, see the [README on GitHub](https://github.com/ikarpovich/lovelace-timetable-card#readme).
