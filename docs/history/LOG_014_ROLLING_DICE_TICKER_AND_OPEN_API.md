# [이력 #014] 3대 롤링 주사위(다이스) 실시간 티커 & 금융사/거래소 Open API 자동 연동 센터 구축

- **기록일자**: 2026-09-01
- **마일스톤 분류**: 금융 데이터 자동화 및 주식/코인 3D 롤링 티커 UI 혁신 (Fintech Open API Integration & 3-Slot Dynamic Dice Rolling Engine)
- **핵심 목표**: 금융사 오픈 API 조사 및 연동 센터 구축, 상단 3개 영역(미국 지수/ETF, 국내 월배당 ETF, 웹3 인프라) 3.2초 주기 주사위 롤링 애니메이션 탑재

---

## 💡 기술 및 전략 전환점

### 1. 🌐 금융사 & 가상자산 거래소 Open API 전수 조사 및 연동 센터 구축
- **한국투자증권 (KIS Developers)**: REST API 기반 실시간 예수금, 주식/ETF 평가액, ISA/연금 계좌 잔고 동기화 지원
- **업비트 (Upbit Open API)**: REST API 기반 원화 잔고 및 보유 웹3 코인(LINK, RENDER, IMX) 실시간 평가액 자동 수집 지원
- **원클릭 모의 잔고 자동 동기화 (Mock Auto Sync)**: API 키가 없는 사용자도 1초 만에 실제 금융사 표준 응답 규격으로 자산을 자동 주입할 수 있는 시뮬레이션 탑재

### 2. 🎲 3대 롤링 주사위(Dice Roll Down) 티커 애니메이션 엔진
- 3.2초 주기로 아래로 부드럽게 굴러 떨어지듯 전환되는 3개 슬롯 구축:
  - **슬롯 1 (미국 지수/ETF)**: `NASDAQ` ➡️ `S&P 500` ➡️ `TQQQ` ➡️ `SCHD` ➡️ `QLD` ➡️ `TLT`
  - **슬롯 2 (국내 월배당 ETF)**: `SOL미국배당` ➡️ `TIGER미국배당+7%` ➡️ `TIGER30년국채+12%` ➡️ `TIGER S&P500` ➡️ `TIGER 나스닥100`
  - **슬롯 3 (웹3 RWA/NFT)**: `LINK` ➡️ `ONDO` ➡️ `RENDER` ➡️ `IMX` ➡️ `PENDLE` ➡️ `OM`

---

## 🧪 자체 검증 테스트 결과
- 21개 신규 DOM 요소 및 다이스 롤링 로직 검증 스크립트 실행 (`ALL 21 ADVANCED DOM ELEMENTS VERIFIED 100% OK!`)
