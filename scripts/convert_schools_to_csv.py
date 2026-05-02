import json
import csv

# Load the data we downloaded earlier
with open('data/kinshasa_schools.json', 'r') as f:
    data = json.load(f)

# Filter out only the schools
schools = [e for e in data['elements'] if e.get('tags', {}).get('amenity') == 'school']

# Create the CSV file
with open('data/kinshasa_schools.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    # Add column headers
    writer.writerow(['Name', 'Latitude', 'Longitude', 'OSM_ID'])
    
    for s in schools:
        name = s.get('tags', {}).get('name', 'Unnamed')
        lat = s.get('lat', '')
        lon = s.get('lon', '')
        osm_id = s.get('id', '')
        writer.writerow([name, lat, lon, osm_id])

print(f"Successfully converted {len(schools)} schools to data/kinshasa_schools.csv")
