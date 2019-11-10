import os
from flask import Flask, request, Response, jsonify
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort
import json 
from index import FlightPrediction

app = Flask(__name__)
app.debug = True

@app.route('/')
def hello_world():    
    return send_file("templates/index.html")


@app.route('/train', methods=[ 'GET'])
def train_data():
    return jsonify(fp.prepare_data())

@app.route('/predict', methods=[ 'POST'])
def predict(): 
    date_list =  request.get_json()
    fp.fit_given_data(date_list)
    predicted_data = fp.predict_final()
    return jsonify(predicted_data)

if __name__ == '__main__':
    fp = FlightPrediction()
    fp.prepare_data()
    fp.train_data_predict()
    app.run()
