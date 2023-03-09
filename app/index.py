from  flask import (
    Blueprint, render_template, redirect, request
)

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
        pass
    return render_template('index/contact.html')
