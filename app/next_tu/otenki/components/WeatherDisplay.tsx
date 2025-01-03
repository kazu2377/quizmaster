async function getWeather(city: string) {
  // 注意: これは実際のAPIではなく、デモ用のモックデータです
  await new Promise(resolve => setTimeout(resolve, 1000)) // APIリクエストをシミュレート
  return {
    city,
    temperature: Math.round(Math.random() * 30),
    condition: ['晴れ', '曇り', '雨', '雪'][Math.floor(Math.random() * 4)]
  }
}

export default async function WeatherDisplay({ city }: { city: string }) {
  const weather = await getWeather(city)

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{weather.city}の天気</h2>
      <p>気温: {weather.temperature}°C</p>
      <p>天候: {weather.condition}</p>
    </div>
  )
}
