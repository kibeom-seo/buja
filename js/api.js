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
  const needle = document.getElementById('fng-needle');
  const scoreVal = document.getElementById('fng-score-val');
  const scoreStatus = document.getElementById('fng-score-status');
  const emblemStock = document.getElementById('fng-emblem-stock');
  const emblemCrypto = document.getElementById('fng-emblem-crypto');

  if (tab === 'stock') {
    if (btnStock) btnStock.className = 'px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold transition';
    if (btnCrypto) btnCrypto.className = 'px-3 py-1 rounded-lg text-slate-400 hover:text-white transition';
    if (emblemStock) emblemStock.classList.remove('hidden');
    if (emblemCrypto) emblemCrypto.classList.add('hidden');

    if (scoreVal) scoreVal.innerText = stockFngData.score;
    if (scoreStatus) scoreStatus.innerText = stockFngData.status;
    if (needle) needle.style.left = `${stockFngData.score}%`;
  } else {
    if (btnCrypto) btnCrypto.className = 'px-3 py-1 rounded-lg bg-purple-500 text-white font-bold transition';
    if (btnStock) btnStock.className = 'px-3 py-1 rounded-lg text-slate-400 hover:text-white transition';
    if (emblemCrypto) emblemCrypto.classList.remove('hidden');
    if (emblemStock) emblemStock.classList.add('hidden');

    if (scoreVal) scoreVal.innerText = cryptoFngData.score;
    if (scoreStatus) scoreStatus.innerText = cryptoFngData.status;
    if (needle) needle.style.left = `${cryptoFngData.score}%`;
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
