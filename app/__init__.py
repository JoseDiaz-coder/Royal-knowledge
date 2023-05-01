import os

from flask import Flask

def create_app():
    app = Flask(__name__)

    app.config.from_mapping(
        SECRET_KEY=os.environ.get('FROM_SECRET_KEY'),
        DATABASE_HOST=os.environ.get('FLASK_DATABASE_HOST'),
        DATABASE_PASSWORD=os.environ.get('FLASK_DATABASE_PASSWORD'),
        DATABASE_USER=os.environ.get('FLASK_DATABASE_USER'),
        DATABASE=os.environ.get('FLASK_DATABASE'),
        MAIL_SRVR = os.environ.get('MAIL_SERVER'),
        MAIL_PRT = os.environ.get('MAIL_PORT'),
        MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS'),
        MAIL_USR = os.environ.get('MAIL_USERNAME'),
        MAIL_PASS=os.environ.get('MAIL_PASSWORD')

    )

    from . import db

    db.init_app(app)

    from . import auth
    from . import index
    from . import courses
    from . import quiz

    app.register_blueprint(auth.bp)
    app.register_blueprint(index.bp)
    app.register_blueprint(courses.bp)
    app.register_blueprint(quiz.bp)

    return app

