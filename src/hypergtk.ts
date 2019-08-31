var Gtk = imports.gi.Gtk;

function createWidget(widgetConstructor, attributes, ...children) {
    const widget = new widgetConstructor({ visible: true, ...attributes });

    if (children) {
        if (widget.add === undefined)
            throw new Error('Cannot add child to non Container widget');

        children
            .reduce((acc, val) => acc.concat(val), [])
            .map((child) => typeof child === 'string' ? new Gtk.Label({ label: child, visible: true }) : child)
            .forEach((child) => widget.add(child));
    }

    return widget;
}

function render(widget, app) {
    if (app !== undefined) {
        if (!(widget instanceof Gtk.Window))
            throw new Error('Root element must be a Gtk.Window')

        app.add_window(widget);
    } else {
        if (!(widget instanceof Gtk.ApplicationWindow))
            throw new Error('Root element must be a Gtk.Window or Gtk.ApplicationWindow with the application prop')
    }
    widget.present();
}