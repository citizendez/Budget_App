import json
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/budget_data')
def budget_data():

    with open('Static/data/df_Clean.json') as datafile:
        data = json.load(datafile) 
    
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
