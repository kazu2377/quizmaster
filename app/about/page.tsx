import AboutContent from './AboutContent';

export const metadata = {
  title: 'About | Quizmaster',
  description: 'Quizmasterの概要と特徴について',
};

export default async function Page() {
  return (
    <div className="container mx-auto">
      <AboutContent />
    </div>
  );
}
