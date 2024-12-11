type Engine = {
  engine: string;
  url: string;
  logo: JSX.Element;
  displayLogo: JSX.Element;
};

type SearchEngineProps = {
  engine: Engine;
  searchEngine: Engine;
  setSearchEngine: React.Dispatch<React.SetStateAction<Engine>>;
};

export default function SearchEngine({ engine, searchEngine, setSearchEngine }: SearchEngineProps) {
  return (
    <div
      className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-500/30 p-2 ${engine.engine === searchEngine.engine ? 'border-blue-500/100' : ''}`}
      key={engine.engine}
    >
      <button onClick={() => setSearchEngine(engine)} type="button">
        {engine.logo}
      </button>
    </div>
  );
}
