import { Calendar } from "./components/calendar";

export default function App() {
  return (
    <div className="h-full flex flex-col gap-8">
      <div className="space-y-5">
        <h1 className="text-4xl md:text-7xl font-black text-center mt-20">
          Caledário.ao
        </h1>
        <hr />
      </div>
      <Calendar />
    </div>
  );
}
