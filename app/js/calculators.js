/**
 * calculators.js - Financial Engines & ROI Calculators
 */
let dividendChartInstance = null;
let monthlyDividendCalendarChartInstance = null;
let overviewPieChart = null;

function calcTaxRefundPro() {
  const salary = userProfile.salary || 6500;
  const pensionMonthly = parseFloat(document.getElementById('input-pension-monthly')?.value) || userProfile.pensionMonthly || 50;
  const rate = salary <= 5500 ? 0.165 : 0.132;
  
  const annualContrib = pensionMonthly * 12;
  const eligibleContrib = Math.min(annualContrib, 600);
  const refundAmount = Math.round(eligibleContrib * rate * 10000);
  
  const el = document.getElementById('calc-refund-result');
  if (el) el.innerText = `₩ ${refundAmount.toLocaleString()}원`;
  
  const descEl = document.getElementById('calc-refund-desc');
  if (descEl) {
    descEl.innerText = `연간 납입액 ${annualContrib}만원 (공제 한도 600만원) × 공제율 ${(rate * 100).toFixed(1)}%`;
  }
}

function calcMonthlyDividend() {
  const investManwon = parseFloat(document.getElementById('div-invest-amount')?.value) || 5000;
  const modelSelect = document.getElementById('div-model-select');
  const model = modelSelect ? modelSelect.value : 'balanced';

  let annualYield = 0.055;
  let growthRate = 0.10;

  if (model === 'income') {
    annualYield = 0.092;
    growthRate = 0.03;
  } else if (model === 'growth') {
    annualYield = 0.025;
    growthRate = 0.14;
  }

  const annualDiv = investManwon * 10000 * annualYield;
  const monthlyDiv = Math.round(annualDiv / 12);
  const year10Div = Math.round((investManwon * 10000 * annualYield * Math.pow(1 + growthRate, 10)) / 12);

  const resEl = document.getElementById('res-monthly-dividend');
  if (resEl) resEl.innerText = `₩ ${monthlyDiv.toLocaleString()}원 / 월`;
  
  const y10El = document.getElementById('res-year10-dividend');
  if (y10El) y10El.innerText = `₩ ${year10Div.toLocaleString()}원 / 월`;

  // The Rich style Summary Badges
  const badgeAnnual = document.getElementById('therich-annual-total');
  if (badgeAnnual) badgeAnnual.innerText = `₩ ${Math.round(annualDiv).toLocaleString()}원`;

  const badgeMonthly = document.getElementById('therich-monthly-avg');
  if (badgeMonthly) badgeMonthly.innerText = `₩ ${monthlyDiv.toLocaleString()}원`;

  const badgeYield = document.getElementById('therich-yield-rate');
  if (badgeYield) badgeYield.innerText = `${(annualYield * 100).toFixed(1)}%`;

  const badge10Y = document.getElementById('therich-10y-monthly');
  if (badge10Y) badge10Y.innerText = `₩ ${year10Div.toLocaleString()}원`;

  renderDividendChart();
  renderMonthlyDividendCalendarChart();
}

