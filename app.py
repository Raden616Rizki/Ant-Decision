from flask import Flask, render_template, request, jsonify
from static.python import maut
import json

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

if (__name__ == '__main__'):
    app.run('0.0.0.0', port=5000, debug=True)