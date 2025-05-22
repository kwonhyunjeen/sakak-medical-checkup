# 건강검진 결과 조회 (CANDiY API 연동)

CANDiY API를 연동하여 건강검진 결과를 조회하고, 이를 사용자에게 시각적으로 보여주는 프론트엔드 프로젝트를 구현해주세요.

구현 내용:

- 사용자 인증 폼 구현 및 유효성 검사
- 건강검진 결과 조회 API 요청 및 로딩/오류 처리
- 건강검진 결과 데이터를 시각화 (반응형 레이아웃)

## 설치 및 실행

### 0. 실행 환경

이 프로젝트는 다음 환경에서 실행됩니다.

- Node.js: `>=20.11.0`
- pnpm: `10.11.0`

### 1. 저장소 복제

```bash
git clone https://github.com/kwonhyunjeen/sakak-medical-checkup.git
cd sakak-medical-checkup
```

### 2. 패키지 설치

```bash
pnpm install
```

### 3. 환경변수 설정

`.env.template` 파일을 복사하여 `.env` 파일을 생성합니다.
그리고 주석을 참고해 환경변수를 설정하세요.

### 4. 개발 서버 실행

```bash
pnpm dev
```

### 5. 브라우저에서 확인

[http://localhost:5173](http://localhost:5173) 주소로 접속하여 결과를 확인합니다.

## 빌드 및 배포

배포는 Vercel통해 이루어집니다. 다음 링크를 통해 확인할 수 있습니다.
[https://sakak-medical-checkup.vercel.app](https://sakak-medical-checkup.vercel.app)

## 기술 스택

- TypeScript
- React
- Tailwind CSS, daisyUI
- React Hook Form
- Vite
- MSW
- ESLint, Prettier, Lefthook

## 프로젝트 구조

- `apis`: CANDiY API 함수
- `components/ui`: 공통 UI 컴포넌트
- `components/feature`: 서비스의 기능을 구현한 컴포넌트
- `mocks`: MSW 핸들러
- `policies`: 데이터 처리 등의 정책 함수
- `schemas`: 스키마 타입
- `utils`: 유틸리티 함수
