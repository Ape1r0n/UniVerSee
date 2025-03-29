import gspread
import os
import pandas as pd
from datetime import datetime
from oauth2client.service_account import ServiceAccountCredentials


start_time = datetime.now()

scope = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
credentials = ServiceAccountCredentials.from_json_keyfile_name('universee2025.json', scope)
client = gspread.authorize(credentials)
sheet = client.open('UniVerSee_responses').sheet1

data = pd.DataFrame(sheet.get_all_values())
data = data.iloc[1:, 1:].reset_index(drop=True)
data.columns = ['faculty', 'gender', 'hobbies', 'which_trovert', 'wl_balance', 'dedication']

folder_name = 'data'
file_name = 'responses'
if not os.path.exists(folder_name):
    os.makedirs(folder_name)
data.to_excel(f"{folder_name}/{file_name}.xlsx", index=False)

print(f"Process finished in {(datetime.now() - start_time).total_seconds():.1f} seconds.")
print(f"Data saved to {folder_name}/{file_name}.xlsx successfully!")
