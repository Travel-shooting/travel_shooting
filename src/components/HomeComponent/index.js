export { default } from "./HomeComponent";

/** 참고로 이렇게 하는 이유는 index.js를 추가하게 되면
 * 다른데서 파일 불러올때 ./components/HomeComponent/HomeComponent 이런식으로 불러와야하는데
 * ./components/HomeComponent 까지만 써도 jsx 파일이 불러와져용
 * 또한 폴더별로 관리해서 해당 폴더의 스타일을 주고싶다@
 * 하면 여기서 style 관리해도 되고 편하다고 합니다
 */
