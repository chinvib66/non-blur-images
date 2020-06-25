from imutils import paths
from flask import Flask, request, jsonify, render_template
import os
from werkzeug.utils import secure_filename
from non_blurry import isBlur
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 16*1024*1024


def save_to_upload(f):
    filepath = f'{BASE_DIR}\\uploads\\{f.filename}'
    f.save(filepath)
    return filepath


def clear_upload(filepath):
    try:
        os.remove(filepath)
    except Exception as e:
        pass


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/non-blurry")
def non_blurry():
    return render_template('non-blurry.html')


@app.route("/non-blurry-upload-single-image", methods=['POST'])
def upload_single_image():
    f = request.files['file']
    filepath = save_to_upload(f)
    threshold = float(request.form.get('threshold'))
    blur, fm = isBlur(filepath, threshold)
    print(blur)
    clear_upload(filepath)
    return jsonify({"isBlur": blur, 'threshold': threshold, 'var': round(fm, 3)})


app.run(host='0.0.0.0', port=5001, debug=True)
