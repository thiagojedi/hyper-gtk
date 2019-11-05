var Gtk = imports.gi.Gtk;

function createWidget(widgetConstructor, attributes, ...args) {
  const children = args.length ? [].concat(args) : null;
  return { widgetConstructor, attributes, children };
}

function isConstructor(f) {
  try {
    new f();
  } catch (err) {
    return false;
  }
  return true;
}

function render({ widgetConstructor, attributes, children }) {
  if (!isConstructor(widgetConstructor))
    return render(widgetConstructor(attributes));

  const widget = new widgetConstructor({ visible: true, ...attributes });

  if (children) {
    if (widget.add === undefined)
      throw new Error("Cannot add child to non Container widget");

    children
      .reduce((acc, val) => acc.concat(val), [])
      .map(child =>
        typeof child === "string"
          ? new Gtk.Label({ label: child, visible: true })
          : render(child)
      )
      .forEach(child => widget.add(child));
  }

  if (typeof widget.present === "function") widget.present();

  return widget;
}
