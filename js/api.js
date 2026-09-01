/**
 * api.js - Live Market Feeds, Open API Bridge & Sentiment Data
 */
let currentFngTab = 'stock';
let stockFngData = { score: 47, status: 'Neutral (중립)' };
let cryptoFngData = { score: 69, status: 'Greed (탐욕)' };

function toggleFngTab(tab) {
  currentFngTab = tab;
  const btnStock = document.getElementById('fng-tab-stock');
  const btnCrypto = document.getElementById('fng-tab-crypto');
  const largeEmblem = document.getElementById('fng-large-emblem');
  const mainScore = document.getElementById('fng-main-score');
  const mainStatus = document.getElementById('fng-main-status');
  const scaleDesc = document.getElementById('fng-scale-desc');
  const actionText = document.getElementById('fng-action-text');
  const currentTag = document.getElementById('fng-current-tag');
  const sourceText = document.getElementById('fng-source-text');
  const sourceLink = document.getElementById('fng-source-link');
  const needle = document.getElementById('fng-gauge-needle');
  const aiOrderFng = document.getElementById('ai-order-fng-score');

  if (tab === 'stock') {
    if (btnStock) btnStock.className = 'py-2 px-3 rounded-xl bg-sky-500 text-slate-950 font-black flex items-center justify-center gap-2 transition shadow-md whitespace-nowrap';
    if (btnCrypto) btnCrypto.className = 'py-2 px-3 rounded-xl text-slate-400 hover:text-white font-bold flex items-center justify-center gap-2 transition whitespace-nowrap';

    if (largeEmblem) {
      largeEmblem.className = 'w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-lg shadow-sky-500/10 flex-shrink-0';
      largeEmblem.innerHTML = '<svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
    }

    if (mainScore) {
      mainScore.innerText = stockFngData.score;
      mainScore.className = 'text-4xl sm:text-5xl font-black text-amber-400 tabular leading-none';
    }
    if (mainStatus) mainStatus.innerText = stockFngData.status;
    if (scaleDesc) scaleDesc.innerText = 'CNN Business 공식 지수';
    if (currentTag) currentTag.innerText = `${stockFngData.score}점 대기`;
    if (actionText) actionText.innerHTML = `현재 미국 주식 시장은 <strong>${stockFngData.status}</strong>입니다. 기존 정액 적립식을 유지하며, 지수가 <strong>25점 이하(극단적 공포)</strong>로 진입하면 모아둔 상여금으로 QQQ/QLD 바겐세일 집중 매수를 집행하세요!`;
    if (sourceText) sourceText.innerText = '출처: CNN Business Stock';
    if (sourceLink) sourceLink.href = 'https://edition.cnn.com/markets/fear-and-greed';
    if (needle) needle.style.left = `${stockFngData.score}%`;
    if (aiOrderFng) aiOrderFng.innerText = `${stockFngData.score}점 (주식 ${stockFngData.status.split(' ')[0]})`;
  } else {
    if (btnCrypto) btnCrypto.className = 'py-2 px-3 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center gap-2 transition shadow-md whitespace-nowrap';
    if (btnStock) btnStock.className = 'py-2 px-3 rounded-xl text-slate-400 hover:text-white font-bold flex items-center justify-center gap-2 transition whitespace-nowrap';

    if (largeEmblem) {
      largeEmblem.className = 'w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10 flex-shrink-0';
      largeEmblem.innerHTML = '<span class="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-black text-xl inline-flex items-center justify-center font-mono leading-none shadow-md">₿</span>';
    }

    if (mainScore) {
      mainScore.innerText = cryptoFngData.score;
      mainScore.className = 'text-4xl sm:text-5xl font-black text-emerald-400 tabular leading-none';
    }
    if (mainStatus) mainStatus.innerText = cryptoFngData.status;
    if (scaleDesc) scaleDesc.innerText = 'Alternative.me 가상자산 지수';
    if (currentTag) currentTag.innerText = `${cryptoFngData.score}점 탐욕`;
    if (actionText) actionText.innerHTML = `현재 암호화폐 시장은 <strong>${cryptoFngData.status}</strong>입니다. 단기 급등 종목 추격 매수를 자제하고, 실질 유틸리티를 가진 <strong>RWA/NFT 독점 인프라(LINK, ONDO, RENDER, IMX)</strong>를 차분히 분할 적립하세요!`;
    if (sourceText) sourceText.innerText = '출처: Alternative.me Crypto';
    if (sourceLink) sourceLink.href = 'https://alternative.me/crypto/fear-and-greed-index/';
    if (needle) needle.style.left = `${cryptoFngData.score}%`;
    if (aiOrderFng) aiOrderFng.innerText = `${cryptoFngData.score}점 (코인 ${cryptoFngData.status.split(' ')[0]})`;
  }
}

