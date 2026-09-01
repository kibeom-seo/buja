/**
 * state.js - User Profile State & Reactive Synchronization Engine
 */
const DEFAULT_USER_PROFILE = {
  nickname: '부자될 직장인',
  salary: 6500,
  monthlyInvest: 150,
  seedTotal: 5000,
  pensionMonthly: 50,
  infSeed: 1000,
  targetSeed: 20000,
  targetYears: 3,
  targetMonthlyIncome: 300,
  ratioCore: 70,
  ratioAlpha: 20,
  ratioWeb3: 10,
  loanCapacity: 35000
};

let userProfile = { ...DEFAULT_USER_PROFILE };

function loadUserProfile() {
  const saved = localStorage.getItem('wealth_compass_user_profile');
  if (saved) {
    try {
      userProfile = { ...DEFAULT_USER_PROFILE, ...JSON.parse(saved) };
    } catch (e) {
      userProfile = { ...DEFAULT_USER_PROFILE };
    }
  }
  syncUserProfileToUI();
}

function saveUserProfileSettings() {
  userProfile.nickname = document.getElementById('cfg-nickname').value || '부자될 직장인';
  userProfile.salary = parseFloat(document.getElementById('cfg-salary').value) || 6500;
  userProfile.monthlyInvest = parseFloat(document.getElementById('cfg-monthly-invest').value) || 150;
  userProfile.seedTotal = parseFloat(document.getElementById('cfg-seed-total').value) || 5000;
  userProfile.pensionMonthly = parseFloat(document.getElementById('cfg-pension-monthly').value) || 50;
  userProfile.infSeed = parseFloat(document.getElementById('cfg-inf-seed').value) || 1000;
  userProfile.targetSeed = parseFloat(document.getElementById('cfg-target-seed').value) || 20000;
  userProfile.targetYears = parseInt(document.getElementById('cfg-target-years').value) || 3;
  userProfile.targetMonthlyIncome = parseFloat(document.getElementById('cfg-target-monthly-income').value) || 300;
  userProfile.ratioCore = parseInt(document.getElementById('cfg-ratio-core').value) || 70;
  userProfile.ratioAlpha = parseInt(document.getElementById('cfg-ratio-alpha').value) || 20;
  userProfile.ratioWeb3 = parseInt(document.getElementById('cfg-ratio-web3').value) || 10;
  userProfile.loanCapacity = parseFloat(document.getElementById('cfg-loan-capacity').value) || 35000;

  localStorage.setItem('wealth_compass_user_profile', JSON.stringify(userProfile));
  syncUserProfileToUI();
  closeUserSettingsModal();
  showToast(`💾 [${userProfile.nickname}] 님의 재정 설정이 전체 화면에 즉각 연동되었습니다!`, 'success');
  triggerConfetti();
}

function applyProfilePreset(preset) {
  if (preset === 'junior') {
    document.getElementById('cfg-nickname').value = '2030 사회초년생';
    document.getElementById('cfg-salary').value = 4200;
    document.getElementById('cfg-monthly-invest').value = 100;
    document.getElementById('cfg-seed-total').value = 1500;
    document.getElementById('cfg-pension-monthly').value = 50;
    document.getElementById('cfg-inf-seed').value = 500;
    document.getElementById('cfg-target-seed').value = 10000;
    document.getElementById('cfg-target-years').value = 3;
    document.getElementById('cfg-target-monthly-income').value = 200;
    document.getElementById('cfg-ratio-core').value = 60;
    document.getElementById('cfg-ratio-alpha').value = 30;
    document.getElementById('cfg-ratio-web3').value = 10;
    document.getElementById('cfg-loan-capacity').value = 25000;
  } else if (preset === 'standard') {
    document.getElementById('cfg-nickname').value = '3040 정석 직장인';
    document.getElementById('cfg-salary').value = 6500;
    document.getElementById('cfg-monthly-invest').value = 180;
    document.getElementById('cfg-seed-total').value = 5000;
    document.getElementById('cfg-pension-monthly').value = 50;
    document.getElementById('cfg-inf-seed').value = 1000;
    document.getElementById('cfg-target-seed').value = 20000;
    document.getElementById('cfg-target-years').value = 3;
    document.getElementById('cfg-target-monthly-income').value = 300;
    document.getElementById('cfg-ratio-core').value = 70;
    document.getElementById('cfg-ratio-alpha').value = 20;
    document.getElementById('cfg-ratio-web3').value = 10;
    document.getElementById('cfg-loan-capacity').value = 35000;
  } else if (preset === 'fire') {
    document.getElementById('cfg-nickname').value = 'FIRE 조기은퇴 가속자';
    document.getElementById('cfg-salary').value = 9500;
    document.getElementById('cfg-monthly-invest').value = 350;
    document.getElementById('cfg-seed-total').value = 12000;
    document.getElementById('cfg-pension-monthly').value = 50;
    document.getElementById('cfg-inf-seed').value = 2500;
    document.getElementById('cfg-target-seed').value = 30000;
    document.getElementById('cfg-target-years').value = 2;
    document.getElementById('cfg-target-monthly-income').value = 500;
    document.getElementById('cfg-ratio-core').value = 60;
    document.getElementById('cfg-ratio-alpha').value = 25;
    document.getElementById('cfg-ratio-web3').value = 15;
    document.getElementById('cfg-loan-capacity').value = 50000;
  }
}

