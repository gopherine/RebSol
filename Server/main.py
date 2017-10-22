from flask import Flask,jsonify,request, render_template,redirect,url_for
from flask_pymongo import PyMongo
from bson.json_util import dumps
import smtplib
from smtplib import SMTPException
import os
from twilio.rest import Client
from flask_cors import CORS



from datetime import datetime
import stripe

app=Flask(__name__)

pub_key= 'pk_test_i9VcQE9Cytx2wfybjxgzbpo4'
secret_key='sk_test_uCevBjxzfL4x92cChrnFWZXe'
stripe.api_key=secret_key

app.config['MONGO_DBNAME']='appjuce'
app.config['MONGO_URI']='mongodb://dbuser:dbpassword@ds133814.mlab.com:33814/appjuce'

mongo=PyMongo(app)
CORS(app)

@app.route('/users/arpit')
def testing():
    dbh=mongo.db.test

    s = dbh.find_one({'username' : "janedoe"})
    if s:
        output = {'username' : s['username'], 'firstname' : s['firstname']}
    else:
        output = "No such name"
    return jsonify({'result' : output})
	
	
@app.route('/store',methods=['POST'])
def create_store():
    dbh=mongo.db.test
    request_data=request.get_json()
    new_username=request_data['username']
    new_firstname=request_data['firstname']
    
    user_id = dbh.insert({'username': new_username,'firstname': new_firstname})
    new_user=dbh.find_one({'_id': user_id})
    output={'username': new_user['username'],'firstname':new_user['firstname']}
    return jsonify({'result':output})
	


	
	
#######Returns all the leads in a particular city for a particular service
@app.route('/store/<string:city_name>/<string:service_name>', methods=['GET'])	
def get_store(city_name,service_name):
    dbh=mongo.db.City
    s = dbh.find_one({'CityName' : city_name})
    services=s['Services']
    for p in services: 
        if p['Service'] == service_name:
           Output={'output':p}
           return jsonify({'output':Output})
        else:
            Output={'output': 'Error'}
    return jsonify({'output':Output})


#######Returns list of services in a city	
@app.route('/store/<string:city_name>', methods=['GET'])	
def get_city(city_name):
    dbh=mongo.db.City
    s = dbh.find_one({'CityName' : city_name})
    services=s['Services']
    serv=[]
    for p in services:
	    serv.append(p['Service'])
    return jsonify({'output':serv})
        
#######Returns list of cities for that service	
@app.route('/store/city', methods=['GET'])	
def get_all_city():
    dbh=mongo.db.City

    cities=[]
    return dumps(dbh.find({},{'CityName':1, '_id':0}))
	
	
####return jsonify({'output' :cities})



######POST request to the database storing the contact info when a customer enters the CONTACT US section
@app.route('/contact_us',methods=['POST'])
def contact_us():
    dbh=mongo.db.Contact
    request_data=request.get_json()
    contact_name=request_data['name']
    contact_phone=request_data['number']
    contact_emailid=request_data['email']
    message=request_data['message']
    contact_id = dbh.insert({'ContactName': contact_name,'ContactPhone': contact_phone,'ContactEmailID': contact_emailid,'Message': message})
    new_contact=dbh.find_one({'_id': contact_id})
    output={'ContactName': new_contact['ContactName'],'ContactPhone':new_contact['ContactPhone'],'ContactEmailID':new_contact['ContactEmailID'],'Message':new_contact['Message']}
	
    ####to send email to REB Solutions when a contact is added
    sender = "barpit87@gmail.com"
    receivers = ["bhardwajarpit91@gmail.com","atharvajava@gmail.com"]

    contact= "one new contact is added "+ contact_name +"  has Email id -  " + contact_emailid + " and Contact number -"+contact_phone+" with Message -"
    contact_message_body = message
    email_to_REBSOL=contact+contact_message_body
    password="riyaarpit"
    smtp = smtplib.SMTP('smtp.gmail.com:587')
    smtp.starttls()
    smtp.login(sender,password)
    smtp.sendmail(sender,receivers,email_to_REBSOL)
    print("Successfully sent email")
    smtp.quit()
		
    return jsonify({'result':output})
	

###API to send bulk sms to contacts for marketing purpose 

@app.route('/marketing')
def marketing():
    dbh=mongo.db.Contact
    account_sid="ACb2550cbb07adb72e38fe3fc1d94cc1bc"
    auth_token="64037eb1bfde3dc15790e77c334c1f52"
    contacts=dbh.find({},{'ContactPhone':1,'ContactName':1, '_id':0})
    
	
    client=Client(account_sid,auth_token)
    for contact in contacts:
        client.messages.create(from_="+12069664638",
	                           to=contact['ContactPhone'],
						       body="Hii " +contact['ContactName'])
	
	
    return dumps(contacts)

#######Down all the APIs are for payment gateway integration

@app.route('/index1')
def index():
    return render_template('index1.html')
	
###Screen after successfull payment	
@app.route('/thanks')
def thanks():
    return render_template('thanks.html')

###To create a customer object while payments so that it reflects the dashboard.	
@app.route('/pay' , methods=['POST'])
def pay():
    customer=stripe.Customer.create(email=request.form['stripeEmail'], source=request.form['stripeToken'])
    charge=stripe.Charge.create(
	customer=customer.id,
	amount=9900,
	currency='usd',
	description='LEAD')
   
    return redirect(url_for('thanks'))
	

		    		    
			
if __name__ == "__main__":
    app.run(debug=True)
	
	

    

	