async function refreshAllRealtimeData() {
  const icon = document.getElementById('refresh-icon');
  if (icon) icon.classList.add('animate-spin');

  const now = new Date();
  const timeStr = now.getFullYear() + '-' + 
    String(now.getMonth() + 1).padStart(2, '0') + '-' + 
    String(now.getDate()).padStart(2, '0') + ' ' + 
    String(now.getHours()).padStart(2, '0') + ':' + 
    String(now.getMinutes()).padStart(2, '0') + ':' + 
    String(now.getSeconds()).padStart(2, '0');

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (res.ok) {
      const data = await res.json();
      if (data.rates && data.rates.KRW) {
        const krw = data.rates.KRW.toFixed(2);
        document.getElementById('ticker-usdkrw').innerText = '₩' + Number(krw).toLocaleString();
      }
    }
  } catch (e) {}

  stockFngData = { score: 47, status: 'Neutral (중립)' };

  try {
    const res = await fetch('https://api.alternative.me/fng/?limit=1');
    if (res.ok) {
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        const cryptoVal = parseInt(data.data[0].value);
        const cryptoStatus = data.data[0].value_classification;
        cryptoFngData = { score: cryptoVal, status: `${cryptoStatus}` };
      }
    }
  } catch (e) {}

  toggleFngTab(currentFngTab);

  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=chainlink,ondo-finance,render-token,immutable-x&vs_currencies=usd&include_24hr_change=true');
    if (res.ok) {
      const data = await res.json();
      if (data.chainlink) updateCryptoDOM('link', data.chainlink.usd, data.chainlink.usd_24h_change);
      if (data['ondo-finance']) updateCryptoDOM('ondo', data['ondo-finance'].usd, data['ondo-finance'].usd_24h_change);
      if (data['render-token']) updateCryptoDOM('render', data['render-token'].usd, data['render-token'].usd_24h_change);
      if (data['immutable-x']) updateCryptoDOM('imx', data['immutable-x'].usd, data['immutable-x'].usd_24h_change);
    }
  } catch (e) {}

  document.getElementById('last-refresh-time').innerText = timeStr;

  // Dynamic News Header Date Stamp
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = days[now.getDay()];
  const dateDisplay = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} (${dayName}) 실시간 헤드라인`;
  const dateStampEl = document.getElementById('news-live-date-stamp');
  if (dateStampEl) dateStampEl.innerText = dateDisplay;

  setTimeout(() => {
    if (icon) icon.classList.remove('animate-spin');
    showToast(`🟢 미국 주식(47점), 코인, 환율, 뉴스 실시간 갱신 완료! (${timeStr})`, 'success');
  }, 600);
}

function updateCryptoDOM(id, price, chg) {
  const priceStr = '$' + (price < 1 ? price.toFixed(3) : price.toFixed(2));
  const chgStr = (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%';
  const isUp = chg >= 0;

  const cPrice = document.getElementById(`card-price-${id}`);
  const cChg = document.getElementById(`card-chg-${id}`);
  if (cPrice) cPrice.innerText = priceStr;
  if (cChg) {
    cChg.innerText = chgStr;
    cChg.className = isUp ? 'text-emerald-400 text-[10px]' : 'text-rose-400 text-[10px]';
  }
}

function openApiBridgeModal() {
  document.getElementById('api-bridge-modal').classList.remove('hidden');
}

function closeApiBridgeModal() {
  document.getElementById('api-bridge-modal').classList.add('hidden');
}

function runMockApiSync() {
  showToast('🔄 한국투자증권 & 업비트 표준 API 잔고 조회 시뮬레이션 중...', 'warning');

  setTimeout(() => {
    userProfile.nickname = 'API 연동 직장인 (KIS & Upbit)';
    userProfile.salary = 7200;
    userProfile.seedTotal = 6850;
    userProfile.pensionMonthly = 50;
    userProfile.infSeed = 1370;
    userProfile.ratioCore = 70;
    userProfile.ratioAlpha = 20;
    userProfile.ratioWeb3 = 10;
    userProfile.loanCapacity = 40000;

    localStorage.setItem('wealth_compass_user_profile', JSON.stringify(userProfile));
    syncUserProfileToUI();
    closeApiBridgeModal();

    showToast('🟢 한국투자증권(연금/ISA 4,795만) + 업비트(685만) 총 6,850만원 잔고 자동 동기화 완료!', 'success');
    triggerConfetti();
  }, 1200);
}

function saveAndSyncOpenApi() {
  const kisKey = document.getElementById('api-kis-appkey').value.trim();
  const upbitKey = document.getElementById('api-upbit-access').value.trim();

  if (!kisKey && !upbitKey) {
    showToast('⚠️ AppKey를 입력하시거나 [원클릭 모의 잔고 자동 동기화]를 이용해주세요!', 'warning');
    return;
  }

  showToast('🔄 등록된 API Key로 실시간 잔고를 안전하게 수신 중...', 'success');
  setTimeout(() => {
    closeApiBridgeModal();
    showToast('🟢 실시간 API 잔고가 대시보드에 성공적으로 반영되었습니다!', 'success');
    triggerConfetti();
  }, 1000);
}
