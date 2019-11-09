import * as HyperGtk from "./hypergtk";

//@ts-ignore
import { Gtk } from "gir";
//@ts-check

Gtk.init(null);

const MainWindow = function({ app }) {
  const names = ["Hello", "Hyperscript", "Gtk"];
  return (
    <Gtk.ApplicationWindow title="Hello World" application={app}>
      <Layout names={names} />
    </Gtk.ApplicationWindow>
  );
};

function Layout({ names }) {
  return (
    <Gtk.VBox>
      {names}
      <Gtk.Button
        label={"Now with events!"}
        onClicked={() => print("hello world")}
      />
    </Gtk.VBox>
  );
}
const app = new Gtk.Application();
app.connect("activate", () => HyperGtk.render(<MainWindow app={app} />));
app.run([]);