function syncUserProfileToUI() {
  const nickDisplay = document.getElementById('nav-user-nickname-display');
  if (nickDisplay) nickDisplay.innerText = userProfile.nickname;
  
  const greeting = document.getElementById('hero-user-greeting');
  if (greeting) greeting.innerText = `안녕하세요, ${userProfile.nickname}님!`;

  const seedPct = Math.min(100, (userProfile.seedTotal / userProfile.targetSeed) * 100);
  document.getElementById('progress-seed-current').innerText = `₩ ${formatMoneyManwon(userProfile.seedTotal)}`;
  document.getElementById('progress-seed-target').innerText = `${formatMoneyManwon(userProfile.targetSeed)}`;
  document.getElementById('progress-seed-pct').innerText = `${seedPct.toFixed(1)}% 달성`;
  document.getElementById('progress-seed-bar').style.width = `${seedPct}%`;

  document.getElementById('hero-strategy-summary').innerHTML = `
    현재 보유 자산 <strong>${formatMoneyManwon(userProfile.seedTotal)}</strong>을 기반으로, <strong>${userProfile.targetYears}년 내 ${formatMoneyManwon(userProfile.targetSeed)} 시드</strong>를 달성하고 꼬마빌딩 밸류애드로 <strong>월세 ${userProfile.targetMonthlyIncome}만원</strong>의 완전한 자유를 구축합니다.
  `;

  document.getElementById('metric-user-seed').innerText = `₩ ${formatMoneyManwon(userProfile.seedTotal)}`;
  
  const taxRate = userProfile.salary <= 5500 ? 0.165 : 0.132;
  const annualPensionRefund = Math.min(userProfile.pensionMonthly * 12, 600) * taxRate * 10000;
  const coreInvest = userProfile.seedTotal * (userProfile.ratioCore / 100);
  const monthlyDividendGain = (coreInvest * 0.055 * 10000) / 12;
  const totalMonthlyGain = Math.round((annualPensionRefund / 12 + monthlyDividendGain) / 10000 * 10) / 10;
  
  document.getElementById('metric-user-monthly-gain').innerText = `₩ ${totalMonthlyGain}만+`;
  document.getElementById('metric-user-fire-goal').innerText = `월세 ${userProfile.targetMonthlyIncome}만`;

  document.getElementById('card-ratio-core').innerText = `${userProfile.ratioCore}% 배분`;
  document.getElementById('card-ratio-alpha').innerText = `${userProfile.ratioAlpha}% 배분`;
  document.getElementById('card-ratio-web3').innerText = `${userProfile.ratioWeb3}% 배분`;
  document.getElementById('card-target-income').innerText = `월세 ${userProfile.targetMonthlyIncome}만+ 사표`;

  document.getElementById('badge-plan1-ratio').innerText = `코어 자산 ${userProfile.ratioCore}%`;
  document.getElementById('badge-plan2-ratio').innerText = `알파 자산 ${userProfile.ratioAlpha}%`;
  document.getElementById('badge-plan3-ratio').innerText = `미래 엔진 ${userProfile.ratioWeb3}%`;

  document.getElementById('stat-ratio-core').innerText = `${userProfile.ratioCore}%`;
  document.getElementById('stat-ratio-alpha').innerText = `${userProfile.ratioAlpha}%`;
  document.getElementById('stat-ratio-web3').innerText = `${userProfile.ratioWeb3}%`;

  const pensionInput = document.getElementById('input-pension-monthly');
  if (pensionInput) pensionInput.value = userProfile.pensionMonthly;
  const salarySelect = document.getElementById('select-salary-tier');
  if (salarySelect) salarySelect.value = userProfile.salary <= 5500 ? '0.165' : '0.132';

  const divInvestInput = document.getElementById('div-invest-amount');
  if (divInvestInput) divInvestInput.value = Math.round(coreInvest);

  const infSeedInput = document.getElementById('inf-seed-pro');
  if (infSeedInput) infSeedInput.value = userProfile.infSeed;

  // Dynamic AI Action Order Hub Sync
  const perRoundManwon = userProfile.infSeed / 40;
  const perRoundUSD = Math.round((perRoundManwon * 10000) / 1350);
  const aiTqqqAmt = document.getElementById('ai-order-tqqq-amt');
  if (aiTqqqAmt) aiTqqqAmt.innerText = `1회 ₩${Math.round(perRoundManwon)}만 ($${perRoundUSD})`;
  
  const aiLoc1 = document.getElementById('ai-order-tqqq-loc1');
  if (aiLoc1) aiLoc1.innerText = `$65.00 에 0.5회 ($${Math.round(perRoundUSD/2)})`;

  const aiLoc2 = document.getElementById('ai-order-tqqq-loc2');
  if (aiLoc2) aiLoc2.innerText = `$65.62 에 0.5회 ($${Math.round(perRoundUSD/2)})`;

  if (typeof calcTaxRefundPro === 'function') calcTaxRefundPro();
  if (typeof calcMonthlyDividend === 'function') calcMonthlyDividend();
  if (typeof calcInfinitePro === 'function') calcInfinitePro();
  if (typeof calcBuildingPro === 'function') calcBuildingPro();
  if (typeof renderOverviewChart === 'function') renderOverviewChart();
}

function formatMoneyManwon(val) {
  if (val >= 10000) {
    return (val / 10000).toFixed(1).replace('.0', '') + '억';
  }
  return val.toLocaleString() + '만';
}
