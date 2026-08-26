# Echoscript 작업 지침

## 기본 응답 원칙

- 항상 한국어 존댓말로 응답합니다.
- 결론을 먼저 말하고, 확인하지 못한 내용은 명확히 분리합니다.
- 사용자가 커밋을 명시적으로 요청하지 않으면 커밋하지 않습니다.
- 이미 수정된 파일은 사용자 또는 이전 작업의 변경으로 보고 임의로 되돌리지 않습니다.
- 요청과 직접 관련 없는 리팩터링, 포맷 변경, 의존성 변경은 하지 않습니다.
- 실행하지 않은 명령어, 테스트, 배포를 성공한 것처럼 보고하지 않습니다.

## 저장소 역할

이 저장소는 Yarn 플러그인인 Echoscript를 관리하는 TypeScript 모노레포입니다. Echoscript는 npm script 실행 시 시작과 종료 메시지를 출력해 스크립트 진행 상태와 실패 위치를 파악하기 쉽게 만듭니다.

- `packages/types`: `.echoscriptrc` 설정 타입과 JSON Schema를 제공합니다.
- `packages/core`: Echoscript의 핵심 로직을 제공합니다.
- `packages/plugin`: Yarn 플러그인 엔트리와 배포용 번들을 제공합니다.
- `resources`: README 생성에 필요한 원본 문서와 이미지 자산을 둡니다.
- `scripts`: 버전 동기화와 README 생성 스크립트를 둡니다.

## 작업 시작 체크

작업을 시작할 때 다음을 먼저 확인합니다.

- `git status --short`
- 변경 대상 파일의 기존 문체와 구조
- 루트 `package.json`, 관련 워크스페이스 `package.json`, `yarn.lock`, `.yarnrc.yml`, `mise.toml`, `mise.lock`
- `CLAUDE.md`가 `AGENTS.md`를 가리키는 심볼릭 링크인지
- README, schema, dist, plugin bundle처럼 생성 파일을 건드리는 작업인지

## 개발 환경

- 개발 도구 체인은 mise 2026.8.14를 사용하며, 루트 `mise.toml`에 Node.js 24.15.0과 `aqua:yarnpkg/berry` 기반 Yarn 4.18.0을 고정합니다. `packageManager`는 Yarn 생태계 메타데이터로 유지하며 `mise.toml`의 Yarn 버전과 같아야 합니다.
- Node.js 호환 범위는 `package.json`의 `engines.node` 기준으로 `^22.17.0 || >=24.0.0`이지만, 저장소 명령과 CI는 `mise.toml`의 정확한 버전을 사용합니다.
- Corepack과 Volta를 사용하지 않으며, 저장소에 Yarn 바이너리를 vendoring하거나 `.yarnrc.yml`의 `yarnPath`를 사용하지 않습니다.
- Yarn PnP를 사용합니다. `node_modules`를 전제로 한 변경을 추가하지 않습니다.
- 의존성을 변경하면 `package.json`, 워크스페이스 manifest, `yarn.lock`, `.pnp.cjs`, `.pnp.loader.mjs`, `.yarn/cache` 변경을 함께 확인합니다.
- `npmMinimalAgeGate` 또는 `npmPreapprovedPackages`처럼 Yarn 보안 설정을 바꿀 때는 이유와 대상 패키지를 명확히 남깁니다.

### mise 도구 체인 관리

- `mise.lock`을 커밋하고 로컬과 CI에서 `mise install --locked`로 도구 다운로드 URL과 제공되는 체크섬을 검증합니다.
- Node.js, Yarn 또는 mise 버전을 바꿀 때는 공식 릴리스와 보안 공지를 확인합니다. Node.js, Yarn 또는 backend를 바꾸면 `mise lock --platform linux-x64,macos-arm64`로 lockfile을 갱신합니다.
- GitHub Actions의 `jdx/mise-action`은 전체 커밋 SHA로 고정하며, `mise.toml`, `mise.lock`, `packageManager`의 Yarn 버전 일치를 검증합니다.

### 임시 도구 호환성 제약

- 2026-08-25 기준 TypeScript 7.0.2는 Yarn PnP 빌드에서 `TS2688`로 실패하므로 TypeScript는 6.0.3 계열을 유지합니다.
- `eslint-config-taeyoon@0.2.2`가 ESLint `^9.7.0`과 TypeScript `>=4.8.4 <6.1.0`을 지원하므로 ESLint는 9.39.5, TypeScript는 6.0.3 계열을 유지합니다. `yarn npm audit`의 ESLint 9 알림은 GHSA/CVE가 아닌 지원 종료 알림이며, 취약점만 검증할 때는 `--no-deprecations`를 함께 사용합니다.
- Yarn PnP와 `eslint-config-taeyoon`이 TypeScript 7 및 ESLint 10을 지원하면 위 제약을 제거하고 `yarn install --immutable`, `yarn ready`, `yarn npm audit --all --recursive`를 다시 검증합니다.

## Source of Truth

