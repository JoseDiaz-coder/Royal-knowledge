from app.auth import login_required
from flask import (
    Blueprint, render_template, redirect
)

bp = Blueprint('quiz', __name__, url_prefix='/quiz')


@bp.route('/index')
@login_required
def index():
     return render_template('quiz/index.html')

@bp.route('/quiz-programacion')
@login_required
def programacion():
    return render_template('quiz/progrQuiz.html')
