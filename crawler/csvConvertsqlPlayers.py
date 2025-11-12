import csv
import psycopg2

# PostgreSQL 연결
conn = psycopg2.connect(
    dbname="baseball",
    user="postgres",
    password="2837",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

# team 이름 지정
team_name = "Giants"

# CSV 읽기
with open("giants_batting_full.csv", newline='', encoding='utf-8-sig') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        values = [
            team_name, 
            row["이름"],
            row["포지션"],
            row["타율"],
            row["경기"],
            row["타석"],
            row["타수"],
            row["득점"],
            row["안타"],
            row["2루타"],
            row["3루타"],
            row["홈런"],
            row["루타"],
            row["타점"],
            row["도루"],
            row["도실"],
            row["희타"],
            row["희비"],
            row["볼넷"],
            row["고의4구"],
            row["사구"],
            row["삼진"],
            row["병살"],
            row["장타율"],
            row["출루율"],
            row["실책"],
            row["도루성공률"],
            row["BB/K"],
            row["장타/안타"],
            row["멀티히트"],
            row["OPS"],
            row["득점권타율"],
            row["대타타율"]
            ]
        cursor.execute("""
                    INSERT INTO players (
                    teams, name, position, avg, game, atBats, totalPlate, runsScored,
                    singleHits, doublesHits, triplesHits, homeRuns, totalBases, runsBattedIn,
                    stolenBases, caughtStealing, sacrificeHits, sacrificeFlies, walks,
                    intentionalWalks, hitByPitch, strikeouts, doublePlays, sluggingPercent,
                    onBasePercent, error, stolenBasePercent, bbk, hits, multiHits, ops,
                    battingAvg, pinchHitterAvg
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        ) """, values)
conn.commit()
conn.close()