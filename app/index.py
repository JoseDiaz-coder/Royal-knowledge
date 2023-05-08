from  flask import (
    Blueprint, render_template, redirect, request, flash, current_app
)
from flask_mail import Mail, Message
import smtplib

from app.auth import login_required

bp = Blueprint('index', __name__, url_prefix='/')

@bp.route('/')
def main_index():
    return render_template('index/index.html')

@bp.route('/quienes-somos')
def about():
    return render_template('index/about.html')

@bp.route('/Nuestros-programas')
@login_required
def home():
    return render_template('index/home.html')


@bp.route('/contacto',methods=['GET','POST'])
@login_required
def contact():
    if request.method == 'POST':
        email = request.form['email']
        name = request.form['name']
        messg = request.form['message']
        error = None
        message = "Hemos recibido tu correo, nos pondremos en contacto contigo lo mas pronto posible"

        if not email or not name or not messg:
            error = "Todos los campos son requeridos"

        if error is None:
            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()
            email_user = current_app.config['MAIL_USERNAME']
            password = current_app.config['MAIL_PASSWORD']
            server.login(email_user,password)
            server.sendmail(email_user, email, message)
            server.sendmail(email, email_user, messg)
            error = "Mensaje enviado"

        flash(error,"message")
    return render_template('index/contact.html')

@bp.route('/politicas-de-privacidad')
@login_required
def policies():
    return render_template('index/politicas.html')


