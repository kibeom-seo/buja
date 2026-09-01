/**
 * ui.js - Navigation, Tabs, Modals, Toast Alerts & Visual FX
 */
function switchTab(tabId) {
  ['overview', 'plan1', 'plan2', 'plan3', 'plan4', 'news', 'vault'].forEach(t => {
    const view = document.getElementById('view-' + t);
    const nav = document.getElementById('nav-' + t);
    if (t === tabId) {
      if (view) view.classList.remove('hidden');
      if (nav) nav.classList.add('active');
    } else {
      if (view) view.classList.add('hidden');
      if (nav) nav.classList.remove('active');
    }
  });

  if (tabId === 'plan1') {
    setTimeout(() => {
      if (typeof calcMonthlyDividend === 'function') calcMonthlyDividend();
    }, 80);
  } else if (tabId === 'overview') {
    setTimeout(() => {
      if (typeof renderOverviewChart === 'function') renderOverviewChart();
    }, 80);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const borderCol = type === 'success' ? 'border-emerald-500/50 bg-slate-900/95 text-emerald-300' :
    (type === 'warning' ? 'border-amber-500/50 bg-slate-900/95 text-amber-300' : 'border-rose-500/50 bg-slate-900/95 text-rose-300');
  
  toast.className = `p-4 rounded-2xl border ${borderCol} shadow-2xl backdrop-blur-xl text-xs font-bold transition-all duration-300 transform translate-y-2 opacity-0 flex items-center gap-2 pointer-events-auto`;
  toast.innerHTML = `<span>${msg}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#8B5CF6', '#38BDF8']
    });
  }
}

function openUserSettingsModal() {
  const cfgNick = document.getElementById('cfg-nickname');
  if (cfgNick) cfgNick.value = userProfile.nickname;
  const cfgSal = document.getElementById('cfg-salary');
  if (cfgSal) cfgSal.value = userProfile.salary;
  const cfgMon = document.getElementById('cfg-monthly-invest');
  if (cfgMon) cfgMon.value = userProfile.monthlyInvest;
  const cfgSeed = document.getElementById('cfg-seed-total');
  if (cfgSeed) cfgSeed.value = userProfile.seedTotal;
  const cfgPen = document.getElementById('cfg-pension-monthly');
  if (cfgPen) cfgPen.value = userProfile.pensionMonthly;
  const cfgInf = document.getElementById('cfg-inf-seed');
  if (cfgInf) cfgInf.value = userProfile.infSeed;
  const cfgTgt = document.getElementById('cfg-target-seed');
  if (cfgTgt) cfgTgt.value = userProfile.targetSeed;
  const cfgYrs = document.getElementById('cfg-target-years');
  if (cfgYrs) cfgYrs.value = userProfile.targetYears;
  const cfgInc = document.getElementById('cfg-target-monthly-income');
  if (cfgInc) cfgInc.value = userProfile.targetMonthlyIncome;
  const cfgRCore = document.getElementById('cfg-ratio-core');
  if (cfgRCore) cfgRCore.value = userProfile.ratioCore;
  const cfgRAlpha = document.getElementById('cfg-ratio-alpha');
  if (cfgRAlpha) cfgRAlpha.value = userProfile.ratioAlpha;
  const cfgRWeb3 = document.getElementById('cfg-ratio-web3');
  if (cfgRWeb3) cfgRWeb3.value = userProfile.ratioWeb3;
  const cfgLoan = document.getElementById('cfg-loan-capacity');
  if (cfgLoan) cfgLoan.value = userProfile.loanCapacity;

  const modal = document.getElementById('user-settings-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeUserSettingsModal() {
  const modal = document.getElementById('user-settings-modal');
  if (modal) modal.classList.add('hidden');
}

function openMembershipModal() {
  const m = document.getElementById('membership-modal');
  if (m) m.classList.remove('hidden');
}

function closeMembershipModal() {
  const m = document.getElementById('membership-modal');
  if (m) m.classList.add('hidden');
}
