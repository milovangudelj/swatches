import { BottomToolbar } from "~/components/bottom-toolbar";
import { Nav } from "~/components/nav";
import { Swatches } from "~/components/swatches";
import { useColors } from "~/lib/store";

function App() {
  const { values } = useColors();

  return (
    <div
      className={`flex font-sans flex-col h-dvh bg-zinc-900 overflow-hidden`}
    >
      <Nav />
      <Swatches values={values} />
      <BottomToolbar />
    </div>
  );
}

export default App;
