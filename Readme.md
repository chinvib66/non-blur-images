# Image Blur Detection

The project detects blur in image provided, using variance of laplacian of the single channel image. If variance is below a set threshold, then image is determined to be blurry

## Installation

Clone the repo

```
> git clone https://github.com/chinvib66/non-blur-images.git
> cd non-blur-images
```

Install pipenv, create virtual environment and install Python dependencies in virtual env

```
> pip install pipenv
> pipenv install
```

Install `babel` for jsx compilation, used for the frontend development

```
> npm i
```

Activate the virtual environment and launch the application

```
> pipenv shell
> python .\app.py
```

App runs at http://localhost:5001

For modifying the frontend, start the babel compiler using the `start-babel-watcher` script provided and then edit the in `static/jsx/non-blurry.js` in file.

> Note: Hard refresh (Ctrl + F5) the browser to see changes
