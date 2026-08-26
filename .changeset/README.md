# Changesets

릴리스에 포함할 변경은 `yarn changeset`으로 Changeset 파일을 추가합니다.

Changeset이 포함된 커밋이 `main`에 반영되면 GitHub Actions가 세 워크스페이스의 버전을 함께 올리고, 버전 커밋과 lightweight 태그 및 GitHub Release를 생성합니다. npm publish는 수행하지 않습니다.
