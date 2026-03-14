# Asahi-Fn-Toggle

A minimalist GNOME extension designed for **Asahi Linux (Fedora)** on Apple Silicon. It adds a simple text indicator (`Fn` or `F1`) to your top bar. Clicking it instantly toggles the `hid_apple` keyboard behavior between Media Keys mode and F1-F12 keys mode.

## ⚠️ Prerequisite: Passwordless Sudo for fnmode
Because modifying `/sys/module/hid_apple/parameters/fnmode` requires root privileges, this extension uses `sudo`. To prevent password prompts every time you click the button, you **must** allow your user to modify this specific file without a password.

Run this command in your terminal **before** using the extension:
\`\`\`bash
echo "$USER ALL=(ALL) NOPASSWD: /usr/bin/tee /sys/module/hid_apple/parameters/fnmode" | sudo tee /etc/sudoers.d/fnmode-toggle
\`\`\`

## 🚀 Installation

### Manual Installation
1. Clone this repository into your GNOME extensions directory:
   \`\`\`bash
   git clone https://github.com/chaealarm/Asahi-Fn-Toggle.git ~/.local/share/gnome-shell/extensions/asahi-fn-toggle@chaealarm
   \`\`\`
2. Log out and log back in (or restart GNOME Shell).
3. Enable the extension via the Extensions app or terminal:
   \`\`\`bash
   gnome-extensions enable asahi-fn-toggle@chaealarm
   \`\`\`

## 💡 Usage
Once enabled, check your GNOME top bar (system tray area). You will see either **Fn** or **F1**.
- **Fn**: Media keys are default (Brightness, Volume, etc.). Pressing `fn + F1` acts as F1.
- **F1**: F-keys are default (F1, F2, F3...). Pressing `fn + F1` acts as Brightness Down.

Simply click the text on the top bar to switch between modes instantly.

## Note
Coded by Gemini
