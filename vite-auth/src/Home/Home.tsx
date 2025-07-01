import { useMe } from "./hooks/useMe";

export default function Home() {
  const { data, error, isError, isFetching, refetch } = useMe();

  const handleClick = () => {
    refetch();
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isFetching}>
        {isFetching ? "Fetching ME..." : "See me"}
      </button>

      {isError && (
        <p style={{ color: "red" }}>Error: {(error as Error).message}</p>
      )}

      {data && (
        <pre style={{ background: "#7c7c7c", padding: "1rem" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
