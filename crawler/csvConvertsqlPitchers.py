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
with open("giants_pitching_full.csv", newline='', encoding='utf-8-sig') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        values = [
            team_name,  
            row["이름"],
            row["방어율"],
            row["경기"],
            row["완투"],
            row["완봉"],
            row["승"],
            row["패"],
            row["세"],
            row["홀"],
            row["승률"],
            row["타자"],
            row["투구수"],
            row["이닝"],
            row["피안타"],
            row["2루타"],
            row["3루타"],
            row["피홈런"],
            row["희타"],
            row["희비"],
            row["볼넷"],
            row["4사구"],
            row["탈삼진"],
            row["폭투"],
            row["보크"],
            row["실점"],
            row["자책"],
            row["블론세이브"],
            row["WHIP"],
            row["피안타율"],
            row["QS"]
        ]
        cursor.execute("""
            INSERT INTO pitchers (
                name, team, era, game, complete_game, shutouts, wins, losses, saves, holds,
                winning_percent, palyer_cnt, number_of_pitches, innings, single_hits, double_hits,
                triple_hits, home_runs, sacrifice_hits, sacrifice_flies, walks, hit_walks,
                strikeouts, wild_pitch, balk, runs, earned_runs, blown_save, whip, hits_percent, qs
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
            )
        """, values)

conn.commit()
conn.close()