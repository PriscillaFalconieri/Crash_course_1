import openpyxl
import json
import datetime

def json_serial(obj):
    if isinstance(obj, (datetime.datetime, datetime.date)):
        return obj.isoformat()
    return obj

def convert_xlsx_to_geojson(xlsx_file, geojson_file):
    print(f"Opening {xlsx_file}...")
    wb = openpyxl.load_workbook(xlsx_file, data_only=True)
    sheet = wb.active
    
    # Get column headers
    headers = [cell.value for cell in sheet[1]]
    print(f"Headers found: {headers}")
    
    geojson = {
        "type": "FeatureCollection",
        "features": []
    }
    
    count = 0
    for row_idx, row in enumerate(sheet.iter_rows(min_row=2, values_only=True), start=2):
        # Create a dictionary of properties for the current row
        props = dict(zip(headers, row))
        
        # Identify longitude and latitude
        # Based on previous check, they are named 'long' and 'lat'
        try:
            lon = props.get('long')
            lat = props.get('lat')
            
            # Basic validation
            if lon is None or lat is None:
                continue
                
            lon = float(lon)
            lat = float(lat)
            
            # Format properties for JSON serialization
            serial_props = {str(k): json_serial(v) for k, v in props.items()}
            
            # Create the GeoJSON feature
            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [lon, lat]
                },
                "properties": serial_props
            }
            geojson["features"].append(feature)
            count += 1
            
        except (ValueError, TypeError) as e:
            # Skip rows where coordinates are not numbers
            # (e.g., empty cells or text in coordinate columns)
            continue
            
    # Save the resulting GeoJSON
    with open(geojson_file, 'w', encoding='utf-8') as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)
    
    print(f"Conversion complete! {count} features saved to {geojson_file}")

if __name__ == "__main__":
    convert_xlsx_to_geojson("floodarchive.xlsx", "flood_events.geojson")