function renderMonthlyDividendCalendarChart() {
  const ctx = document.getElementById('monthlyDividendCalendarChart');
  if (!ctx) return;
  if (monthlyDividendCalendarChartInstance) monthlyDividendCalendarChartInstance.destroy();

  const investManwon = parseFloat(document.getElementById('div-invest-amount')?.value) || 5000;
  const modelSelect = document.getElementById('div-model-select');
  const model = modelSelect ? modelSelect.value : 'balanced';

  let annualYield = 0.055;
  if (model === 'income') annualYield = 0.092;
  else if (model === 'growth') annualYield = 0.025;

  const baseMonthly = (investManwon * 10000 * annualYield) / 12;
  
  // The Rich style 12-Month Calendar Distribution (Quarterly peak patterns + monthly baseline)
  const monthMultipliers = [0.95, 0.92, 1.15, 0.96, 0.94, 1.18, 0.98, 0.95, 1.16, 0.97, 0.95, 1.20];
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const monthData = monthMultipliers.map(m => Math.round(baseMonthly * m));

  const currentMonthIdx = new Date().getMonth(); // 0-indexed

  const bgColors = monthData.map((_, i) => i === currentMonthIdx ? '#F59E0B' : 'rgba(16, 185, 129, 0.7)');
  const borderColors = monthData.map((_, i) => i === currentMonthIdx ? '#FDE68A' : '#10B981');

  monthlyDividendCalendarChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: '월별 배당금 (원)',
        data: monthData,
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 1.5,
        borderRadius: 8,
        barPercentage: 0.65
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ₩ ${ctx.parsed.y.toLocaleString()}원 (${ctx.dataIndex === currentMonthIdx ? '이번 달 🌟' : '예상'})`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: (ctx) => ctx.index === currentMonthIdx ? '#F59E0B' : '#94A3B8', font: { weight: 'bold' } }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.06)' },
          ticks: {
            color: '#94A3B8',
            callback: (v) => v >= 10000 ? Math.round(v / 10000) + '만' : v
          }
        }
      }
    }
  });
}

function renderDividendChart() {
  const ctx = document.getElementById('dividendGrowthChart');
  if (!ctx) return;
  if (dividendChartInstance) dividendChartInstance.destroy();

  const investManwon = parseFloat(document.getElementById('div-invest-amount')?.value) || 5000;
  const modelSelect = document.getElementById('div-model-select');
  const model = modelSelect ? modelSelect.value : 'balanced';

  let annualYield = 0.055;
  let growthRate = 0.10;

  if (model === 'income') {
    annualYield = 0.092;
    growthRate = 0.03;
  } else if (model === 'growth') {
    annualYield = 0.025;
    growthRate = 0.14;
  }

  const labels = [];
  const monthlyData = [];

  for (let y = 1; y <= 15; y++) {
    labels.push(`${y}년차`);
    const mDiv = Math.round(((investManwon * 10000 * annualYield * Math.pow(1 + growthRate, y - 1)) / 12) / 10000);
    monthlyData.push(mDiv);
  }

  dividendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '월 예상 배당금 (만원)',
        data: monthlyData,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        fill: true,
        tension: 0.35,
        borderWidth: 3,
        pointBackgroundColor: '#10B981',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` 월 배당: ₩ ${ctx.parsed.y}만원`
          }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8' } }
      }
    }
  });
}

function calcInfinitePro() {
  const seed = parseFloat(document.getElementById('inf-seed-pro')?.value) || userProfile.infSeed || 1000;
  const avg = parseFloat(document.getElementById('inf-avg-pro')?.value) || 65.0;
  const price = parseFloat(document.getElementById('inf-price-pro')?.value) || 62.5;

  const perRound = seed / 40;
  const perRoundUSD = Math.round((perRound * 10000) / 1350);

  const roundEl = document.getElementById('inf-round-val');
  if (roundEl) roundEl.innerText = `₩ ${Math.round(perRound).toLocaleString()}만원 (약 $${perRoundUSD})`;
  
  const loc1El = document.getElementById('inf-loc1-val');
  if (loc1El) loc1El.innerText = `$${avg.toFixed(2)} 에 0.5회분`;
  
  const loc2El = document.getElementById('inf-loc2-val');
  if (loc2El) loc2El.innerText = `$${(price * 1.05).toFixed(2)} 에 0.5회분`;
  
  const targetEl = document.getElementById('inf-target-val');
  if (targetEl) targetEl.innerText = `$${(avg * 1.10).toFixed(2)}`;
}

function calcBuildingPro() {
  const price = parseFloat(document.getElementById('bldg-price-pro')?.value) || 50000;
  const loanPct = (parseFloat(document.getElementById('bldg-loan-pro')?.value) || 70) / 100;
  const rate = (parseFloat(document.getElementById('bldg-rate-pro')?.value) || 5.5) / 100;
  const deposit = parseFloat(document.getElementById('bldg-dep-pro')?.value) || 5000;
  const monthlyRent = parseFloat(document.getElementById('bldg-rent-pro')?.value) || 280;

  const loan = price * loanPct;
  const tax = price * 0.046;
  const seed = (price - loan - deposit) + tax;
  const monthlyInterest = (loan * rate) / 12;
  const netMonthly = monthlyRent - monthlyInterest;

  const resSeed = document.getElementById('res-seed-pro');
  if (resSeed) resSeed.innerText = '₩ ' + (seed >= 10000 ? (seed/10000).toFixed(1) + '억 ' : Math.round(seed) + '만원');
  
  const resLoan = document.getElementById('res-loan-pro');
  if (resLoan) resLoan.innerText = '₩ ' + (loan >= 10000 ? (loan/10000).toFixed(1) + '억 ' : Math.round(loan) + '만원');
  
  const resInterest = document.getElementById('res-interest-pro');
  if (resInterest) resInterest.innerText = '- ₩ ' + monthlyInterest.toFixed(1) + '만원';
  
  const resNet = document.getElementById('res-net-pro');
  if (resNet) resNet.innerText = (netMonthly >= 0 ? '+ ₩ ' : '- ₩ ') + Math.abs(netMonthly).toFixed(1) + '만원 / 월';
}

function renderOverviewChart() {
  const ctx = document.getElementById('overviewPieChart');
  if (!ctx) return;
  if (overviewPieChart) overviewPieChart.destroy();

  overviewPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['절세 코어(연금/ISA)', '5분 무한매수(TQQQ)', '웹3 인프라(RWA/NFT)'],
      datasets: [{
        data: [userProfile.ratioCore, userProfile.ratioAlpha, userProfile.ratioWeb3],
        backgroundColor: ['#10B981', '#F59E0B', '#8B5CF6'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      cutout: '72%'
    }
  });
}
