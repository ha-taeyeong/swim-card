import React, { useState } from 'react';
import { 
  Trophy, Flame, Award, Timer, Share2, Check, 
  Shield, Waves, Sparkles, ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

const records = {
  profile: {
    name: "하태영",
    role: "Security Engineer & Masters Swimmer",
    status: "Active Athlete & Engineer",
    teams: ["생물장다미", "CSMZ", "팀샤크"],
    tags: ["보안 솔루션 기술지원"],
    bio: "엔드포인트 보안 솔루션 기술지원 엔지니어 & 마스터즈 수영 선수.\n안정적인 이슈 해결과 매 대회 기록 단축을 목표로 합니다.",
  },
  pbs: [
    { event: "자유형 50m", time: "29.74", rank: "4위", meet: "제6회 영등포구청장배", date: "2026.10.18", isSub30: true },
    { event: "접영 50m", time: "33.68", rank: "3위 (동메달)", meet: "제6회 영등포구청장배", date: "2026.10.18", isMedal: true },
    { event: "개인혼영 100m", time: "1:21.15", rank: "2위 (은메달)", meet: "제6회 영등포구청장배", date: "2026.10.18", isMedal: true },
    { event: "개인혼영 200m", time: "3:19.43", rank: "3위 (동메달)", meet: "춘천시민대회", date: "2026.09.06", isMedal: true },
    { event: "배영 50m", time: "41.90", rank: "공식기록", meet: "춘천시수영연맹회장배", date: "2026.09.06" },
    { event: "평영 50m", time: "43.52", rank: "공식기록", meet: "춘천시수영연맹회장배", date: "2026.09.06" },
  ],
  medals: [
    { title: "개인혼영 100m 은메달", meet: "제6회 영등포구청장배", date: "2026.10.18", type: "silver", record: "1:21.15" },
    { title: "접영 50m 동메달", meet: "제6회 영등포구청장배", date: "2026.10.18", type: "bronze", record: "33.68" },
    { title: "개인혼영 200m 동메달", meet: "2026 춘천시민대회", date: "2026.09.06", type: "bronze", record: "3:19.43" },
  ],
  history: [
    { date: "2026.10.24", meet: "제21회 구리시장배 전국 마스터즈", event: "자유형 50m", time: "29.76", rank: "11위", team: "CSMZ" },
    { date: "2026.10.24", meet: "제21회 구리시장배 전국 마스터즈", event: "접영 50m", time: "34.63", rank: "8위", team: "CSMZ" },
    { date: "2026.10.18", meet: "제6회 영등포구청장배", event: "접영 50m", time: "33.68 (PB)", rank: "3위 🥉", team: "생물장다미" },
    { date: "2026.10.18", meet: "제6회 영등포구청장배", event: "자유형 50m", time: "29.74 (PB)", rank: "4위", team: "생물장다미" },
    { date: "2026.10.18", meet: "제6회 영등포구청장배", event: "개인혼영 100m", time: "1:21.15 (PB)", rank: "2위 🥈", team: "생물장다미" },
    { date: "2026.09.06", meet: "2026 춘천시수영연맹회장배", event: "개인혼영 200m", time: "3:19.43 (PB)", rank: "3위 🥉", team: "CSMZ" },
    { date: "2026.09.06", meet: "2026 춘천시수영연맹회장배", event: "배영 50m", time: "41.90 (PB)", rank: "공식", team: "CSMZ" },
    { date: "2026.09.06", meet: "2026 춘천시수영연맹회장배", event: "평영 50m", time: "43.52 (PB)", rank: "공식", team: "CSMZ" },
    { date: "2026.06.28", meet: "제6회 수원시체육회장배", event: "자유형 50m", time: "30.71", rank: "23위", team: "팀샤크" },
    { date: "2026.06.28", meet: "제6회 수원시체육회장배", event: "접영 50m", time: "34.63", rank: "14위", team: "팀샤크" },
    { date: "2026.05.10", meet: "제5회 춘천소양강배 전국 마스터즈", event: "접영 50m", time: "35.74", rank: "16위", team: "TST" },
    { date: "2026.05.10", meet: "제5회 춘천소양강배 전국 마스터즈", event: "자유형 50m", time: "31.96", rank: "20위", team: "TST" },
  ]
};

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 55,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredHistory = activeTab === 'all' 
    ? records.history 
    : records.history.filter(item => item.event.includes(activeTab));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-black pb-24">
      {/* Background Accent */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-36 -left-36 w-96 h-96 bg-cyan-600/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-36 w-96 h-96 bg-blue-600/15 rounded-full blur-[128px]" />
      </div>

      <main className="relative max-w-4xl mx-auto px-4 pt-10 sm:pt-16 space-y-8">
        
        {/* Profile Header */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  보안 솔루션 기술지원
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                  <Waves className="w-3.5 h-3.5" />
                  마스터즈 스위머
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                  {records.profile.name}
                  <span className="text-xs sm:text-sm px-2.5 py-1 rounded-md bg-white/10 text-slate-300 font-mono font-medium">
                    {records.profile.role}
                  </span>
                </h1>
              </div>

              {/* 줄바꿈을 반영하기 위해 whitespace-pre-line 적용 */}
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed whitespace-pre-line">
                {records.profile.bio}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {records.profile.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 font-medium">
                    #{tag}
                  </span>
                ))}
                {records.profile.teams.map((t, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300">
                    🏊 {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copied ? '링크 복사 완료' : '온라인 명함 공유'}
            </button>
          </div>
        </section>

        {/* Bento Grid: PBs */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              Personal Bests (PB)
            </h2>
            <span className="text-xs text-slate-400">공식 대회 인증 기록</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {records.pbs.map((pb, idx) => (
              <div 
                key={idx}
                className="relative group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition-all hover:border-cyan-500/40 hover:bg-slate-900/90"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-slate-400">{pb.event}</span>
                  {pb.isMedal && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      MEDAL
                    </span>
                  )}
                  {pb.isSub30 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                      SUB-30
                    </span>
                  )}
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono group-hover:text-cyan-400 transition-colors">
                  {pb.time}
                  <span className="text-xs text-slate-500 font-sans ml-1 font-normal">sec</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 truncate">
                  {pb.meet}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Medals Showcase */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Medal & Honors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {records.medals.map((m, idx) => (
              <div key={idx} className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className={`p-2.5 rounded-xl ${m.type === 'silver' ? 'bg-slate-300/10 text-slate-200' : 'bg-amber-600/10 text-amber-400'}`}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{m.title}</h4>
                  <p className="text-xs text-slate-400">{m.meet} · {m.record}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Race History */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Timer className="w-5 h-5 text-cyan-400" />
              대회 출전 히스토리
            </h2>
            <div className="flex gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 self-start">
              {['all', '자유형', '접영', '혼영'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-cyan-500 text-slate-950 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'all' ? '전체' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/40 divide-y divide-white/5 overflow-hidden">
            {filteredHistory.map((item, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300">{item.team}</span>
                  </div>
                  <div className="font-semibold text-white text-sm sm:text-base">{item.meet}</div>
                  <div className="text-xs text-cyan-400 font-medium">{item.event}</div>
                </div>
                <div className="text-right">
                  <div className="text-base sm:text-lg font-mono font-bold text-white">{item.time}</div>
                  <div className="text-xs text-slate-400">{item.rank}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}