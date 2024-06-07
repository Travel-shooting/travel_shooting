### 비타민 B7조

# TRAVELSHOOTING
## 여행지와 관련된 사진 게시물을 올릴 수 있는 웹사이트 
## Travel-Shooting
> 🔗 <travel-shooting.vercel.app>

<br>
<br>
<br>

## 팀원 소개
<table>
  <tbody>
    <tr>
      <th align="center"><b>팀장: 이수진</b></th>
      <th align="center"><b>팀원: 손서영</b></th>
      <th align="center"><b>팀원: 서예은</b></th>
      <th align="center"><b>팀원: 조은영</b></th>
    </tr>
    <tr>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/59927808?v=4" width="100px;" alt="이수진"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/139070143?v=4" width="100px;" alt="손서영"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/167187204?v=4" width="100px;" alt="서예은"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/82076033?v=4" width="100px;" alt="조은영"/></td>
     <tr/>
      <td align="center"><a href="https://github.com/leeejin">@leeejin</a></td>
      <td align="center"><a href="https://github.com/sonsy723">@sonsy723</a></td>
      <td align="center"><a href="https://github.com/yeeunseo-dev">@yeeunseo-dev</a></td>
      <td align="center"><a href="https://github.com/Eunyoung-Jo">@Eunyoung-Jo</a></td>
    </tr>
  </tbody>
</table>

<br>

## 주요 기능
* 회원가입, 로그인, 로그아웃 구현
* 국가 api로 모든 나라 설정 가능
* 나라명 검색기능
* 태그별 정렬 기능
* 게시글 클릭 시 상세페이지로
* 프로필 수정
* 내가 쓴 글에 한해 수정, 삭제 기능 구현
* 추천 게시글 표출
<br>

## ✔️ 프로젝트 요구사항
### 필수 구현 사항

- [x]  로그인, 회원 가입
    - Authentication 에서 제공하는 api를 이용하여 아래 회원 가입, 로그인을 구현해보세요.
        - 이메일, 패스워드
        - 참고 자료: https://supabase.com/docs/reference/javascript/auth-signup
- [x]  CRUD
    - supabase 에서 제공하는 api를 이용하여 CRUD 데이터베이스 핸들링을 구현해보세요.
    - CUD(등록, 수정, 삭제)가 일어날 때 마다 R(조회)해서 자연스럽게 화면 변경을 해보세요.
- [x]  마이 페이지
    - 내 게시물 보기
        - Authentication 에서 제공하는 uid 를 이용해서 내 게시물들이 보일 수 있게 해보세요.
    - 프로필 수정 기능
        - Storage 에서 제공하는 api를 이용하여 이미지 업로드와 다운로드 url 을 받아서 이미지 핸들링을 해보세요.
        - 참고자료: https://supabase.com/docs/reference/javascript/storage-createbucket
- [x]  배포하기
    - Vercel 이라는 호스팅플랫폼을 이용해 배포합니다.
    - 배포에 적용될 브랜치는 main 브랜치로 적용합니다.
    
- [x]  Git을 최대한 활용해보기!
    - Pull Request 활용하기!
        - Merge는 Pull Request를 활용하여 진행한다.
        - Branch 만들어 작업하기
        - 코드 리뷰 해보기!
       
  #### (2) 선택요구사항
  ### 도전 과제

- [ ]  로그인, 회원가입 예외 처리
- [ ]  소셜 로그인 (구글, 깃헙)
- [ ]  비밀번호 찾기 기능
- [ ]  팔로우, 팔로워 기능
- [ ]  팔로우한 상대 게시물 확인 기능
- [ ]  댓글 기능
- [ ]  좋아요, 북마크 기능
- [ ]  반응형 웹 구현
- [ ]  무한스크롤 기능
- [ ]  더보기 기능
- [ ]  memo, useMemo, useCallback 을 이용한 렌더링 최적화 적용
- [ ]  Vercel 에 배포한 뒤 커스텀 도메인 적용 (500원 정도하는 저렴한 도메인 권장)

  #### (3) 체크리스트
- **SPA**
    - [x]  react-router-dom 적용: path에 따라 렌더링할 페이지 컴포넌트를 지정
    - [x]  CSR (Client Side Rendering)적용 : 서버로부터 json 데이터 받아와 새로고침 없이 화면 전환
- **CRUD**
    - [x]  게시글 쓰기 기능 구현
    - [x]  게시글 글 보여주기 구현
    - [x]  게시글 글 수정 구현
    - [x]  게시글 글 삭제 구현
- **스타일링 방식**
    - [x]  styled-components 적용
- **상태관리 라이브러리**
    - [x]  Redux 적용
- **Git**
    - [x]  git add / commit / push 활용
    - [x]  git 브랜치/ PR / merge 활용
    - [x]  github pull request에서 Code review 활용
- **배포**
    - [x]  Vercel 을 이용하여 배포하기
    - [ ]  가비아 또는 고대디 같은 도메인 판매 업체에서 도메인을 구매하여 커스텀 도메인 적용 (선택)
<br>

## Stacks

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>



<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visual studio code&logoColor=white">
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

<br>

## Wireframe
<img src="[](https://www.figma.com/design/m698YllOwppuOmUM7erLzg/b7?node-id=0-1&t=Tx3WcRwlOVE815ly-0)" alt="피그마링크">

