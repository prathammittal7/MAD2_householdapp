import os
import csv
from io import StringIO
from flask import Flask, jsonify, render_template, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc, func, or_
from flask_jwt_extended import JWTManager, create_access_token, jwt_required , get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from models import CustomerProfile, db , User, Service, ProfessionalProfile, ServiceRequest
from werkzeug.utils import secure_filename   
from flask_cors import CORS 
from flasgger import Swagger
from flask_caching import Cache
from datetime import datetime as DateTime
from celery import Celery
import requests
from celery.schedules import crontab
from flask_mail import Mail, Message

app = Flask(__name__,template_folder='../frontend', static_folder='../frontend', static_url_path='/static')

#Configure Celery and Redis
def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['result_backend'],
        broker=app.config['broker_url'] 
    )
    celery.conf.update(app.config)
    # Attach Flask application context to Celery
    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():  # Push the Flask app context here
                return super().__call__(*args, **kwargs)
    celery.Task = ContextTask
    return celery

app.config['broker_url'] = 'redis://localhost:6379/0'
app.config['result_backend'] = 'redis://localhost:6379/0'

celery = make_celery(app)

#Configure mail
app.config['MAIL_SERVER'] = 'smtp.sendgrid.net'
app.config['MAIL_PORT'] = 587  # Use 587 for TLS
app.config['MAIL_USE_TLS'] = True  # TLS is required
app.config['MAIL_USERNAME'] = 'apikey'  # Use 'apikey' as the username (this is required by SendGrid)
app.config['MAIL_PASSWORD'] = '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'  # Your SendGrid API key (replace with your actual API key)
app.config['MAIL_DEFAULT_SENDER'] = 'prathammittalpmindia@gmail.com'  # Your email address to send from
mail = Mail(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Creates 'uploads' if it doesn’t exist

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit file size to 16MB
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}  # Allowed file extensions


cache = Cache(app, config={'CACHE_TYPE': 'RedisCache','CACHE_DEFAULT_TIMEOUT': 30,'CACHE_REDIS_HOST': 'localhost','CACHE_REDIS_PORT': 6379,'CACHE_REDIS_DB': 0})


CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

