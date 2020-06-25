import cv2


# @param image: path to image
# @param width: width in px (optional)
# @param height: height in px (optional)
# @param inter: interpolation (optional)
def resize_with_aspect_ratio(image, width=None, height=None, inter=cv2.INTER_AREA):
    dim = None
    # get image dimensions
    (h, w) = image.shape[:2]

    # Calculate width and height
    if width is None and height is None:
        return image
    if width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width, int(h * r))

    return cv2.resize(image, dim, interpolation=inter)


# @param image: a single channel image, such as a grayscale image
def variance_of_laplacian(image):
    # compute the Laplacian of the image and then return the focus
    # measure, which is simply the variance of the Laplacian
    return cv2.Laplacian(image, cv2.CV_64F).var()


def isBlur(imagePath, threshold=100.0):
    # Read image from imagePath
    image = cv2.imread(imagePath)
    image = resize_with_aspect_ratio(image, height=640)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    fm = variance_of_laplacian(gray)
    blur = False
    if fm < threshold:
        blur = True
    return blur, fm
