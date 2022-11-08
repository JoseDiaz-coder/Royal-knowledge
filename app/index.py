from  flask import (
    Blueprint, render_template, redirect
)

bp = Blueprint('index', __name__, url_prefix='/')

@bp.route('/')
def main_index():
    return render_template('index/index.html')

@bp.route('/quienes-somos')
def about():
    return render_template('index/about.html')

@bp.route('/Nuestros-programas')
def content():
    return render_template('index/content.html')
