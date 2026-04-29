import pandas as pd
import json

def convert_to_geojson(excel_path, output_path):
    # Read the Excel file
    df = pd.read_excel(excel_path)
    
    # Filter for One-sided violence in Kinshasa, DRC
    filtered_df = df[
        (df['country'] == 'DR Congo (Zaire)') & 
        (df['adm_1'] == 'Kinshasa province') & 
        (df['type_of_violence'] == 3)
    ]
    
    print(f"Found {len(filtered_df)} events matching criteria.")
    
    if len(filtered_df) == 0:
        print("No events found. Check filtering criteria.")
        return

    features = []
    for _, row in filtered_df.iterrows():
        # Handle NaN values and non-serializable objects for JSON compatibility
        row_dict = row.to_dict()
        properties = {}
        for k, v in row_dict.items():
            if pd.isna(v):
                properties[k] = ""
            elif hasattr(v, 'isoformat'): # Handle datetime objects
                properties[k] = v.isoformat()
            else:
                properties[k] = v
        
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [float(row['longitude']), float(row['latitude'])]
            },
            "properties": properties
        }
        features.append(feature)

    geojson = {
        "type": "FeatureCollection",
        "features": features
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)
    
    print(f"GeoJSON saved to {output_path}")

if __name__ == "__main__":
    convert_to_geojson('data/GEDevent_v26_0_3 (1).xlsx', 'data/kinshasa_one_sided_violence_2025_2026.geojson')