swagger = Swagger(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'

jwt = JWTManager(app)


def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

db.init_app(app)

first_request = True
# Initialize the database
@app.before_request
def create_tables():
  global first_request
  if first_request:
    db.create_all()
    first_request = False


@app.route('/download/<string:filename>', methods=['GET'])
@jwt_required()
def download_file(filename):
  file_directory = os.path.join(app.root_path, 'uploads')
  
  return send_from_directory(file_directory, filename, as_attachment=True)

 
@celery.task(name="tasks.send_daily_reminders")
def send_daily_reminders():
   
    pending_requests = (
        ServiceRequest.query.filter_by(service_status='requested')
        .join(ProfessionalProfile, ServiceRequest.professional_id == ProfessionalProfile.user_id)
        .add_columns(ProfessionalProfile.full_name)
        .all()
      )

    for service_request in pending_requests:
      professional_name = service_request.full_name
      #hardcoded chat_hook for demo
      chat_hook_url = 'https://chat.googleapis.com/v1/spaces/AAAANyKdIbk/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=k4tyd4ZEJuB-eZQ8ZZJNj205tm-ddWGrSF6ZQexi4iI'
      
      # Prepare and send the reminder message
      message = {
          "text": f"Reminder: {professional_name}! You have pending service requests. Please visit or take action."
      }

      try:
          response = requests.post(chat_hook_url, json=message, timeout=10)
          response.raise_for_status()  
      except requests.RequestException as e:
       
          print(f"Failed to send reminder to {professional_name}: {e}")
          continue
    return "Daily reminders sent successfully!"


@celery.task(name="tasks.send_monthly_activity_report")
def send_monthly_activity_report():
    # Generate the report
    customers = CustomerProfile.query.all()
    for customer in customers:
      report = generate_customer_report(customer.user_id)  
      html_content = render_report_as_html(report)
      try:
        msg = Message(
            f"Monthly Activity Report - {DateTime.now().strftime('%B')}",
            recipients=['prathammittalpmindia@gmail.com'],
            html=html_content
        )
        mail.send(msg)
      except Exception as e:
        print(f"Error sending email: {e}")
    return "Monthly activity reports sent successfully!"

def generate_customer_report(customer_id):
    customer = CustomerProfile.query.filter_by(user_id=customer_id).first()

    if not customer:
        return {"error": "Customer not found"}

    report_data = (
        db.session.query(
            func.count(ServiceRequest.id).label("services_used"),       
            func.sum(Service.price).label("total_spent")                
        )
        .join(Service, ServiceRequest.service_id == Service.id)         
        .filter(ServiceRequest.customer_id == customer_id)             
        .filter(ServiceRequest.service_status == "completed")          
        .one()  
    )

    return {
        "customer_name": customer.full_name,
        "services_used": report_data.services_used or 0,
        "total_spent": report_data.total_spent or 0.0,
        "address": customer.address,
        "pin_code": customer.pin_code,
        "date_range": "Till Date"
    }
def render_report_as_html(report):
  
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Customer Report</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 20px;
                line-height: 1.6;
            }}
            .report-container {{
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 20px;
                max-width: 600px;
                margin: auto;
            }}
            .report-container h1 {{
                text-align: center;
                color: #333;
            }}
            .report-item {{
                margin-bottom: 10px;
            }}
            .report-item span {{
                font-weight: bold;
            }}
        </style>
    </head>
    <body>
        <div class="report-container">
            <h1>Customer Report</h1>
            <div class="report-item">
                <span>Name:</span> {report['customer_name']}
            </div>
            <div class="report-item">
                <span>Address:</span> {report['address']}
            </div>
            <div class="report-item">
                <span>Pin Code:</span> {report['pin_code']}
            </div>
            <div class="report-item">
                <span>Services Used:</span> {report['services_used']}
            </div>
            <div class="report-item">
                <span>Total Spent:</span> ${report['total_spent']}
            </div>
            <div class="report-item">
                <span>Date Range:</span> {report['date_range']}
            </div>
        </div>
    </body>
    </html>
    """
    return html_content


@celery.task(name="export_service_requests")
def export_service_requests(professional_id):
    # Fetch closed requests
    closed_requests = ServiceRequest.query.filter(
        ServiceRequest.professional_id == professional_id,
        ServiceRequest.service_status.in_(['completed'])
    ).all()
    closed_requests_dict = [closed_request.as_dict() for closed_request in closed_requests]
    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=closed_requests_dict[0].keys())
    writer.writeheader()
    writer.writerows(closed_requests_dict)

    save_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'reports/', professional_id+'_closed_requests.csv')
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    with open(save_path, 'w') as f:
        f.write(output.getvalue())
    notify_admin(f"CSV export complete for Professional ID: {professional_id}. File saved at {save_path}.")    
    return save_path


@app.route('/admin/export/<string:professional_id>', methods=['GET'])
@jwt_required()
def export_requests(professional_id):
    task = export_service_requests.delay(professional_id)
    return jsonify({'task_id': task.id}), 202


@celery.task(name="tasks.notify_admin")
def notify_admin(message):
    admin_email = "prathammittalpmindia@gmail.com"  
    msg = Message(
        subject="Admin Notification",
        recipients=[admin_email],
        body=message
    )
    mail.send(msg)

@app.route('/admin/reports/list', methods=['GET'])
@jwt_required()
def list_downloads():
    files = [f for f in os.listdir('reports') if f.endswith('.csv')]
    return jsonify({'downloads': files})

@app.route('/admin/reports/download/<string:filename>', methods=['GET'])
@jwt_required()
def download_reports_file(filename):
  file_directory = os.path.join(app.root_path, 'reports')
  return send_from_directory(file_directory, filename, as_attachment=True)

celery.conf.beat_schedule = {
    'send-daily-reminders': {
        'task': 'tasks.send_daily_reminders',
        'schedule': crontab(hour=18, minute=0),  # 6 PM daily
        #'schedule': crontab(minute='*/1'),
    }
}
celery.conf.beat_schedule['send-monthly-report'] = {
    'task': 'tasks.send_monthly_activity_report',
    'schedule': crontab(hour=8, minute=0, day_of_month=1),  # 8 AM on the 1st
    #'schedule': crontab(minute='*/1'),
}

@app.route('/')
def index():
  return render_template('index.html') 

@app.route('/register', methods=['POST'])
@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        username, password, role = data.get('username'), data.get('password'), data.get('role')
        if User.query.filter_by(username=username).first():
            return jsonify({"category": "danger", "message": "User already exists!"}), 401
        if role not in ['customer', 'professional']:
            return jsonify({"category": "danger", "message": "Invalid role!"}), 401
        new_user = User(username=username, password=generate_password_hash(password, method='pbkdf2:sha256'), role=role, approve=False, blocked=True)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"category": "success", "message": "Registration successful!"}), 200
    return jsonify({"category": "danger", "message": "Bad request"}), 400


# @app.route('/login', methods=['POST'])
# def login():
#   if request.method == 'POST':
#     username = request.json.get('username')
#     password = request.json.get('password')
#     user = User.query.filter(User.username==username).filter(User.role.in_(['customer','professional'])).first()
#     if user and check_password_hash(user.password, password):
#       if user.role == 'customer':
#         #Check if customer profile is approved
#         if not user.approve:
#           return jsonify({"category": "danger","message": "Your account is not approved yet! Please wait for the admin to approve."}), 401
#         # Check if customer profile is blocked
#         if user.blocked:
#           return jsonify({"category": "danger","message": "Your account is blocked! Please contact the admin."}), 401
#         # Check if the customer profile is incomplete
#         customer_profile = CustomerProfile.query.filter_by(user_id = user.id).first()
#         if not customer_profile:
#           additional_claims = {"user_id": user.id, "role": user.role,"redirect" : "customer_profile"}
#           access_token = create_access_token(username, additional_claims=additional_claims)
#           return jsonify(access_token=access_token)
#         additional_claims = {"user_id": user.id, "role": user.role,"redirect" : "customer_dashboard"}
#         access_token = create_access_token(username, additional_claims=additional_claims)
#         return jsonify(access_token=access_token)  
#       elif user.role == 'professional':
#         # Check if the professional profile is incomplete
#         professional_profile = ProfessionalProfile.query.filter_by(user_id = user.id).first()
#         if not professional_profile:
#           additional_claims = {"user_id": user.id, "role": user.role, "redirect" : "professional_profile"}
#           access_token = create_access_token(username, additional_claims=additional_claims)
#           return jsonify(access_token=access_token)
#         # Check if professional profile is approved
#         if not user.approve:
#           return jsonify({"category": "danger","message": "Your account is not approved yet! Please wait for the admin to approve."}), 401
#         # Check if professional profile is blocked
#         if user.blocked:
#           return jsonify({"category": "danger","message": "Your account is blocked! Please contact the admin."}), 401
#         additional_claims = {"user_id": user.id, "role": user.role, "redirect" : "professional_dashboard"}
#         access_token = create_access_token(username, additional_claims=additional_claims)
#         return jsonify(access_token=access_token)            
#     return jsonify({"category": "danger","message": "Bad username or password"}), 401
#   return jsonify({"category": "danger","message": "Bad request"}), 400
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username, password = data.get('username'), data.get('password')
        user = User.query.filter(User.username == username, User.role.in_(['customer', 'professional'])).first()
        
        if not (user and check_password_hash(user.password, password)):
            return jsonify({"category": "danger", "message": "Bad username or password"}), 401
        
        if not user.approve:
            return jsonify({"category": "danger", "message": "Your account is not approved yet! Please wait for the admin to approve."}), 401
        
        if user.blocked:
            return jsonify({"category": "danger", "message": "Your account is blocked! Please contact the admin."}), 401
        
        profile = (CustomerProfile if user.role == 'customer' else ProfessionalProfile).query.filter_by(user_id=user.id).first()
        redirect_page = f"{user.role}_dashboard" if profile else f"{user.role}_profile"
        
        additional_claims = {"user_id": user.id, "role": user.role, "redirect": redirect_page}
        access_token = create_access_token(username, additional_claims=additional_claims)
        return jsonify(access_token=access_token)
    
    return jsonify({"category": "danger", "message": "Bad request"}), 400


@app.route('/get-claims', methods=['GET'])
@jwt_required()
def get_claims():
    claims = get_jwt()
    return jsonify(claims=claims), 200


@app.route('/admin/login', methods=['POST'])
def admin_login():
  if request.method == 'POST':
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username, role='admin').first()
    #if user and check_password_hash(user.password, password):
    if user:
      additional_claims = {"admin_user_id": user.id, "role": user.role}
      access_token = create_access_token(username, additional_claims=additional_claims)
      return jsonify(access_token=access_token)
    return jsonify({"category": "danger","message": "Bad username or password"}), 401
  return jsonify({"category": "danger","message": "Bad request"}), 400

@app.route('/admin/profile', methods=['POST'])
@jwt_required()
def admin_profile():
  return jsonify({"message":"Admin! You can't make changes to your profile","category": "danger"}), 200

@app.route('/admin/dashboard', methods=['POST'])
@jwt_required()
def admin_dashboard():
    claims = get_jwt()
    if claims['role'] != 'admin':
        return jsonify({"message": "Not an Admin!", "category": "danger"}), 401
    
    services = {service.id: service.as_dict() for service in Service.query.all()}
    professional_profiles = ProfessionalProfile.query.all()
    service_requests = [sr.as_dict() for sr in ServiceRequest.query.all()]
    customers = [customer.as_dict() for customer in User.query.filter_by(role='customer').all()]
    
    user_dict, prof_dict, service_type = {}, {}, {}
    for profile in professional_profiles:
        user = User.query.get(profile.user_id)
        service = services.get(profile.service_type)
        if user:
            user_dict[profile.user_id] = user.as_dict()
        if service:
            service_type[profile.user_id] = service
        prof_dict[profile.user_id] = profile.as_dict()
    
    return jsonify(
        message="Admin dashboard data retrieved successfully.",
        category="success",
        services=list(services.values()),
        professional_profiles=[profile.as_dict() for profile in professional_profiles],
        service_requests=service_requests,
        user_dict=user_dict,
        service_type=service_type,
        prof_dict=prof_dict,
        customers=customers
    ), 200

@app.route('/admin/search', methods=['POST'])
@jwt_required()
def admin_search():
    claims = get_jwt()
    if claims['role'] != 'admin':
        return jsonify({"category": "danger", "message": "Admin access required for this search"}), 401 
    
    data = request.get_json()
    search_type, search_term = data.get('search_type'), data.get('search_text', '').strip()
    
    results = {"customers": [], "professionals": [], "services": [], "service_requests": []}
    service_type, prof_dict, service_dict, cust_dict = {}, {}, {}, {}
    
    if search_type == 'customer':
        service_dict = {service.id: service.as_dict() for service in Service.query.all()}
        cust_dict = {cust.user_id: cust.as_dict() for cust in CustomerProfile.query.all()}
        results["customers"] = [sr.as_dict() for sr in ServiceRequest.query
            .join(CustomerProfile, ServiceRequest.customer_id == CustomerProfile.user_id)
            .filter(or_(CustomerProfile.full_name.ilike(f"%{search_term}%"),
                        CustomerProfile.address.ilike(f"%{search_term}%"),
                        CustomerProfile.pin_code.ilike(f"%{search_term}%")))
            .all()]
    
    elif search_type == 'professional':
        results["professionals"] = [prof.as_dict() for prof in ProfessionalProfile.query.filter(
            or_(ProfessionalProfile.full_name.ilike(f"%{search_term}%"),
                ProfessionalProfile.address.ilike(f"%{search_term}%"))).all()]
    
    elif search_type == 'service':
        results["services"] = [service.as_dict() for service in Service.query.filter(
            or_(Service.name.ilike(f"%{search_term}%"),
                Service.description.ilike(f"%{search_term}%"),
                Service.service_type.ilike(f"%{search_term}%"))).all()]
    
    elif search_type == 'service_request':
        results["service_requests"] = [sr.as_dict() for sr in ServiceRequest.query.filter(
            or_(ServiceRequest.service_status.ilike(f"%{search_term}%"),
                ServiceRequest.remarks.ilike(f"%{search_term}%"))).all()]
    
    if not any(results.values()):
        return jsonify({"category": "info", "message": "No results found for your search"}), 404
    
    return jsonify({
        "category": "success",
        "message": "Search completed successfully",
        "data": results
    }), 200


@app.route('/admin/manage_user/<int:user_id>/<string:field>/<string:value>', methods=['POST'])
@jwt_required()
def manage_user(user_id, field, value):
    claims = get_jwt()
    if claims['role'] != 'admin':
        return jsonify({"message": "Unauthorized access. Admins only.", "category": "danger"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found.", "category": "danger"}), 404

    valid_fields = {
        "approve": {"true": (False, "Professional/Customer rejected successfully", "danger"),
                     "false": (True, "Professional/Customer approved successfully", "success")},
        "blocked": {"true": (False, "User unblocked successfully", "success"),
                     "false": (True, "User blocked successfully", "danger")}
    }
    
    if field in valid_fields and value.lower() in valid_fields[field]:
        setattr(user, field, valid_fields[field][value.lower()][0])
        db.session.commit()
        return jsonify({"message": valid_fields[field][value.lower()][1], "category": valid_fields[field][value.lower()][2]}), 200
    
    return jsonify({"message": "Invalid field or value specified.", "category": "danger"}), 400



@app.route('/admin/services/get/<int:service_id>', methods=['GET'])
@jwt_required()
def get_services(service_id):
    if get_jwt().get('role') != 'admin':
        return jsonify({"category": "danger", "message": "Please login as admin to update service"}), 401 

    service = Service.query.get_or_404(service_id)
    return jsonify({
        "id": service.id,
        "service_type": service.service_type,
        "name": service.name,
        "description": service.description,
        "price": service.price
    }), 200

@app.route('/admin/services/create_services', methods=['POST'])
@jwt_required()
def create_services():
  claims = get_jwt()
  
  if claims['role'] != 'admin':
    return jsonify({"category": "danger","message": "Please login as admin to create service"}), 401 
  data = request.get_json()
  

  if not data:
    return jsonify({"category": "danger", "message": "Invalid input data"}), 401
  
  required_fields = ["service_type", "name", "price", "description"]
  for field in required_fields:
    if field not in data:
      return jsonify({"category": "danger", "message": f"'{field}' is a required field"}), 400
  try:
    new_service = Service(
    service_type=data['service_type'],
      name=data['name'],
      price=data['price'],
      description=data['description']
    )
    db.session.add(new_service)
    db.session.commit()
    return jsonify({"category": "success", "message": "Service created successfully"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"category": "danger", "message": "An error occurred while creating the service"}), 500


@app.route('/admin/services/update/<int:service_id>', methods=['PUT'])
@jwt_required()
def update_service(service_id):
    if get_jwt().get('role') != 'admin':
        return jsonify({"category": "danger", "message": "Please login as admin to update service"}), 401 

    service = Service.query.get_or_404(service_id)
    data = request.get_json()
    
    if not data:
        return jsonify({"category": "danger", "message": "Invalid input data"}), 400

    try:
        for field in ['service_type', 'name', 'price', 'description']:
            if field in data:
                setattr(service, field, data[field])
        
        db.session.commit()
        return jsonify({"category": "success", "message": "Service updated successfully"}), 200
    except Exception:
        db.session.rollback()
        return jsonify({"category": "danger", "message": "An error occurred while updating the service"}), 500


@app.route('/admin/services/delete/<int:service_id>', methods=['DELETE'])
@jwt_required()
def delete_service(service_id):
    if get_jwt().get('role') != 'admin':
        return jsonify({"category": "danger", "message": "Please login as admin to delete service"}), 401 

    service = Service.query.get(service_id)
    if not service:
        return jsonify({"category": "danger", "message": "Service not found"}), 404

    try:
        db.session.delete(service)
        db.session.commit()
        return jsonify({"category": "success", "message": "Service deleted successfully"}), 200
    except Exception:
        db.session.rollback()
        return jsonify({"category": "danger", "message": "An error occurred while deleting the service"}), 500

@app.route('/customer/profile', methods=['GET', 'POST'])
@jwt_required()
def customer_profile():
    if get_jwt().get('role') != 'customer':
        return jsonify({"message": "Not a Customer!", "category": "danger"}), 401
    
    user_id = get_jwt().get('user_id')
    customer = CustomerProfile.query.filter_by(user_id=user_id).first()
    
    if request.method == 'GET':
        return jsonify({
            "user_id": user_id,
            "username": User.query.get(user_id).username,
            "full_name": customer.full_name if customer else "",
            "address": customer.address if customer else "",
            "pin_code": customer.pin_code if customer else ""
        }), 200
    
    data = request.get_json()
    if not all(data.get(field) for field in ["full_name", "address", "pin_code"]):
        return jsonify({"message": "Missing required fields: full_name, address, or pin_code.", "category": "danger"}), 400
    
    try:
        if customer:
            for field in ["full_name", "address", "pin_code"]:
                setattr(customer, field, data[field])
        else:
            db.session.add(CustomerProfile(user_id=user_id, **data))
        
        db.session.commit()
        return jsonify({"message": "Customer Profile updated successfully!", "category": "success"}), 200
    except Exception:
        db.session.rollback()
        return jsonify({"category": "danger", "message": "An error occurred while updating the profile"}), 500

@app.route('/customer/dashboard', methods=['GET', 'POST'])
@jwt_required()
def customer_dashboard():
    if get_jwt().get('role') != 'customer':
        return jsonify({"message": "Not a Customer!", "category": "danger"}), 401
    
    user_id = get_jwt().get('user_id')
    service_type = request.args.get("service_type")
    services = Service.query.filter_by(service_type=service_type).all() if service_type else []
    
    service_requests = ServiceRequest.query.filter_by(customer_id=user_id).all()
    professional_profiles = ProfessionalProfile.query.all()
    
    prof_dict = {prof.user_id: prof.as_dict() for prof in professional_profiles}
    service_dict = {service.id: service.as_dict() for service in Service.query.all()}
    
    return jsonify({
        "services": [service.as_dict() for service in services],
        "service_requests": [req.as_dict() for req in service_requests],
        "prof_dict": prof_dict,
        "service_dict": service_dict
    }), 200

@app.route('/customer/search', methods=['GET', 'POST'])
@jwt_required()
def customer_search():
    if get_jwt().get('role') != 'customer':
        return jsonify({"message": "Not a Customer!", "category": "danger"}), 401
    
    data = request.get_json()
    search_term = data.get('search_text', '').strip()
    
    if not search_term:
        return jsonify({"message": "Search term is required.", "category": "danger"}), 400
    
    service_professional = ProfessionalProfile.query.join(
        Service, ProfessionalProfile.service_type == Service.id
    ).filter(
        or_(
            ProfessionalProfile.address.ilike(f"%{search_term}%"),
            ProfessionalProfile.pin_code.ilike(f"%{search_term}%"),
            Service.name.ilike(f"%{search_term}%")
        )
    ).with_entities(
        ProfessionalProfile.pin_code,
        ProfessionalProfile.address,
        Service.name,
        Service.description,
        Service.price
    ).all()
    
    if not service_professional:
        return jsonify({"message": "No results found for your search.", "category": "danger"}), 400
    
    return jsonify({
        "category": "success",
        "message": "Search completed successfully",
        "data": {
            "service_professional": [
                {
                    "pin_code": row[0],
                    "address": row[1],
                    "service_name": row[2],
                    "service_description": row[3],
                    "service_price": row[4]
                } for row in service_professional
            ]
        }
    }), 200

@app.route('/customer/create_service_request/<int:service_id>', methods=['GET', 'POST'])
@jwt_required()
def create_service_request(service_id):
    claims = get_jwt()
    if claims.get('role') != 'customer':
        return jsonify({"message": "Not a Customer!", "category": "danger"}), 401
    
    customer_id = claims['user_id']
    professional = ProfessionalProfile.query.filter_by(service_type=service_id).first()
    
    if not professional:
        return jsonify({"message": "No professional offering this service yet!", "category": "danger"}), 401
    
    user = User.query.get(professional.user_id)
    if not user or not user.approve or user.blocked:
        return jsonify({"message": "Professional is not available for this service!", "category": "danger"}), 401
    
    existing_request = ServiceRequest.query.filter_by(
        professional_id=professional.user_id, service_id=service_id
    ).order_by(desc(ServiceRequest.date_of_request)).first()
    
    if existing_request and existing_request.service_status in ['requested', 'accepted']:
        return jsonify({"message": "Service request already exists!", "category": "danger"}), 401
    
    service_request = ServiceRequest(
        service_id=service_id, customer_id=customer_id,
        professional_id=professional.user_id, service_status='requested'
    )
    
    db.session.add(service_request)
    db.session.commit()
    
    return jsonify({"message": "Service request created successfully!", "category": "success"}), 200


@app.route('/customer/close_service_request/<int:request_id>', methods=['GET', 'PUT'])
@jwt_required()
def close_service_request(request_id):
    if get_jwt().get('role') != 'customer':
        return jsonify({"message": "Not a Customer!", "category": "danger"}), 401
    
    service_request = ServiceRequest.query.get_or_404(request_id)
    professional = ProfessionalProfile.query.get(service_request.professional_id)
    service = Service.query.get(service_request.service_id)
    
    if request.method == 'GET':
        return jsonify({
            "request_id": service_request.id,
            "service_name": service.name,
            "service_description": service.description,
            "full_name": professional.full_name
        }), 200
    
    data = request.get_json()
    service_request.service_status = 'completed'
    service_request.date_of_completion = db.func.current_timestamp()
    service_request.remarks = data.get('remarks', '')
    
    if 'rating' in data:
        professional.reviews = (float(data['rating']) + professional.reviews) / 2
    
    db.session.commit()
    
    return jsonify({"message": "Service request closed successfully!", "category": "success"}), 200
@app.route('/professional/profile', methods=['GET', 'POST'])
@jwt_required()
def professional_profile():
    if get_jwt().get('role') != 'professional':
        return jsonify({"message": "Not a Professional!", "category": "danger"}), 401
    
    user_id = get_jwt()['user_id']
    professional = ProfessionalProfile.query.filter_by(user_id=user_id).first()
    services = [{"id": service.id, "name": service.name} for service in Service.query.all()]
    
    if request.method == 'GET':
        profile_data = {
            "user_id": user_id,
            "username": User.query.get(user_id).username,
            "full_name": professional.full_name if professional else "",
            "service_type": Service.query.get(professional.service_type).name if professional else "",
            "experience": professional.experience if professional else "",
            "address": professional.address if professional else "",
            "pin_code": professional.pin_code if professional else "",
            "filename": professional.filename if professional else "",
            "reviews": professional.reviews if professional else 0
        }
        return jsonify({"profile": profile_data, "services": services}), 200
    
    data = request.form
    required_fields = {"full_name", "service_type", "experience", "address", "pin_code"}
    if not required_fields.issubset(data):
        missing_fields = required_fields - data.keys()
        return jsonify({"message": f"Missing required fields: {', '.join(missing_fields)}.", "category": "danger"}), 400
    
    filename = professional.filename if professional else None
    if (file := request.files.get('file')) and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        os.makedirs(os.path.dirname(upload_path), exist_ok=True)
        file.save(upload_path)
    
    if professional:
        professional.full_name = data["full_name"]
        professional.service_type = data["service_type"]
        professional.experience = data["experience"]
        professional.address = data["address"]
        professional.pin_code = data["pin_code"]
        professional.filename = filename
    else:
        db.session.add(ProfessionalProfile(
            user_id=user_id,
            full_name=data["full_name"],
            service_type=data["service_type"],
            experience=data["experience"],
            address=data["address"],
            pin_code=data["pin_code"],
            filename=filename
        ))
    
    db.session.commit()
    return jsonify({"message": "Professional Profile updated successfully!", "category": "success"}), 200


@app.route('/professional/dashboard', methods=['GET', 'POST'])
@jwt_required()
def professional_dashboard():
    if get_jwt().get('role') != 'professional':
        return jsonify({"message": "Not a Professional!", "category": "danger"}), 401
    
    professional_id = get_jwt()['user_id']
    service_requests = ServiceRequest.query.filter_by(professional_id=professional_id, service_status='requested').all()
    closed_requests = ServiceRequest.query.filter(ServiceRequest.professional_id == professional_id, ServiceRequest.service_status != 'requested').all()
    
    service_dict = {service.id: service.as_dict() for service in Service.query.all()}
    cust_dict = {cust.user_id: cust.as_dict() for cust in CustomerProfile.query.all()}
    
    return jsonify(
        message="Professional dashboard data retrieved successfully.",
        category="success",
        service_requests=[req.as_dict() for req in service_requests],
        closed_requests=[req.as_dict() for req in closed_requests],
        service_dict=service_dict,
        cust_dict=cust_dict
    ), 200


@app.route('/professional/search', methods=['GET', 'POST'])
@jwt_required()
def professional_search():
    if get_jwt().get('role') != 'professional':
        return jsonify({"message": "Not a Professional!", "category": "danger"}), 401
    
    professional_id = get_jwt()['user_id']
    data = request.json
    search_type, search_term = data.get('search_type'), data.get('search_text', '').strip()
    
    cust_dict = {cust.user_id: cust for cust in CustomerProfile.query.all()}
    service_dict = {service.id: service for service in Service.query.all()}
    
    search_filters = {
        'date': ServiceRequest.date_of_request.ilike(f"%{search_term}%"),
        'location': CustomerProfile.address.ilike(f"%{search_term}%"),
        'pin': CustomerProfile.pin_code.ilike(f"%{search_term}%")
    }
    
    filter_condition = search_filters.get(search_type)
    if search_type in {'location', 'pin'}:
        service_requests = ServiceRequest.query.join(CustomerProfile).filter(filter_condition, ServiceRequest.professional_id == professional_id).all()
    else:
        service_requests = ServiceRequest.query.filter(filter_condition, ServiceRequest.professional_id == professional_id).all()
    
    if not service_requests:
        return jsonify({"message": "No results found for your search.", "category": "danger"}), 400
    
    response_data = [{
        "customer_name": cust_dict.get(req.customer_id, {}).get('full_name', 'Unknown'),
        "service_name": service_dict.get(req.service_id, {}).get('name', 'Unknown'),
        "service_description": service_dict.get(req.service_id, {}).get('description', 'Unknown'),
        "service_price": service_dict.get(req.service_id, {}).get('price', 'N/A'),
        "status": req.service_status,
        "start_date": req.date_of_request.strftime('%Y-%m-%d') if req.date_of_request else "N/A",
        "remarks": req.remarks or "No remarks"
    } for req in service_requests]
    
    return jsonify({"category": "success", "message": "Search completed successfully", "data": {"service_requests": response_data}}), 200


@app.route('/professional/update_request_status/<string:status>/<int:request_id>', methods=['PUT'])
@jwt_required()
def update_request_status(status, request_id):
    if get_jwt().get('role') != 'professional':
        return jsonify({"message": "Not a Professional!", "category": "danger"}), 401
    
    service_request = ServiceRequest.query.get_or_404(request_id)
    if status in {'accept', 'reject'}:
        service_request.service_status = 'accepted' if status == 'accept' else 'rejected'
        service_request.date_of_accept_reject = db.func.current_timestamp()
        db.session.commit()
        return jsonify({"message": "Service request updated successfully!", "category": "success"}), 200
    
    return jsonify({"message": "Invalid status provided!", "category": "danger"}), 400


# Define an API endpoint to return the reviews data
@app.route('/admin/summary/reviews', methods=['GET'])
@jwt_required()
@cache.cached()
def get_reviews():
    if get_jwt().get('role') != 'admin':
        return jsonify({"message": "Not an Admin!", "category": "danger"}), 401
    
    reviews_data = [
        {"full_name": full_name, "reviews": reviews}
        for full_name, reviews in ProfessionalProfile.query.with_entities(ProfessionalProfile.full_name, ProfessionalProfile.reviews).all()
    ]
    
    return jsonify(reviews_data), 200


@app.route('/admin/summary/service_requests', methods=['GET'])
@jwt_required()
@cache.cached()
def get_service_requests():
    if get_jwt().get('role') != 'admin':
        return jsonify({"message": "Not an Admin!", "category": "danger"}), 401

    service_requests = db.session.query(
        func.date(ServiceRequest.date_of_completion),
        func.count(ServiceRequest.id)
    ).filter(ServiceRequest.date_of_completion.isnot(None)).group_by(
        func.date(ServiceRequest.date_of_completion)
    ).all()

    return jsonify([{"date": str(date), "count": count} for date, count in service_requests]), 200


@app.route('/customer/summary/service_requests/<int:customer_id>', methods=['GET'])
@jwt_required()
@cache.memoize()
def get_service_requests_customer(customer_id):
  claims = get_jwt()
  if claims['role'] != 'customer':
    return jsonify({"message": "Not a Customer!", "category": "danger"}), 401
  if claims['user_id'] != customer_id:
    return jsonify({"message": "Unauthorized access. Access to own data only.", "category": "danger"}), 401
  service_requests_customer = (db.session.query(func.date(ServiceRequest.date_of_completion), func.count(ServiceRequest.id)).filter(ServiceRequest.date_of_completion!=None,ServiceRequest.customer_id==customer_id).group_by(func.date(ServiceRequest.date_of_completion)).all())
  datewise_requests =[{"date": str(sr[0]), "count": sr[1]} for sr in service_requests_customer]   
  return jsonify(datewise_requests)

@app.route('/professional/summary/reviews/<int:professional_id>', methods=['GET'])
@jwt_required()
@cache.memoize()
def get_reviews_professional(professional_id):
  claims = get_jwt()
  if claims['role'] != 'professional':
    return jsonify({"message": "Not a Professional!", "category": "danger"}), 401
  if claims['user_id'] != professional_id:
    return jsonify({"message": "Unauthorized access. Access to own data only.", "category": "danger"}), 401
  professionals = ProfessionalProfile.query.with_entities(ProfessionalProfile.full_name,ProfessionalProfile.reviews).filter(ProfessionalProfile.user_id==professional_id).all()
  reviews_data = [{"full_name": p.full_name, "reviews": p.reviews} for p in professionals]
  return jsonify(reviews_data)

@app.route('/professional/summary/service_requests/<int:professional_id>', methods=['GET'])
@jwt_required()
@cache.memoize()
def get_service_requests_professional(professional_id):
  claims = get_jwt()
  if claims['role'] != 'professional':
    return jsonify({"message": "Not a Professional!", "category": "danger"}), 401
  if claims['user_id'] != professional_id:
    return jsonify({"message": "Unauthorized access. Access to own data only.", "category": "danger"}), 401
    
  service_requests = (db.session.query(func.date(ServiceRequest.date_of_completion), func.count(ServiceRequest.id)).join(ProfessionalProfile,ServiceRequest.professional_id==ProfessionalProfile.user_id).filter(ServiceRequest.date_of_completion!=None,ProfessionalProfile.user_id==professional_id).group_by(func.date(ServiceRequest.date_of_completion)).all())
  datewise_requests =[{"date": str(sr[0]), "count": sr[1]} for sr in service_requests]   
  return jsonify(datewise_requests)

if __name__ == '__main__':
    app.run(debug=True)