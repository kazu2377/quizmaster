"use client";

import { useEffect, useState } from "react";
import { constellations, type Constellation } from "./data/constellations";

/**
 * 星座検索機能を提供するコンポーネント
 * 日本語名または英語名で星座を検索できる
 */
export default function AboutContent() {
  // 検索クエリの状態管理
  const [searchQuery, setSearchQuery] = useState("");
  // 検索結果の状態管理
  const [searchResults, setSearchResults] = useState<Constellation[]>([]);

  /**
   * 検索クエリが変更されるたびに実行される処理
   * 検索クエリが空の場合は結果をクリア
   * それ以外の場合は日本語名・英語名で検索を実行
   */

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    /**
     * 検索クエリに基づいて星座のリストをフィルタリングします。
     * 星座の名前または英語名（大文字小文字を区別しない）が検索クエリを含む場合、
     * その星座は結果に含まれます。
     *
     * @param {Array} constellations - フィルタリングする星座のリスト。
     * @param {string} searchQuery - 星座をフィルタリングするための検索クエリ。
     * @returns {Array} フィルタリングされた星座のリスト。
     */
    const results = constellations.filter(
      (constellation) =>
        constellation.name.includes(searchQuery) ||
        constellation.englishName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="my-4">
        <input
          type="text"
          placeholder="星座を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* 検索結果の表示 */}
      {searchResults.length > 0 && (
        <div className="mt-4 space-y-4">
          <h2 className="text-xl font-semibold">検索結果</h2>
          <div className="grid gap-4">
            {searchResults.map((constellation) => (
              <div key={constellation.englishName} className="border p-4 rounded-lg">
                <h3 className="font-bold">
                  {constellation.name} ({constellation.englishName})
                </h3>
                <p className="text-gray-600">{constellation.period}</p>
                <p className="mt-2">{constellation.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 既存のAboutコンテンツ */}
      <h1 className="text-2xl font-bold mb-4 mt-8">Quizmasterについて</h1>
      <div className="space-y-4">
        <p>Quizmasterは、学習をより楽しくする為のクイズアプリケーションです。</p>
        <section>
          <h2 className="text-xl font-semibold mb-2">特徴</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>簡単なクイズ作成</li>
            <li>進捗管理</li>
            <li>結果の可視化</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
