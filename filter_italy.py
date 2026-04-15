import openpyxl
import csv

def filter_italy_floods(input_file, output_file):
    print(f"Opening {input_file}...")
    
    # Load the Excel file
    # data_only=True ensures we get the values, not formulas
    wb = openpyxl.load_workbook(input_file, data_only=True)
    sheet = wb.active
    
    # 1. Get the headers (the top row like 'ID', 'Country', etc.)
    headers = [cell.value for cell in sheet[1]]
    
    # Find which column index is 'Country'
    # In Python, indexing starts at 0, so the first column is 0
    country_index = headers.index('Country')
    
    print(f"Filtering rows where Country is 'Italy'...")
    
    italy_rows = []
    # 2. Go through each row starting from the second row (skipping headers)
    for row in sheet.iter_rows(min_row=2, values_only=True):
        # Check if the country column matches 'Italy'
        if row[country_index] == "Italy":
            italy_rows.append(row)
            
    # 3. Save the results to a CSV file
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        
        # Write the header first
        writer.writerow(headers)
        
        # Write all the Italy rows we found
        writer.writerows(italy_rows)
        
    print(f"Success! Saved {len(italy_rows)} rows to {output_file}")

if __name__ == "__main__":
    filter_italy_floods("floodarchive.xlsx", "italy_floods.csv")
