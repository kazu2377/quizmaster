import ClientSideComponent from "./components/ClientSideComponent";
import WeatherDisplay from "./components/WeatherDisplay";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">天気情報アプリ</h1>
      <WeatherDisplay city="Tokyo" />
      <ClientSideComponent />
    </main>
  );
}
