import type { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export function generatePageMetadata(
  pageMetadata: PageMetadata,
  locale: string,
  path: string,
): Metadata {
  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        pl: `/pl${path}`,
        en: `/en${path}`,
        ja: `/jp${path}`,
      },
    },
  };
}

export const pageMetadataConfig = {
  home: {
    pl: {
      title: 'Strona główna',
      description:
        'Odkryj, ćwicz i opanuj nowe języki z Lingrow. Interaktywne lekcje, system postępów i atrakcyjny interfejs użytkownika.',
      keywords: [
        'nauka języków',
        'lingrow',
        'rozpocznij naukę',
        'platforma edukacyjna',
        'interaktywne lekcje',
      ],
    },
    en: {
      title: 'Home',
      description:
        'Discover, practice, and conquer new languages with Lingrow. Interactive lessons, progress system and attractive user interface.',
      keywords: [
        'language learning',
        'lingrow',
        'start learning',
        'educational platform',
        'interactive lessons',
      ],
    },
    jp: {
      title: 'ホーム',
      description:
        'Lingrowで新しい言語を発見し、練習し、習得しましょう。インタラクティブなレッスン、進捗システム、魅力的なユーザーインターフェース。',
      keywords: [
        '言語学習',
        'lingrow',
        '学習開始',
        '教育プラットフォーム',
        'インタラクティブレッスン',
      ],
    },
  },
  learn: {
    pl: {
      title: 'Nauka',
      description:
        'Rozpocznij swoją podróż językową z interaktywnymi lekcjami i ćwiczeniami.',
      keywords: [
        'nauka języków',
        'lekcje interaktywne',
        'ćwiczenia językowe',
        'postęp w nauce',
        'jednostki lekcyjne',
      ],
    },
    en: {
      title: 'Learn',
      description:
        'Start your language journey with interactive lessons and exercises.',
      keywords: [
        'language learning',
        'interactive lessons',
        'language exercises',
        'learning progress',
        'lesson units',
      ],
    },
    jp: {
      title: '学習',
      description:
        'インタラクティブなレッスンとエクササイズで言語学習の旅を始めましょう。',
      keywords: [
        '言語学習',
        'インタラクティブレッスン',
        '言語エクササイズ',
        '学習進捗',
        'レッスンユニット',
      ],
    },
  },
  courses: {
    pl: {
      title: 'Kursy',
      description: 'Wybierz język, którego chcesz się uczyć',
      keywords: [
        'kursy językowe',
        'język angielski',
        'język japoński',
        'język polski',
        'wybór kursu',
        'platforma edukacyjna',
      ],
    },
    en: {
      title: 'Courses',
      description: 'Choose the language you want to learn',
      keywords: [
        'language courses',
        'english',
        'japanese',
        'polish',
        'course selection',
        'educational platform',
      ],
    },
    jp: {
      title: 'コース',
      description: '学習したい言語を選択してください',
      keywords: [
        '言語コース',
        '英語',
        '日本語',
        'ポーランド語',
        'コース選択',
        '教育プラットフォーム',
      ],
    },
  },
  quests: {
    pl: {
      title: 'Zadania',
      description: 'Wykonuj zadania, aby zdobyć serca i nagrody',
      keywords: [
        'zadania językowe',
        'questy',
        'nagrody',
        'punkty doświadczenia',
        'gry edukacyjne',
        'motywacja do nauki',
      ],
    },
    en: {
      title: 'Quests',
      description: 'Complete quests to earn hearts and rewards',
      keywords: [
        'language quests',
        'quests',
        'rewards',
        'experience points',
        'educational games',
        'learning motivation',
      ],
    },
    jp: {
      title: 'クエスト',
      description: 'クエストを完了してハートと報酬を獲得しましょう',
      keywords: [
        '言語クエスト',
        'クエスト',
        '報酬',
        '経験値',
        '教育ゲーム',
        '学習モチベーション',
      ],
    },
  },
  leaderboard: {
    pl: {
      title: 'Ranking',
      description:
        'Zobacz, jak wypadasz w porównaniu z innymi uczniami w społeczności.',
      keywords: [
        'ranking językowy',
        'porównanie wyników',
        'społeczność uczących się',
        'punkty doświadczenia',
        'konkurencja',
        'motywacja',
      ],
    },
    en: {
      title: 'Leaderboard',
      description: 'See where you stand among other learners in the community.',
      keywords: [
        'language leaderboard',
        'score comparison',
        'learner community',
        'experience points',
        'competition',
        'motivation',
      ],
    },
    jp: {
      title: 'リーダーボード',
      description:
        'コミュニティの他の学習者と比較して自分の位置を確認しましょう。',
      keywords: [
        '言語リーダーボード',
        'スコア比較',
        '学習者コミュニティ',
        '経験値',
        '競争',
        'モチベーション',
      ],
    },
  },
  shop: {
    pl: {
      title: 'Sklep',
      description:
        'Użyj swoich punktów, aby uzupełnić serca lub odblokuj nieograniczone serca z Pro.',
      keywords: [
        'sklep językowy',
        'punkty doświadczenia',
        'serca',
        'nieograniczone serca',
        'pro',
        'premium',
        'nagrody',
      ],
    },
    en: {
      title: 'Shop',
      description:
        'Use your points to refill hearts or unlock unlimited hearts with Pro.',
      keywords: [
        'language shop',
        'experience points',
        'hearts',
        'unlimited hearts',
        'pro',
        'premium',
        'rewards',
      ],
    },
    jp: {
      title: 'ショップ',
      description:
        'ポイントを使ってハートを補充するか、Proで無制限のハートをアンロックしましょう。',
      keywords: [
        '言語ショップ',
        '経験値',
        'ハート',
        '無制限ハート',
        'プロ',
        'プレミアム',
        '報酬',
      ],
    },
  },
};
