from flask import Flask, jsonify, request, render_template
import pandas as pd

app = Flask(__name__)

# Load the cleaned dataset
file_path = 'cleaned_data.csv'
df = pd.read_csv(file_path)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    age = request.args.get('age', default=None, type=int)
    gender = request.args.get('gender', default=None)
    nationality = request.args.get('nationality', default=None)
    accommodation_type = request.args.get('accommodationType', default=None)
    transportation_type = request.args.get('transportationType', default=None)
    accommodation_cost = request.args.get('accommodationCost', default=None, type=float)
    transportation_cost = request.args.get('transportationCost', default=None, type=float)
    
    filtered_df = df
    if age is not None:
        filtered_df = filtered_df[filtered_df['Traveler Age'] == age]
    if gender is not None:
        filtered_df = filtered_df[filtered_df['Traveler Gender'].str.lower() == gender.lower()]
    if nationality is not None:
        filtered_df = filtered_df[filtered_df['Traveler Nationality'].str.lower() == nationality.lower()]
    if accommodation_type is not None:
        filtered_df = filtered_df[filtered_df['Accommodation Type'].str.lower() == accommodation_type.lower()]
    if transportation_type is not None:
        filtered_df = filtered_df[filtered_df['Transportation Type'].str.lower() == transportation_type.lower()]
    if accommodation_cost is not None:
        filtered_df = filtered_df[filtered_df['Accommodation Cost'] <= accommodation_cost]
    if transportation_cost is not None:
        filtered_df = filtered_df[filtered_df['Transportation Cost'] <= transportation_cost]
    
    data = filtered_df.to_dict(orient='records')
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
