import { Nav } from "~/components/nav";
import { Swatches } from "~/components/swatches";
import { useColors } from "~/lib/store";

function App() {
  const { all } = useColors();

  return (
    <div
      className={`flex font-sans flex-col h-dvh bg-zinc-900 overflow-hidden`}
    >
      <Nav />
      <Swatches all={all} />
    </div>
  );
}

export default App;
