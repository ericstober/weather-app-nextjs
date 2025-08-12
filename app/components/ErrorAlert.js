export default function ErrorAlert({ error }) {
  if (!error) return null;
  return (
    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 w-full text-center border border-red-300">
      {error}
    </div>
  );
}
