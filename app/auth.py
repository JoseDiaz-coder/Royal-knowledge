import functools
from flask import (
    Blueprint, flash, g, render_template, request, url_for, session, redirect

)
from werkzeug.security import check_password_hash, generate_password_hash
from app.db import get_db


bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = None
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        db, cursor = get_db()
        error = None
        cursor.execute(
            'SELECT id FROM user WHERE username = %s', (username,)
        )

        if not username:
            error = 'El nombre de usuario es requerido'
        if not password:
            error = 'La contraseña de usuario es requerida'
        elif cursor.fetchone() is not None:
            error = 'El nombre de usuario {} ya se encuentra registrado. '.format(username)

        if error is None and email is not None:
            cursor.execute(
                'INSERT INTO user (username,email, password) VALUES(%s, %s, %s)',
                (username,email, generate_password_hash(password))
            )

            db.commit()

            return redirect(url_for('auth.login'))

        if error is None and email is None:
            cursor.execute(
                'INSERT INTO user (username, password) VALUES(%s, %s)',
                (username, generate_password_hash(password))
            )

            db.commit()

            return redirect(url_for('auth.login'))

        flash(error)

    return render_template('auth/register.html')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = None
        username_email= request.form['login']
        password = request.form['password']
        db, cursor = get_db()
        error = None
        cursor.execute(
            'SELECT * FROM user WHERE username = %s OR email = %s ', (username_email,username_email)
        )
        user = cursor.fetchone()

        if user is None:
            error = 'Nombre de usuario o contraseña invalida'
        elif not  check_password_hash(user['password'], password):
            error = 'Nombre de usuario o contraseña invalida'
        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('index.home'))

        flash(error)

    return render_template('auth/login.html')

@bp.before_app_request
def load_logged_user():
    user_id = session.get('user_id')
    if user_id is None:
        g.user = None
    else:
        db, cursor = get_db()
        cursor.execute(
            'SELECT * FROM user WHERE id = %s ', (user_id,)
        )
        g.user = cursor.fetchone()

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))
        return view(**kwargs)

    return wrapped_view

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index.main_index'))
