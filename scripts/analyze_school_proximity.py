import pandas as pd
import json
import math

def haversine(lat1, lon1, lat2, lon2):
    """Calculate the great circle distance between two points in meters."""
    R = 6371000  # Earth radius in meters
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    
    a = math.sin(dphi / 2)**2 + \
        math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def analyze_proximity(schools_path, ged_path):
    # Load schools
    with open(schools_path, 'r') as f:
        schools = json.load(f)
    
    # Load and filter GED events
    df = pd.read_excel(ged_path)
    events = df[
        (df['country'] == 'DR Congo (Zaire)') & 
        (df['adm_1'] == 'Kinshasa province') & 
        (df['type_of_violence'] == 3)
    ]
    
    event_coords = events[['latitude', 'longitude']].values.tolist()
    print(f"Analyzing {len(schools)} schools against {len(event_coords)} violence events...")

    near_schools = []
    far_schools = []

    for school in schools:
        try:
            s_lat = float(school.get('Latitude'))
            s_lon = float(school.get('Longitude'))
        except (TypeError, ValueError):
            continue
            
        is_near = False
        for e_lat, e_lon in event_coords:
            distance = haversine(s_lat, s_lon, float(e_lat), float(e_lon))
            if distance <= 2000: # 2km threshold
                is_near = True
                school['distance_to_nearest_event'] = round(distance, 2)
                break
        
        if is_near:
            near_schools.append(school)
        else:
            far_schools.append(school)

    # Save outputs
    with open('data/schools/Kinshasa/schools-near-violence-2km.json', 'w') as f:
        json.dump(near_schools, f, indent=2)
    
    with open('data/schools/Kinshasa/schools-far-from-violence-2km.json', 'w') as f:
        json.dump(far_schools, f, indent=2)

    print(f"Analysis Complete (2km Threshold):")
    print(f"- Schools within 1km: {len(near_schools)}")
    print(f"- Schools further than 1km: {len(far_schools)}")

if __name__ == "__main__":
    analyze_proximity('data/schools/Kinshasa/kinshasa-schools-cleaned.json', 'data/raw/Kinshasa/ged-event-v26-0-3.xlsx')
