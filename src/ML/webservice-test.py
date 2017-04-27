from flask import Flask, redirect, render_template, request, url_for
from MLEngineStub import MLEngine

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("listOfTuples.html")

@app.route("/results")
def result():
    if request.method == "POST":
        return "Hello!"
    else:
        return redirect(url_for("no"))

@app.route("/no")
def no():
    return "No!"


if __name__ == "__main__":
    app.run()
