import openpyxl
import csv

def convert_xlsx_to_csv(input_file, output_file):
    try:
        # Load the workbook
        wb = openpyxl.load_workbook(input_file, data_only=True)
        # Select the 'Data' sheet
        if 'Data' in wb.sheetnames:
            sheet = wb['Data']
        else:
            sheet = wb.active
        
        # Open the CSV file for writing
        with open(output_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            # Iterate through rows and write to CSV
            for row in sheet.rows:
                writer.writerow([cell.value for cell in row])
        print(f"Successfully converted {input_file} to {output_file}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    input_xlsx = 'data/democratic-republic-of-congo_hrp_civilian_targeting_events_and_fatalities_by_month-year_as-of-2.xlsx'
    output_csv = 'data/rdc_civilian_incidents.csv'
    convert_xlsx_to_csv(input_xlsx, output_csv)
