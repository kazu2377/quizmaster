"use client";

import { useState } from 'react';
import { LoginForm } from '@/components/login-form';
import { History } from '@/components/history';
import { Quiz } from '@/components/quiz';

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  if (!userId) {
    return <LoginForm onLogin={setUserId} />;
  }

  if (showHistory) {
    return <History userId={userId} onBack={() => setShowHistory(false)} />;
  }

  return <Quiz userId={userId} onShowHistory={() => setShowHistory(true)} />;
}