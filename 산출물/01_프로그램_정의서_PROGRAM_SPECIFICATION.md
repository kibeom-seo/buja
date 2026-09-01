# 📋 부의 나침반 (Wealth Compass Pro) - 프로그램 정의서 (Program Specification)

> **문서 버전**: v1.0.0  
> **최종 수정일**: 2026-09-01  
> **시스템 명칭**: Wealth Compass Pro Autonomous Financial Engine  
> **문서 목적**: 시스템의 아키텍처, 핵심 비즈니스 로직, 데이터 모델 및 알고리즘 명세 정의

---

## 1. 시스템 개요 (System Overview)

### 1.1 프로젝트 목표
- 직장인 및 개인 투자자가 다른 사이트(증권사, 거래소, 외신, 부동산 포털)를 별도로 켤 필요 없이 **단 하나의 화면에서 거시경제 지표, 실시간 시세, 포트폴리오 배분, 세제 혜택, 부동산 밸류애드 수익률을 즉시 확인하고 당일 맞춤형 AI 실전 투자 오더를 산출**받도록 하는 올인원 웹 터미널 & PWA 플랫폼.

### 1.2 시스템 핵심 가치 (Core Principles)
1. **No-Exit Information Hub (종결성)**: 주가, 환율, 공포지수, 13F 거장 동향, 글로벌 경제 뉴스 내재화.
2. **Actionable AI Orders (실행력)**: 단순 조회를 넘어 "오늘 밤 몇 달러에 몇 주 매수/적립할지" 즉시 계산.
3. **Multi-Platform Responsiveness (확장성)**: 데스크톱 대시보드 및 모바일 네이티브 하단 앱 도크 지원.
4. **Data Privacy First (보안성)**: 서버 DB에 금융자산 개인정보를 저장하지 않고 사용자 브라우저 LocalStorage에 암호화/독립 보관.

---

## 2. 기술 스택 및 환경 (Tech Stack & Environment)

| 계층 (Layer) | 기술 / 라이브러리 | 용도 및 특징 |
|---|---|---|
| **Frontend Framework** | Pure Vanilla JS (ES6+ Modules), HTML5 | 번들러 없는 초경량 제로 의존성 아키텍처, 100% 브라우저 네이티브 구동 |
| **Styling & UI System** | Tailwind CSS (CDN), Custom Glassmorphism CSS | 다크 테마 금융 터미널 디자인, 블러 효과, 반응형 그리드 |
| **Icons & Visual FX** | Lucide Icons, Canvas Confetti | 금융 지표 직관적 시각화 및 목표 달성 인터랙션 |
| **Data Visualization** | Chart.js | 연간 배당 복리 성장선 차트, 자산 배분 도넛 차트 |
| **Hosting & 배포** | GitHub Pages / Vercel (100% Free) | 글로벌 CDN, 무제한 트래픽, 무료 SSL(HTTPS), PWA 호환 |

---

## 3. 핵심 비즈니스 로직 및 계산 공식 (Formulas & Logic)

### 3.1 절세 코어 연금저축 세액공제 계산 엔진 (`calculators.js:calcTaxRefundPro`)
$$\text{공제 대상 한도액} = \min(\text{월 납입액} \times 12, 600\text{만원})$$
$$\text{세액 공제율} = \begin{cases} 16.5\% & (\text{총급여} \le 5,500\text{만원}) \\ 13.2\% & (\text{총급여} > 5,500\text{만원}) \end{cases}$$
$$\text{환급 예상액} = \text{공제 대상 한도액} \times \text{세액 공제율}$$

### 3.2 월배당 ETF 복리 성장 시뮬레이션 (`calculators.js:calcMonthlyDividend`)
- **월 배당금**: $\text{월 배당금} = \frac{\text{투자원금} \times \text{연 배당수익률}}{12}$
- **$n$년 후 배당 성장**: $\text{월 배당금}_n = \text{월 배당금}_1 \times (1 + \text{배당성장률})^{n-1}$
- **투자 모델별 파라미터**:
  - **성장+배당 (Standard)**: 배당률 5.5%, 성장률 10.0% (SOL 미국배당, SCHD)
  - **고배당 인컴 (High-Yield)**: 배당률 9.2%, 성장률 3.0% (커버드콜 국채 ETF)
  - **자본 성장 (Growth Focus)**: 배당률 2.5%, 성장률 14.0% (S&P500, QQQ)

### 3.3 라오어 40분할 TQQQ 무한매수 엔진 (`calculators.js:calcInfinitePro`)
- **1회차 매수 예산**: $\text{Budget}_{\text{1회}} = \frac{\text{무한매수 시드}}{40}$
- **LOC 1차 주문가 (본인 평단가)**: $P_{\text{LOC1}} = \text{평단가}$ (0.5회분 매수)
- **LOC 2차 주문가 (현재가 + 5%)**: $P_{\text{LOC2}} = \text{현재가} \times 1.05$ (0.5회분 매수)
- **목표 익절가 (+10% Target)**: $P_{\text{Target}} = \text{평단가} \times 1.10$

### 3.4 꼬마빌딩 밸류애드 & 대출 레버리지 엔진 (`calculators.js:calcBuildingPro`)
- **대출 가능액**: $\text{Loan} = \text{매매가} \times \text{LTV}(70\%)$
- **취등록세 및 부대비용**: $\text{Cost}_{\text{tax}} = \text{매매가} \times 4.6\%$
- **실투자 시드금액**: $\text{Seed}_{\text{real}} = (\text{매매가} - \text{Loan} - \text{보증금}) + \text{Cost}_{\text{tax}}$
- **월 대출 이자**: $\text{Interest}_{\text{monthly}} = \frac{\text{Loan} \times \text{이자율}(5.5\%)}{12}$
- **순 월세 현금흐름**: $\text{Cashflow}_{\text{net}} = \text{월 임대수입} - \text{Interest}_{\text{monthly}}$

---

## 4. 데이터 모델 정의 (Data Structure)

### UserProfile Object Schema (`state.js`)
```typescript
interface UserProfile {
  nickname: string;            // 사용자 닉네임 (기본: '부자될 직장인')
  salary: number;              // 연봉 (단위: 만원, 기본: 6500)
  monthlyInvest: number;       // 월 순 투자 가능액 (단위: 만원, 기본: 150)
  seedTotal: number;           // 현재 보유 총 시드머니 (단위: 만원, 기본: 5000)
  pensionMonthly: number;      // 연금저축/IRP 월 적립액 (단위: 만원, 기본: 50)
  infSeed: number;             // 무한매수 할당 시드 (단위: 만원, 기본: 1000)
  targetSeed: number;          // 목표 시드 머니 (단위: 만원, 기본: 20000)
  targetYears: number;         // 목표 달성 기간 (단위: 년, 기본: 3)
  targetMonthlyIncome: number; // FIRE 목표 월 임대수입 (단위: 만원, 기본: 300)
  ratioCore: number;           // 코어 절세 자산 비율 (기본: 70%)
  ratioAlpha: number;          // 알파 무한매수 비율 (기본: 20%)
  ratioWeb3: number;           // 웹3 인프라 비율 (기본: 10%)
  loanCapacity: number;        // 직장인 신용 대출 한도 (단위: 만원, 기본: 35000)
}
```
