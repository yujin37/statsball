import csv
import sqlite3

# SQLite 연결 및 커서 생성
con = sqlite3.connect('baseball.db')
cursor = con.cursor()

# 테이블 생성
cursor.execute('''
    CREATE TABLE IF NOT EXISTS players(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teams TEXT,
        name TEXT, 
        position TEXT,
        avg DECIMAL,
        game INT,
        atBats INT,
        totalPlate INT,
        runsScored INT,
        singleHits INT,
        doublesHits INT, 
        triplesHits INT,
        homeRuns INT,
        totalBases INT,
        runsBattedIn INT,
        stolenBases INT,
        caughtStealing INT,
        sacrificeHits INT,
        sacrificeFlies INT,
        walks INT,
        intentionalWalks INT,
        hitByPitch INT,
        strikeouts INT,
        doublePlays INT,
        sluggingPercent DECIMAL,
        onBasePercent DECIMAL,
        error INT,
        stolenBasePercent DECIMAL,
        bbk DECIMAL,
        hits INT,
        multiHits INT,
        ops DECIMAL,
        battingAvg DECIMAL,
        pinchHitterAvg DECIMAL
    )
''')

# CSV 파일 읽기 및 데이터 삽입
with open('giants_batting_full.csv', 'r', encoding='utf-8') as file:
    csv_data = csv.reader(file)
    next(csv_data)  # 헤더 건너뛰기
    for row in csv_data:
        row.insert(0, '롯데')  # 팀명 추가
        print(row)
        try:
            cursor.execute('''
                INSERT INTO players (
                    teams, name, position, avg, game, atBats, totalPlate, runsScored,
                    singleHits, doublesHits, triplesHits, homeRuns, totalBases, runsBattedIn,
                    stolenBases, caughtStealing, sacrificeHits, sacrificeFlies, walks,
                    intentionalWalks, hitByPitch, strikeouts, doublePlays, sluggingPercent,
                    onBasePercent, error, stolenBasePercent, bbk, hits, multiHits, ops,
                    battingAvg, pinchHitterAvg
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            ''', row)
        except Exception as e:
            print(f"❌ 삽입 오류: {e}")

# 커밋 및 연결 종료
con.commit()
con.close()