/**
 * vault.js - Knowledge Vault Document Dictionary & Markdown Reader
 */
const vaultDocs = {
  '14_WALL_STREET_TRINITY_AI_STRATEGY': {
    title: '👑 14. [거장 통합] 월가 3대 거장(버핏·달리오·드라켄밀러) 삼위일체 AI 투자 전략',
    content: `
      <div class="p-4 bg-gradient-to-br from-amber-950/60 to-slate-900 border border-amber-500/40 rounded-2xl mb-4 space-y-2">
        <div class="text-amber-400 font-black text-sm">💡 삼위일체(Trinity) 핵심 투자 공식</div>
        <p class="text-xs text-slate-200 leading-relaxed">
          "<strong>버핏의 현금 방패</strong>로 바겐세일(공포 25 이하)을 기다리고, <strong>달리오의 분산</strong>으로 거시 위기를 방어하며, <strong>드라켄밀러의 독점 인프라</strong>로 퀀텀점프하라."
        </p>
      </div>

      <h4 class="font-bold text-white text-sm mt-3">1. 버핏의 방패 (절세 코어 70%)</h4>
      <p class="text-xs text-slate-300">연금저축(연 99만 환급) + ISA + SOL미국배당/TIGER월배당 ETF로 안정적인 월 현금흐름 수취 및 바겐세일 시드 축적.</p>

      <h4 class="font-bold text-white text-sm mt-3">2. 달리오의 균형 (70:20:10 황금 배분)</h4>
      <p class="text-xs text-slate-300">몰빵 금지. 코어 70% + 알파 20% + 웹3 인프라 10%의 철저한 자산배분으로 어떤 폭락장에서도 멘탈과 계좌를 보존.</p>

      <h4 class="font-bold text-white text-sm mt-3">3. 드라켄밀러의 창 (알파 20% + 웹3 10%)</h4>
      <p class="text-xs text-slate-300">라오어 TQQQ 40분할 무한매수(+10% 기계적 익절) + 블랙록/애플이 채택한 RWA/GPU 독점 인프라(LINK, ONDO, RENDER)로 복리 극대화.</p>

      <h4 class="font-bold text-white text-sm mt-3">4. 최종 3단계 FIRE 완성</h4>
      <p class="text-xs text-slate-300">3년 내 2억 시드 ➡️ 5억대 상가주택 밸류애드(70% 대출) ➡️ <strong>월세 300만 + 배당 150만 = 월 450만원 완전한 경제적 자유</strong> 달성!</p>
    `
  },
  '13_SYNTHESIZED_MASTER_PROPOSAL': {
    title: '👑 13. [통합 제안] 지금까지의 모든 학습을 집대성한 맞춤형 부자 마스터플랜',
    content: `
      <div class="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-2xl mb-4">
        <strong class="text-amber-400 font-bold text-sm">통합 핵심 전략</strong>
        <p class="text-xs text-slate-300 mt-1">본업 월급 & 신용도 ➡️ 절세 코어(70%) + 5분 알파(20%) + 웹3 인프라(10%) ➡️ 3년 내 2억 시드 ➡️ 수도권 꼬마빌딩 밸류애드 퀀텀점프!</p>
      </div>
      <h4 class="font-bold text-white text-sm">1. 3대 절세 계좌 세팅</h4>
      <p>연금저축(월 50만) 연 99만 환급 + ISA 3년 풍차돌리기 300만 추가공제.</p>
      <h4 class="font-bold text-white text-sm mt-3">2. 5분 무한매수 & 공포지수</h4>
      <p>TQQQ 40분할 LOC 종가 주문 + CNN 공포지수 25 이하 역발상 줍줍.</p>
      <h4 class="font-bold text-white text-sm mt-3">3. 꼬마빌딩 밸류애드 & FIRE</h4>
      <p>대출 70% 레버리지로 상가주택 매입 후 1층 상가 용도변경 리모델링으로 월세 300만+ 사표 달성.</p>
    `
  },
  '10_PENSION_AND_ISA_ETF_PORTFOLIO': {
    title: '💰 10. 연금저축펀드 & ISA 계좌 최적 ETF 포트폴리오 가이드',
    content: `
      <h4 class="font-bold text-white text-sm">3040 밸런스 정석형 포트폴리오</h4>
      <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
        <li><strong>TIGER 미국S&P500 (30%)</strong>: 미국 500대 우량 기업 분산</li>
        <li><strong>TIGER 미국나스닥100 (20%)</strong>: 빅테크 고성장 엔진</li>
        <li><strong>TIGER 미국배당다우존스 (30%)</strong>: 주가성장 + 월배당금 재투자</li>
        <li><strong>TIGER 미국30년국채+12%프리미엄(H) (20%)</strong>: 안전자산 + 고배당 인컴</li>
      </ul>
    `
  },
  '07_INFINITE_BUYING_METHOD': {
    title: '⚙️ 07. 라오어 무한매수법 & VR 가이드',
    content: `
      <h4 class="font-bold text-white text-sm">TQQQ 40분할 LOC 매수 룰</h4>
      <p class="text-xs text-slate-300">원금을 40회분으로 나누어 매일 평단가와 현재가+5%에 LOC 분할 매수. 평단가 대비 +10% 수익 시 전량 익절 후 새로운 사이클을 시작합니다.</p>
    `
  },
  '08_SMALL_BUILDING_VALUE_ADD': {
    title: '🏢 08. 소액 꼬마빌딩 밸류애드 & 부동산 레버리지 전략',
    content: `
      <h4 class="font-bold text-white text-sm">밸류애드 4단계 공식</h4>
      <p class="text-xs text-slate-300">1. 노후 단독/상가주택 저가 매입 ➡️ 2. 근생 상가로 용도변경 ➡️ 3. 트렌디한 외관 리모델링 ➡️ 4. 감성 F&B 및 앵커 테넌트 입점으로 임대료 2배 인상 & 감정가 급등.</p>
    `
  },
  '09_OFFICE_WORKER_WEALTH_STRATEGY': {
    title: '👔 09. 일반 회사원/직장인을 위한 실전 부자 전략',
    content: `
      <h4 class="font-bold text-white text-sm">직장인의 3대 치트키</h4>
      <p class="text-xs text-slate-300">1. 안정적인 월급(하락장 방패) + 2. 금융권 최고 신용도(대출 레버리지) + 3. 시간 분리형 무인 시스템(공간대여 전대차 & 5분 자동화 투자).</p>
    `
  },
  '11_RWA_TOP5_INVESTMENT_GUIDE': {
    title: '🌐 11. RWA(실물자산 토큰화) 탑 5 추천 종목',
    content: `
      <h4 class="font-bold text-white text-sm">블랙록 & 금융기관 채택 TOP 5</h4>
      <p class="text-xs text-slate-300">1. ONDO (미국 국채 토큰화 1위) | 2. LINK (체인링크 오라클 표준) | 3. OM (만트라 규제준수 L1) | 4. PENDLE (이자 토큰화) | 5. MKR (메이커다오 RWA 담보 대출).</p>
    `
  },
  '12_NFT_TOP5_INVESTMENT_GUIDE': {
    title: '🎨 12. NFT & 웹3 게이밍 인프라 탑 5 가이드',
    content: `
      <h4 class="font-bold text-white text-sm">실질 비즈니스 인프라 TOP 5</h4>
      <p class="text-xs text-slate-300">1. IMX (이뮤터블X 가스비 0원 L2) | 2. RENDER (애플 3D/AI 분산 GPU) | 3. BLUR (전문 트레이더 마켓) | 4. APE (메타버스 생태계) | 5. BEAM (웹3 게임 SDK).</p>
    `
  },
  '06_MARKET_INDICATORS_GUIDE': {
    title: '🧭 06. 월가 5대 시장 지표 & 공포지수 마스터 가이드',
    content: `
      <h4 class="font-bold text-white text-sm">월가 5대 필수 지표</h4>
      <p class="text-xs text-slate-300">1. CNN Fear & Greed (25 이하 극단 공포 매수) | 2. VIX (30 돌파 시 패닉 저점) | 3. 버핏 지수 (GDP 대비 시총) | 4. Put/Call Ratio (1.0 이상 바닥) | 5. FedWatch (금리 인하 확률).</p>
    `
  },
  '00_EVOLUTION_INDEX': {
    title: '📈 00. 부의 엔진 성장 및 진화 색인 (Level 20)',
    content: `
      <div class="text-xs text-slate-300 space-y-1">
        <div>• <strong>#001~#010</strong>: 프로젝트 점화, 4대 파이프라인 및 올인원 포털</div>
        <div>• <strong>#011~#015</strong>: 증권사급 Zero Jitter 슬라이더 & KIS/Upbit Open API 연동</div>
        <div>• <strong>#016~#018</strong>: 글로벌 경제 뉴스 & 월가 3대 거장 삼위일체 AI 투자 전략</div>
        <div>• <strong>#019~#020</strong>: 올인원 모바일 앱/멤버십 & 모듈화 리팩토링 및 산출물 완비</div>
      </div>
    `
  }
};

function displayDoc(docKey) {
  const d = vaultDocs[docKey];
  if (d) {
    const titleEl = document.getElementById('vault-doc-title');
    const contentEl = document.getElementById('vault-doc-content');
    if (titleEl) titleEl.innerText = d.title;
    if (contentEl) contentEl.innerHTML = d.content;

    // Dynamic Active Button Styling
    const allBtns = document.querySelectorAll('.vault-item-btn');
    allBtns.forEach(btn => {
      btn.className = 'vault-item-btn w-full text-left p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 block transition';
    });

    const activeBtn = document.getElementById(`doc-btn-${docKey}`);
    if (activeBtn) {
      activeBtn.className = 'vault-item-btn w-full text-left p-3 rounded-xl bg-slate-900 border border-amber-500/50 text-amber-300 font-black block transition shadow-md shadow-amber-950/30';
    }
  }
}
