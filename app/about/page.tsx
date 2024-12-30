import AboutContent from "./AboutContent";

export const metadata = {
  title: "About | Quizmaster",
  description: "Quizmasterの概要と特徴について",
};

// Use environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log(supabaseUrl, supabaseAnonKey);
export default async function Page() {
  return (
    <div className="container mx-auto">
      <AboutContent />
    </div>
  );
}
