import csv
import sqlite3

con = sqlite3.connect('baseball.db')
cursor = con.cursor()
cursor.execute("DROP TABLE IF EXISTS pitchers")
cursor.execute('''
CREATE TABLE pitchers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teams TEXT,
    name TEXT,
    era REAL,
    game INTEGER,
    completeGame INTEGER,
    shutouts INTEGER,
    wins INTEGER,
    losses INTEGER,
    saves INTEGER,
    holds INTEGER,
    winningPercent REAL,
    playersCnt INTEGER,
    numberOfPitches INTEGER,
    innings TEXT,
    singleHits INTEGER,
    doubleHits INTEGER,
    tripleHits INTEGER,
    homeRuns INTEGER,
    sacrificeHits INTEGER,
    sacrificeFlies INTEGER,
    walks INTEGER,
    hitWalks INTEGER,
    strikeouts INTEGER,
    wildPitch INTEGER,
    balk INTEGER,
    runs INTEGER,
    earnedRuns INTEGER,
    blownSave INTEGER,
    whip REAL,
    hitsPercent REAL,
    qs INTEGER
)
''')

with open('giants_pitching_full.csv', 'r') as file:
    csv_data = csv.reader(file)
    next(csv_data)
    for row in csv_data:
        row.insert(0, '롯데')  # teams 추가
        print(row)
        try:
            cursor.execute('''
                INSERT INTO pitchers (
                    teams, name, era, game, completeGame, shutouts,
                    wins, losses, saves, holds, winningPercent, 
                    playersCnt, numberOfPitches, innings,
                    singleHits, doubleHits, tripleHits,
                    homeRuns, sacrificeHits, sacrificeFlies,
                    walks, hitWalks, strikeouts, wildPitch, balk,
                    runs, earnedRuns, blownSave, whip, hitsPercent, qs
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            ''', row)
        except Exception as e:
            print(f"❌ 삽입 오류: {e}")
con.commit()
con.close()