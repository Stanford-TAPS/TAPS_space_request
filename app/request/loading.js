export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Loading...</h1>
      <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}
