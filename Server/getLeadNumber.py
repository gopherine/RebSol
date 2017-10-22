from flask import Flask,jsonify,request
from flask_pymongo import PyMongo

from datetime import datetime

app=Flask(__name__)

app.config['MONGO_DBNAME']='appjuce'
app.config['MONGO_URI']='mongodb://dbuser:dbpassword@ds133814.mlab.com:33814/appjuce'

mongo=PyMongo(app)



@app.route('/store/<string:city_name>/<string:service_name>/<int:lead_number>',methods=['GET'])
def get_lead(city_name,service_name,lead_number):
    dbh=mongo.db.City
    s = dbh.find_one({'CityName' : city_name})
    services=s['Services']
    for p in services: 
        Leads=p['Leads']
        for q in Leads:
            if q['LeadReqNumber']==lead_number:
                Output={'output':q}
                return jsonify({'output':Output})
            else:
                Output={'output': 'No Such Value Found'}
        return jsonify({'output':Output})
		
if __name__ == "__main__":
    app.run(debug=True)
			    