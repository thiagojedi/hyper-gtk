imports.searchPath.push('.');

(imports.gi as any).versions.Gtk = '3.0';
var Gtk = imports.gi.Gtk;
const HyperGtk = (imports as any).out.hypergtk;

Gtk.init(null);

const MainWindow = function({ app }) {
    const names = ["Hello", "Hyperscript", "Gtk"];
    return (
        <Gtk.ApplicationWindow title="Hello World" application={app}>
            <Layout names={names} />
        </Gtk.ApplicationWindow>
    )
}

function Layout({ names }) {
    return (
        <Gtk.VBox>
            {names}
            <Gtk.Button label={"No events for now"} />
        </Gtk.VBox>
    )
}
const app = new Gtk.Application();
app.connect('activate', () => HyperGtk.render(<MainWindow app={app} />));
app.run([]);