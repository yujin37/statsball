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

# CSV 읽기
with open("backNumbers.csv", newline='', encoding='utf-8-sig') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        values = [
            row["teams"],
            row["name"],
            row["number"]
        ]
        cursor.execute("""
                       INSERT INTO backNumbers (
                          teams,name,number 
                       ) VALUES (
                           %s, %s, %s
                       )
                       """, values)
conn.commit()
conn.close()