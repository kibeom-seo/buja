/**
 * main.js - Application Entry Point & Lifecycle Orchestrator
 */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
  
  if (typeof loadUserProfile === 'function') {
    loadUserProfile();
  }
  
  if (typeof displayDoc === 'function') {
    displayDoc('14_WALL_STREET_TRINITY_AI_STRATEGY');
  }
  
  if (typeof refreshAllRealtimeData === 'function') {
    refreshAllRealtimeData();
  }

  if (typeof calcMonthlyDividend === 'function') {
    calcMonthlyDividend();
  }
  
  // Start High-Precision Securities Carousel with Staggered Multi-Slot Roll
  if (typeof startStaggeredSecuritiesTickers === 'function') {
    startStaggeredSecuritiesTickers();
  }
});
