from flask import Flask, render_template, request, jsonify
from static.python import maut
import json
import pandas as pd
import csv

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
    
    data_list = get_csv_data(file)
    
    result = data_list
    
    return jsonify({'message': 'success', 'result': result})

def get_csv_data(file):
    data = []
    for line in file:
        data.append(line.decode('utf-8').strip())

    data_temp = []
        
    for i in range(len(data)):
        if data[i].find(';') != -1:
            data_split = str(data[i]).split(';')
        else:
            data_split = str(data[i]).split(',')
            
        data_temp.append(data_split)

    data = data_temp

    if isinstance(data[0][0], str):
        data = data[1:]
    
    data_temp = data
    
    empty_row = []
    row = 0
    for data in data_temp:
        if data[0] == '':
            empty_row.append(row)
        row += 1
    
    if len(empty_row) != 0:
        matriks = data_temp[0:empty_row[0]]
        jenis = data_temp[(empty_row[0]+1):empty_row[1]]
        bobot = data_temp[(empty_row[1]+1):]
        
        data_list = {
            'matriks': matriks,
            'jenis': jenis,
            'bobot': bobot,
        }
    else:
        data_list = {
            'matriks': data_temp,
        }

    return data_list

if (__name__ == '__main__'):
    app.run('0.0.0.0', port=5000, debug=True)