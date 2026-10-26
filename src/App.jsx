import React, { useState } from 'react';
import { 
  Trophy, Flame, Award, Timer, Share2, Check, 
  Shield, Waves, QrCode, X, Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

const records = {
  profile: {
    name: "하태영",
    role: "Security Engineer & Masters Swimmer",
    status: "Active Athlete & Engineer",
    teams: ["생물장다미", "CSMZ", "팀샤크"],
    tags: ["보안솔루션"],
    bio: "엔드포인트 보안 솔루션 엔지니어 & 마스터즈 수영 선수.\n안정적인 이슈 해결과 매 대회 기록 단축을 목표로 합니다.",
    url: "https://ha-taeyeong.github.io/swim-card/",
  },
  pbs: [
    { event: "자유형 50m", time: "29.74", rank: "4위", meet: "제6회 영등포구청장배", isSub30: true },
    { event: "접영 50m", time: "33.68", rank: "3위 (동메달)", meet: "제6회 영등포구청장배", isMedal: true },
    { event: "개인혼영 100m", time: "1:21.15", rank: "2위 (은메달)", meet: "제6회 영등포구청장배", isMedal: true },
    { event: "개인혼영 200m", time: "3:19.43", rank: "3위 (동메달)", meet: "춘천시민대회", isMedal: true },
    { event: "배영 50m", time: "41.90", rank: "공식기록", meet: "춘천시수영연맹회장배" },
    { event: "평영 50m", time: "43.52", rank: "공식기록", meet: "춘천시수영연맹회장배" },
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
  const [showQr, setShowQr] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const siteUrl = records.profile.url;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=15&data=${encodeURIComponent(siteUrl)}`;

  const handleShare = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.85 }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredHistory = activeTab === 'all' 
    ? records.history 
    : records.history.filter(item => item.event.includes(activeTab));

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black pb-28">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-600/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px]" />
      </div>

      <main className="relative max-w-md mx-auto px-4 pt-6 space-y-6">
        
        {/* Mobile Profile Card */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 backdrop-blur-xl shadow-2xl space-y-4">
          
          {/* Top Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-semibold tracking-tight">
              <Shield className="w-3 h-3" />
              보안 엔지니어
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-semibold tracking-tight">
              <Waves className="w-3 h-3" />
              마스터즈 스위머
            </span>
          </div>

          {/* Name & Role (위아래 분리로 모바일 줄바꿈 원천 차단) */}
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white whitespace-nowrap shrink-0 block leading-tight">
              {records.profile.name}
            </h1>
            <p className="text-[12px] text-cyan-400/90 font-mono tracking-tight font-medium">
              {records.profile.role}
            </p>
          </div>

          {/* Bio (자연스러운 한국어 줄바꿈) */}
          <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line break-keep bg-black/20 p-3.5 rounded-2xl border border-white/5">
            {records.profile.bio}
          </p>

          {/* Teams & Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {records.profile.teams.map((t, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-blue-950/40 border border-blue-800/40 text-blue-200">
                🏊 {t}
              </span>
            ))}
            {records.profile.tags.map((tag, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 font-mono">
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons (QR + Share) */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            <button
              onClick={() => setShowQr(true)}
              className="col-span-1 flex items-center justify-center py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 border border-white/10 transition-all cursor-pointer"
              title="QR코드 보기"
            >
              <QrCode className="w-5 h-5 text-cyan-400" />
            </button>

            <button
              onClick={handleShare}
              className="col-span-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {copied ? '링크 복사 완료!' : '온라인 명함 링크 공유'}
            </button>
          </div>
        </section>

        {/* Bento Grid: Personal Bests */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              PB 공식 기록
            </h2>
            <span className="text-[11px] text-slate-500">대회 공인</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {records.pbs.map((pb, idx) => (
              <div 
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-3.5 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-semibold text-slate-400">{pb.event}</span>
                  {pb.isMedal && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      MEDAL
                    </span>
                  )}
                  {pb.isSub30 && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                      SUB-30
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black tracking-tight text-white font-mono">
                  {pb.time}
                  <span className="text-[11px] text-slate-500 font-sans ml-1 font-normal">s</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 truncate">
                  {pb.meet}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Medals Showcase */}
        <section className="space-y-3">
          <div className="px-1">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              메달 히스토리
            </h2>
          </div>
          <div className="space-y-2">
            {records.medals.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${m.type === 'silver' ? 'bg-slate-300/10 text-slate-200' : 'bg-amber-600/10 text-amber-400'}`}>
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{m.title}</h4>
                    <p className="text-[10px] text-slate-400">{m.meet}</p>
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-slate-300">
                  {m.record}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Race History */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-cyan-400" />
              출전 기록
            </h2>
            <div className="flex gap-1 p-0.5 rounded-lg bg-slate-900 border border-white/10">
              {['all', '자유형', '접영', '혼영'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                    activeTab === tab 
                      ? 'bg-cyan-500 text-slate-950 font-bold' 
                      : 'text-slate-400'
                  }`}
                >
                  {tab === 'all' ? '전체' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/50 divide-y divide-white/5 overflow-hidden">
            {filteredHistory.map((item, idx) => (
              <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-white/[0.02]">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                    <span>{item.date}</span>
                    <span>·</span>
                    <span className="text-slate-300">{item.team}</span>
                  </div>
                  <div className="font-semibold text-white text-xs">{item.meet}</div>
                  <div className="text-[11px] text-cyan-400 font-medium">{item.event}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-white">{item.time}</div>
                  <div className="text-[10px] text-slate-400">{item.rank}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* QR Code Modal Popup */}
      {showQr && (
        <div 
          onClick={() => setShowQr(false)} 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative w-full max-w-xs bg-slate-900 border border-white/20 rounded-3xl p-5 text-center shadow-2xl space-y-4"
          >
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-0.5 pt-2">
              <h3 className="text-base font-bold text-white">수영 명함 QR 코드</h3>
              <p className="text-[11px] text-slate-400">카메라로 스캔하면 바로 연결됩니다</p>
            </div>

            <div className="p-3 bg-white rounded-2xl flex items-center justify-center shadow-inner">
              <img 
                src={qrApiUrl} 
                alt="수영 온라인 명함 QR 코드" 
                className="w-44 h-44 block"
              />
            </div>

            <div className="flex gap-2">
              <a
                href={qrApiUrl}
                download="ha-taeyeong-swim-card-qr.png"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 border border-white/10"
              >
                <Download className="w-3.5 h-3.5" />
                저장
              </a>
              <button
                onClick={handleShare}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[11px] font-bold text-slate-950"
              >
                {copied ? '복사됨!' : '주소 복사'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}