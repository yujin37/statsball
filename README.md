# statsball
우아한테크코스 8기 프리코스 4-5주차 오픈미션
## 프로젝트 소개
가장 관심있는 야구 데이터를 바탕으로 React와 
Spring을 통해 간단한 정보 사이트를 구현하고자 합니다.
## 사용할 기술
### Frontend
- React
### Backend
- Spring Boot
- Spring Data JPA
- Lombok
### Database
- PostgresSQl
### Crawling & Processing
- Python
- BeautifulSoup
- Selenium
### 데이터 수집
- 타자 기록: [롯데 자이언츠 사이트](https://www.giantsclub.com/html/)
- 투수,타자 등번호: 수집 예정 
- 팀 결과 데이터: 수집 예정 
## 주요 기능 목록
### 선수 기록(투수, 타자)
  -  선수 목록 기본 출력(ID 순)
  -  검색 기능
    - 타자: 구단, 이름, 포지션
    - 투수: 구단, 이름
### 팀 기록
  - 전체 팀 순위 목록
  - 특정 구단 경기 결과 목록형 보기 
### 선수 목록
  - 투수/타자 전체 보기
  - 투수
    - 선발 투수: QS 1회 이상
    - 홀드 투수: HOLD 1회 이상 & 5경기 이상 출전
    - 세이브 투수: SAVES 1회 이상
    - 나머지
  - 타자
    - 내야수: 1루수, 2루수, 3루수, 유격수
    - 외야수: 좌익수, 중견수, 우익수
    - 포수
