# 🌐 부의 나침반 (Wealth Compass Pro) - 데이터 및 API 연동 명세서 (API Specification)

> **문서 버전**: v1.0.0  
> **최종 수정일**: 2026-09-01  
> **시스템 명칭**: Market Feeds & Open API Interface Specification  
> **문서 목적**: 외부 실시간 금융 데이터 소스, API 엔드포인트 및 브릿지 스키마 정의

---

## 1. 외부 실시간 API 연동 목록 (Live Market APIs)

### 1.1 실시간 글로벌 환율 피드 (USD/KRW)
- **엔드포인트**: `GET https://open.er-api.com/v6/latest/USD`
- **프로토콜**: HTTPS / JSON (No Auth Required, Free Open Access)
- **수신 데이터 구조**:
```json
{
  "result": "success",
  "base_code": "USD",
  "rates": {
    "KRW": 1348.50,
    "EUR": 0.912,
    "JPY": 154.20
  }
}
```
- **UI 반영**: 상단 롤링 티커 바 고정 위젯 `#ticker-usdkrw`에 실시간 원화 환율 표시.

---

### 1.2 글로벌 가상자산 공포 및 탐욕 지수 (Crypto Fear & Greed)
- **엔드포인트**: `GET https://api.alternative.me/fng/?limit=1`
- **프로토콜**: HTTPS / JSON (Free Open Access)
- **수신 데이터 구조**:
```json
{
  "name": "Fear and Greed Index",
  "data": [
    {
      "value": "69",
      "value_classification": "Greed",
      "timestamp": "1725148800"
    }
  ]
}
```
- **UI 반영**: 종합 관제탑 `#fng-score-val`, `#fng-score-status`, 게이지 바 `#fng-needle` 위치 동적 업데이트.

---

### 1.3 웹3 RWA & 실시간 코인 시세 (CoinGecko Live API)
- **엔드포인트**: `GET https://api.coingecko.com/api/v3/simple/price?ids=chainlink,ondo-finance,render-token,immutable-x&vs_currencies=usd&include_24hr_change=true`
- **프로토콜**: HTTPS / JSON (CORS Free)
- **수신 데이터 구조**:
```json
{
  "chainlink": { "usd": 15.24, "usd_24h_change": 3.20 },
  "ondo-finance": { "usd": 0.84, "usd_24h_change": 5.12 },
  "render-token": { "usd": 6.45, "usd_24h_change": -1.18 },
  "immutable-x": { "usd": 1.65, "usd_24h_change": 2.40 }
}
```
- **UI 반영**: Plan 3 웹3 섹션의 각 종목 카드 (`#card-price-link`, `#card-chg-link` 등) 실시간 가격 및 변동률 색상 반영.

---

## 2. 증권사 및 거래소 Open API 브릿지 스키마 (Financial API Bridge)

### 2.1 한국투자증권 KIS Open API (국내/미국 주식 & ISA 잔고 조회)
- **표준 엔드포인트**: `POST https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/trading/inquire-balance`
- **인증 헤더**:
  - `authorization: Bearer {ACCESS_TOKEN}`
  - `appkey: {KIS_APP_KEY}`
  - `appsecret: {KIS_APP_SECRET}`
  - `tr_id: TTTC8434R`
- **매핑 대상**: 연금저축펀드 잔고, ISA 잔고, 미국주식 TQQQ 보유 수량 및 예수금.

### 2.2 업비트 Upbit Open API (암호화폐 전체 계좌 조회)
- **표준 엔드포인트**: `GET https://api.upbit.com/v1/accounts`
- **인증 헤더**:
  - `Authorization: Bearer {JWT_TOKEN}` (Access Key + Secret Key 기반 JWT 생성)
- **매핑 대상**: 원화 보유액(KRW), LINK/ONDO/RENDER 등 보유 수량 및 평가금액.

### 2.3 LocalStorage 영구 데이터 스키마 (`wealth_compass_user_profile`)
```json
{
  "nickname": "API 연동 직장인 (KIS & Upbit)",
  "salary": 7200,
  "monthlyInvest": 150,
  "seedTotal": 6850,
  "pensionMonthly": 50,
  "infSeed": 1370,
  "targetSeed": 20000,
  "targetYears": 3,
  "targetMonthlyIncome": 300,
  "ratioCore": 70,
  "ratioAlpha": 20,
  "ratioWeb3": 10,
  "loanCapacity": 40000
}
```
