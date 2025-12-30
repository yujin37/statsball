# ⚾ Statsball
우아한테크코스 8기 프리코스 4-5주차 오픈미션
## 프로젝트 소개
야구 선수 및 팀 기록을 조회할 수 있는 야구 통계 웹 서비스 입니다.
현재 2025 시즌 롯데 자이언츠 선수 데이터 중심으로 구현하였습니다. 
React 기반의 프론트엔드와 Spring Boot 기반의 백엔드를 연결해 Oracle Cloud로 배포하였습니다. 
## 🌐배포 링크
https://statsball.kro.kr/
## 🛠️사용한 기술
### Frontend
- React
- SCSS Modules
- Axios
### Backend
- Spring Boot
- Spring Data JPA
- Lombok
### Database
- PostgreSQL
### Crawling & Processing
- Python
- BeautifulSoup
- Selenium
### 데이터 수집
- 타자 기록: [롯데 자이언츠 사이트](https://www.giantsclub.com/html/)
- 투수,타자 등번호: [나무위키 롯데 자이언츠](https://namu.wiki/w/%EB%A1%AF%EB%8D%B0%20%EC%9E%90%EC%9D%B4%EC%96%B8%EC%B8%A0/%EC%84%A0%EC%88%98%EB%8B%A8#s-2.2)
- 팀 기록 데이터: [롯데 자이언츠 사이트](https://www.giantsclub.com/html/)
- 팀 로고: [나무위키 KBO 리그](https://namu.wiki/w/KBO%20%EB%A6%AC%EA%B7%B8#s-6)
### 배포 환경(Oracle Cloud)
- Compute Instance (Ubuntu)
- Nginx Reverse Proxy
  - React 정적 파일 호스팅
  - Spring Boot API 프록시 포워딩
- Spring Boot(War) systemd 서비스 실행
- PostgreSQL 인스턴스 내부 설치
- 방화벽 / 인바운드 규칙 
  - 80포트(HTTP)
  - 8080 포트(Spring Boot API)
## 📑주요 기능 목록
### ⭐ 선수 기록(투수, 타자)
  -  전체 선수 목록 출력 (이름순 정렬)
  -  검색 기능 제공
      - 타자: 구단, 이름, 포지션
      - 투수: 구단, 이름
### ⭐ 팀 기록
  - KBO 10개 구단 전체 팀 순위
  - 타격/득점/이닝 등 팀 기록 전체 조회
### ⭐ 선수 목록
**투수**
  - 선발 투수: QS 1회 이상
  - 홀드 투수: HOLD 1회 이상
  - 세이브 투수: SAVES 1회 이상
  - 그외: 위 3가지 요건에 충족되지 않는 경우

**타자**
  - 내야수: 1루수, 2루수, 3루수, 유격수
  - 외야수: 좌익수, 중견수, 우익수
  - 포수
