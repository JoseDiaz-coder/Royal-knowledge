from app.auth import login_required
from flask import (
    Blueprint, render_template, redirect
)

bp = Blueprint('quiz', __name__, url_prefix='/quiz')


@bp.route('/index')
@login_required
def index():
     return render_template('quiz/index.html')

@bp.route('/quiz-programacion-seccion1')
@login_required
def programacion():
    return render_template('quiz/progrQuiz.html')

@bp.route('/quiz-programacion-seccion2')
@login_required
def programacion_s2():
    return render_template('quiz/prog-seccion2.html')

@bp.route('/quiz-programacion-seccion3')
@login_required
def programacion_s3():
    return render_template('quiz/prog-seccion3.html')

@bp.route('/quiz-programacion-seccion4')
@login_required
def programacion_s4():
    return render_template('quiz/prog-seccion4.html')

@bp.route('/quiz-base-de-datos-seccion1')
@login_required
def db():
    return render_template('quiz/dbQuiz.html')

@bp.route('/quiz-base-de-datos-seccion2')
@login_required
def dbSeccion2():
    return render_template('quiz/DbQuizS2.html')

@bp.route('/quiz-base-de-datos-seccion2')
@login_required
def dbSeccion3():
    return render_template('quiz/db-seccion3.html')

@bp.route('/quiz-base-de-datos-seccion4')
@login_required
def dbSeccion4():
    return render_template('quiz/db-seccion4.html')

@bp.route('/quiz-networking-seccion1')
@login_required
def net_cap1():
    return render_template('quiz/net-cap1.html')

@bp.route('/quiz-networking-seccion2')
@login_required
def net_cap2():
    return render_template('quiz/net-cap2.html')

@bp.route('/quiz-networking-seccion3')
@login_required
def net_cap3():
    return render_template('quiz/net-cap3.html')

@bp.route('/quiz-networking-seccion4')
@login_required
def net_cap4():
    return render_template('quiz/net-cap4.html')

@bp.route('/quiz-networking-seccion5')
@login_required
def net_cap5():
    return render_template('quiz/net-cap5.html')

@bp.route('/quiz-networking-seccion6')
@login_required
def net_cap6():
    return render_template('quiz/net-cap6.html')
