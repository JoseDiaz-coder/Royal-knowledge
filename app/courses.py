from flask import (
    Blueprint, render_template, redirect
)

from app.auth import login_required

bp = Blueprint('courses', __name__, url_prefix='/cursos')

@bp.route('/catalogo')
@login_required
def catalog():
    return render_template('courses/catalog.html')

@bp.route('/bases-de-datos')
@login_required
def db_index():
    return render_template('courses/dbIndex.html')

@bp.route('/networking-basico')
@login_required
def netw_index():
    return render_template('courses/netwIndex.html')

@bp.route('/introduccion-a-la-programacion')
@login_required
def progr_index():
    return render_template('courses/progrIndex.html')
