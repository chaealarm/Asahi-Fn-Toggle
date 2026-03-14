import St from 'gi://St';
import GLib from 'gi://GLib';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

const FNMODE_PATH = '/sys/module/hid_apple/parameters/fnmode';

export default class FnToggleExtension extends Extension {
    enable() {
        this._indicator = new PanelMenu.Button(0.0, 'FnToggle', false);
        
        this._label = new St.Label({
            text: '...',
            y_align: Clutter.ActorAlign.CENTER,
        });
        this._label.set_style('font-weight: bold; padding: 0 5px;');
        this._indicator.add_child(this._label);
        
        this._indicator.connect('button-press-event', () => this._toggleMode());
        Main.panel.addToStatusArea(this.uuid, this._indicator);

        this._updateLabel();
        this._timeout = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
            this._updateLabel();
            return true;
        });
    }

    _updateLabel() {
        try {
            let [success, contents] = GLib.file_get_contents(FNMODE_PATH);
            if (success) {
                let current = new TextDecoder().decode(contents).trim();
                // 1: Media Keys (Fn), 2: Function Keys (F1-F12)
                this._label.set_text(current === '1' ? 'Fn' : 'F1');
            }
        } catch (e) {
            console.error('Failed to read fnmode:', e);
        }
    }

    _toggleMode() {
        try {
            let [success, contents] = GLib.file_get_contents(FNMODE_PATH);
            if (success) {
                let current = new TextDecoder().decode(contents).trim();
                let next = current === '1' ? '2' : '1';
                
                // Requires sudoers configuration for passwordless execution
                let cmd = `sh -c "echo ${next} | sudo tee ${FNMODE_PATH}"`;
                GLib.spawn_command_line_sync(cmd);
                this._updateLabel();
            }
        } catch (e) {
            console.error('Failed to toggle fnmode:', e);
        }
    }

    disable() {
        if (this._timeout) {
            GLib.source_remove(this._timeout);
            this._timeout = null;
        }
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
    }
}
