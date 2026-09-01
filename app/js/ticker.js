/**
 * ticker.js - Securities Terminal Sliding Carousel Engine (Zero Jitter)
 */
const DICE_DATA = {
  us: [
    { name: 'NASDAQ', price: '$18,420.5', chg: '+1.15%' },
    { name: 'S&P 500', price: '$5,580.2', chg: '+0.78%' },
    { name: 'TQQQ', price: '$64.20', chg: '+3.42%' },
    { name: 'SCHD', price: '$81.40', chg: '+0.35%' },
    { name: 'QLD', price: '$88.90', chg: '+2.28%' },
    { name: 'TLT', price: '$94.10', chg: '-0.42%' }
  ],
  kr: [
    { name: 'SOL미국배당', price: '₩10,450', chg: '+0.48%' },
    { name: 'TIGER미국배당+7%', price: '₩10,890', chg: '+0.65%' },
    { name: 'TIGER30년국채+12%', price: '₩9,850', chg: '+0.20%' },
    { name: 'TIGER S&P500', price: '₩19,250', chg: '+0.82%' },
    { name: 'TIGER 나스닥100', price: '₩112,400', chg: '+1.30%' }
  ],
  web3: [
    { name: 'LINK', price: '$15.24', chg: '+3.20%' },
    { name: 'ONDO', price: '$0.84', chg: '+5.12%' },
    { name: 'RENDER', price: '$6.45', chg: '-1.18%' },
    { name: 'IMX', price: '$1.65', chg: '+2.40%' },
    { name: 'PENDLE', price: '$3.82', chg: '+6.10%' },
    { name: 'OM', price: '$1.12', chg: '+4.35%' }
  ]
};

let diceIndex = { us: 0, kr: 0, web3: 0 };

function buildTickerRowHTML(item, slotKey) {
  let widthName = slotKey === 'kr' ? 'w-[72px]' : (slotKey === 'us' ? 'w-[66px]' : 'w-[62px]');
  let widthPrice = slotKey === 'kr' ? 'w-[58px]' : (slotKey === 'us' ? 'w-[58px]' : 'w-[54px]');
  let nameColor = slotKey === 'kr' ? 'text-emerald-300' : (slotKey === 'us' ? 'text-sky-300' : 'text-purple-300');
  let chgColor = item.chg.startsWith('+') ? 'text-emerald-400' : 'text-rose-400';

  return `
    <span class="${widthName} text-left truncate font-bold ${nameColor} font-sans text-xs">${item.name}</span>
    <span class="${widthPrice} text-right font-bold text-white text-xs tabular">${item.price}</span>
    <span class="w-[45px] text-right ${chgColor} text-[10px] font-bold tabular">${item.chg}</span>
  `;
}

function slideTickerSlot(slotKey) {
  const slider = document.getElementById(`slider-${slotKey}`);
  const rowCurr = document.getElementById(`${slotKey}-row-curr`);
  const rowNext = document.getElementById(`${slotKey}-row-next`);
  if (!slider || !rowCurr || !rowNext) return;

  const list = DICE_DATA[slotKey];
  const nextIdx = (diceIndex[slotKey] + 1) % list.length;
  const nextItem = list[nextIdx];

  // 1. Prepare Next Row HTML
  rowNext.innerHTML = buildTickerRowHTML(nextItem, slotKey);

  // 2. Start Smooth CSS Sliding Transition (0.65s cubic-bezier)
  slider.classList.remove('no-trans');
  slider.classList.add('sliding');

  // 3. Complete Slide & Reset Position seamlessly
  setTimeout(() => {
    rowCurr.innerHTML = buildTickerRowHTML(nextItem, slotKey);
    slider.classList.add('no-trans');
    slider.classList.remove('sliding');
    diceIndex[slotKey] = nextIdx;

    // Subtle Flash Effect on Price Update
    rowCurr.classList.remove('flash-up', 'flash-down');
    void rowCurr.offsetWidth; // trigger reflow
    rowCurr.classList.add(nextItem.chg.startsWith('+') ? 'flash-up' : 'flash-down');
  }, 650);
}

function startStaggeredSecuritiesTickers() {
  // Slot 1 (US ETF): Every 4.0s
  setInterval(() => slideTickerSlot('us'), 4000);

  // Slot 2 (월배당 ETF): Every 4.0s with +1.3s offset
  setTimeout(() => {
    slideTickerSlot('kr');
    setInterval(() => slideTickerSlot('kr'), 4000);
  }, 1300);

  // Slot 3 (Web3 RWA): Every 4.0s with +2.6s offset
  setTimeout(() => {
    slideTickerSlot('web3');
    setInterval(() => slideTickerSlot('web3'), 4000);
  }, 2600);
}