- README의 원본은 `resources/README.preset.md`입니다. `README.md`만 직접 수정해서 끝내지 않습니다.
- README 이미지 원본은 `resources/assets` 아래 파일입니다.
- 평상시 루트 버전의 원본은 `lerna.json`의 `version`입니다. 릴리스 시에는 Changesets의 fixed 그룹이 세 워크스페이스의 다음 버전을 결정하고, `yarn release:version`이 그 버전을 `lerna.json`, 루트 `package.json`, README에 동기화합니다.
- `.echoscriptrc` JSON Schema는 `packages/types/src`의 Zod 타입과 `packages/types/scripts/schema.ts`에서 생성됩니다.
- `packages/*/dist`는 TypeScript 빌드 결과물입니다.
- `packages/plugin/plugin/bundle.js`는 Rollup 번들 결과물입니다.

## 문서 작업 기준

- 문서는 한국어 또는 기존 문서가 쓰는 언어를 따릅니다. README 본문은 현재 영어를 사용합니다.
- README 내용을 바꿀 때는 `resources/README.preset.md`를 먼저 수정한 뒤 `yarn readme`를 실행합니다.
- 패키지 목록, 버전 배지, 이미지 경로는 README 생성 스크립트가 치환하므로 생성 결과와 원본의 관계를 깨지 않습니다.
- 긴 생성 결과를 수동으로 복제하지 말고 원본과 생성 명령을 우선합니다.

## 코드 작업 기준

- TypeScript 소스는 각 패키지의 `src` 아래에서 수정합니다.
- 타입 정의 변경이 `.echoscriptrc` 설정에 영향을 주면 `packages/types/schema/echoscriptrc.schema.json`도 재생성합니다.
- Yarn 플러그인 런타임 동작을 바꾸면 `packages/plugin/src`를 수정하고 `yarn bundle` 또는 `yarn ready`로 `packages/plugin/plugin/bundle.js`를 갱신합니다.
- 공개 패키지 경계에 영향을 주는 변경은 각 패키지의 `main`, `types`, `publishConfig`, `.npmignore` 영향을 확인합니다.
- secret, token, credential을 저장소에 기록하지 않습니다. `.yarnrc.yml`의 npm token 설정은 환경 변수 참조 형태를 유지합니다.

## 명령어

- 도구 체인 설치: `mise install --locked`
- 설치 검증: `yarn install --immutable`
- Changeset 추가: `yarn changeset`
- Changeset 버전 반영: `yarn release:version`
- 전체 빌드: `yarn build`
- 배포 준비 빌드와 번들: `yarn ready`
- 타입 패키지 빌드와 schema 생성: `yarn build:types`
- 코어 빌드: `yarn build:core`
- 플러그인 타입 빌드: `yarn build:plugin`
- 플러그인 번들 생성: `yarn bundle`
- README 재생성: `yarn readme`
- 버전 동기화와 README 재생성: `yarn version`
- VS Code SDK 갱신: `yarn vscode`

## GitHub Release

- 릴리스할 변경에는 `.changeset` 아래 Changeset 파일을 추가합니다.
- Changeset이 포함된 커밋이 `main`에 반영되면 `.github/workflows/release.yml`이 버전 반영 커밋을 `main`에 직접 추가하고, 같은 커밋을 가리키는 lightweight `vX.Y.Z` 태그와 GitHub Release를 생성합니다.
- 세 워크스페이스는 Changesets fixed 그룹으로 같은 버전을 유지합니다.
- 이 파이프라인은 npm publish를 수행하지 않습니다.

## 검증 기준

변경 후 가능한 범위에서 아래를 실행합니다.

- mise 도구 체인 설정 변경: `mise install --locked`
- 의존성, Yarn 설정, lockfile 변경: `yarn install --immutable`
- TypeScript 소스, schema, 패키지 manifest 변경: `yarn build`
- Yarn 플러그인 번들 동작 또는 배포 산출물 변경: `yarn ready`
- README 원본이나 README 생성 스크립트 변경: `yarn readme`
- 문서나 설정만 변경: `git diff --check`
- `CLAUDE.md` 링크 변경: `test -L CLAUDE.md && test "$(readlink CLAUDE.md)" = "AGENTS.md"`

검증할 수 없는 항목은 최종 보고에서 이유를 함께 적습니다.

## 커밋 원칙

커밋은 사용자가 요청한 경우에만 합니다. 현재 저장소는 아래와 같은 짧은 prefix 스타일을 사용합니다.

- 기능 추가: `Feat: ...`
- 문서 변경: `Docs: ...`
- 리팩터링: `Refactor: ...`
- 버그 수정: `Fix: ...`
- 설정, 빌드, 의존성, 기타 작업: `Chore: ...`
- 테스트 추가 또는 수정: `Test: ...`
- 릴리스 버전 변경: `v0.0.0`

`prefix: ...` 형식의 커밋 메시지는 prefix 뒤 본문의 첫 글자를 대문자로 씁니다.

커밋을 요청받더라도 unrelated change는 함께 stage하지 않습니다. 같은 파일에 사용자 변경과 작업 변경이 섞여 있으면 diff를 확인하고 필요한 부분만 선별합니다.

## 보안과 운영 주의

- npm 토큰, 개인 접근 토큰, 환경 변수 값은 파일에 쓰지 않습니다.
- 공개 README, schema URL, 플러그인 import URL을 바꿀 때는 공개 저장소 경로와 배포 사용자를 고려합니다.
- 배포나 publish는 사용자가 명시적으로 요청한 경우에만 수행합니다. 자동 릴리스 파이프라인은 GitHub Release만 생성하며 npm publish를 수행하지 않습니다.
