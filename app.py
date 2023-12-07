from flask import Flask, render_template, request, jsonify
from static.python import maut
import json
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/post_maut', methods=['POST'])
def post_maut():
    matriks = request.form.get('matriks')
    jenis = request.form.get('jenis')
    bobot = request.form.get('bobot')
    
    matriks = json.loads(matriks)
    jenis = json.loads(jenis)
    bobot = json.loads(bobot)
    
    result = maut.initiation(matriks, jenis, bobot)
    
    return jsonify({'message': 'success', 'result': result})

@app.route('/post_file_maut', methods=["POST"])
def post_file_maut():
        
    file = request.files['file']
    
    data = pd.read_csv(file, header=None)
    
    if data.shape[1] == 1:
        data_temp = []
        
        for i in range(len(data)):
            data_split = str(data.iloc[i].values).replace('[', '').replace(']', '').strip("'").split(';')
            data_temp.append(data_split)

        data = pd.DataFrame(data_temp)
    
    if type(data[0][0]) == str:
        data = data.drop(0, axis=0)
    
    data_list = data.values.tolist()
    
    result = data_list
    
    return jsonify({'message': 'success', 'result': result})

if (__name__ == '__main__'):
    app.run('0.0.0.0', port=5000, debug=True)