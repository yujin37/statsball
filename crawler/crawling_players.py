from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import pandas as pd
import time
from functools import reduce
from selenium.webdriver.support.ui import WebDriverWait
options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

service = Service()
driver = webdriver.Chrome(service=service, options=options)

url = "https://www.giantsclub.com/html/?pcode=288"
driver.get(url)
time.sleep(2)


button_selector = "#div_data > div.morebtn a"

# 전체 컬럼 정의
column = [
    "순", "이름", "포지션", "타율", "경기", "타석",
    "타수", "득점", "안타", "2루타", "3루타", "홈런",
    "루타", "타점", "도루", "도실", "희타", "희비", "볼넷",
    "고의4구", "사구", "삼진", "병살", "장타율", "출루율",
    "실책", "도루성공률", "BB/K", "장타/안타", "멀티히트",
    "OPS", "득점권타율", "대타타율"
]

dataframes = []
cnt = 1
for page in range(3):
    print(f"\n📊 {page+1}번째 컬럼 세트 크롤링 중...")
    time.sleep(2)

    # 현재 페이지 HTML 파싱
    soup = BeautifulSoup(driver.page_source, "html.parser")
    table = soup.find_all("table")[0]
    if not table:
        print("❌ 테이블을 찾을 수 없습니다.")
        break
    if page == 0:
        column = [
    "순", "이름", "포지션", "타율", "경기", "타석",
    "타수", "득점", "안타", "2루타", "3루타", "홈런",
    "루타", "타점"]
    elif page == 1:
        column = ["순", "이름","포지션","도루", "도실", "희타", "희비", "볼넷",
    "고의4구", "사구", "삼진", "병살", "장타율"]
    elif page == 2:
        column = ["순", "이름","포지션","출루율",
    "실책", "도루성공률", "BB/K", "장타/안타", "멀티히트",
    "OPS", "득점권타율", "대타타율"]
    templen = len(table.find_all("tr"))
    df = pd.DataFrame(columns=column)

    for i in range(1, templen):
        tempTr = table.find_all("tr")[i]
        if tempTr.find("th") is not None:
            continue
        row = {}
        tds = tempTr.find_all("td")

        col_count = min(len(tds), len(column))
        for j in range(col_count):
            row[column[j]] = tds[j].get_text(strip=True)
        df = pd.concat([df, pd.DataFrame([row])], ignore_index=True)

    dataframes.append(df)
    print(f"✅ {page+1}번째 세트 완료: {len(df)}행")
    print(df)
    
    # 다음 컬럼 세트 버튼 클릭
    try:
        btns = driver.find_elements(By.CSS_SELECTOR, button_selector)
        if len(btns) >= 3:  # 3번째 버튼이 컬럼 이동 버튼
            next_btn = btns[cnt]
            cnt+=1
            driver.execute_script("arguments[0].click();", next_btn)
            print("👉 다음 컬럼 세트로 이동...")
            time.sleep(2)  # 안정화 대기
        else:
            print("⚠️ 다음 버튼을 찾지 못했습니다.")
            break
    except Exception as e:
        print("⚠️ 버튼 클릭 실패:", e)
        break

driver.quit()

# ✅ 이름 + 포지션 기준 병합
if dataframes:
    dataframes = [df.drop(columns=["순"], errors="ignore") for df in dataframes]
    df_merged = reduce(lambda left, right: pd.merge(left, right, on=["이름", "포지션"], how="outer"), dataframes)
    df_merged.to_csv("giants_batting_full.csv", index=False, encoding="utf-8-sig")
    print("\n🎉 모든 컬럼 세트 병합 완료 및 CSV 저장 완료!")
    print(df_merged.head())
else:
    print("⚠️ 수집된 데이터가 없습니다.")
