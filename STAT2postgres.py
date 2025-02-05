import json
import csv

file_path = "players.json"
csv_file = "playercsv.csv"

def getage(birth_date):
    return 2024 - int(birth_date.split('-')[0])

def getpos(pos):
    if(1 in pos): 
        return "def"
    if(4 in pos):
        return "fwd"
    if(2 in pos):
        return "mid"
    if(3 in pos):
        return "ruck"
    return "no"

with open(file_path, 'r') as file:
    data = json.load(file)

with open(csv_file, mode="w", newline="") as file:
    writer = csv.writer(file)

    # Write the header (column names)
    writer.writerow(["ID", "Name", "Age", "Average", "Predicted", "Price", "Position", "Games", "Drafted", "Ignored"])

    id = 0

    for player in data:
        # Write the data row
        age = getage(player['dob'])
        pos = getpos(player['positions'])

        writer.writerow([
            str(id),
            f"{player['first_name']} {player['last_name']}",
            age,
            f"{player['stats']['avg_points']}",
            f"{player['stats']['avg_points']}",
            f"{player['cost']}",
            pos,
            f"{player['stats']['games_played']}",
            "0",
            "0"
        ])

        id += 1