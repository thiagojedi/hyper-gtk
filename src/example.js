const HyperGtk = require("./hypergtk");
const htm = require("./htm");
const h = htm.bind(HyperGtk.createWidget);

const { Gtk } = require("gir");

Gtk.init(null);

const MainWindow = function({ app }) {
  const names = ["Hello", "Hyperscript", "Gtk"];
  return h`
  <${Gtk.ApplicationWindow} title="Hello World" application=${app}>
      <${Layout} names=${names} />
    <//>
    `;
};

function Layout({ names }) {
  return h`
    <${Gtk.VBox}>
      ${names}
      <${Gtk.Button}
        label="Now with events!"
        onClicked=${() => print("hello world")}
      />
    <//>
    `;
}
const app = new Gtk.Application();
app.connect("activate", () => HyperGtk.render(h`<${MainWindow} app=${app} />`));
app.run([]);
