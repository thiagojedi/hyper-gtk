var Gtk = imports.gi.Gtk;

function createWidget(widgetConstructor, attributes, ...args) {
  const children = args.length ? [].concat(args) : null;
  return { widgetConstructor, attributes, children };
}

function render({ widgetConstructor, attributes, children }) {
  if (!isConstructor(widgetConstructor))
    return render(widgetConstructor(attributes));

  const signals: any = {};
  const constructParams: any = {};
  for (const attr in attributes) {
    if (attributes.hasOwnProperty(attr)) {
      const element = attributes[attr];
      const attributName = camelToKebab(attr);
      if (attr.startsWith("on")) {
        const signal = attributName.substr(3);
        signals[signal] = element;
      } else {
        constructParams[attr] = element;
      }
    }
  }

  const widget = new widgetConstructor({ visible: true, ...constructParams });

  for (const signal in signals) {
    if (signals.hasOwnProperty(signal)) {
      const handler = signals[signal];
      widget.connect(signal, handler);
    }
  }

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

/* UTILS */

function camelToKebab(string) {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

function isConstructor(f) {
  try {
    new f();
  } catch (err) {
    return false;
  }
  return true;
}
