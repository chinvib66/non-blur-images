var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_React$Component) {
	_inherits(Page, _React$Component);

	function Page(props) {
		_classCallCheck(this, Page);

		var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

		_this.previewImage = function (e) {
			var reader = new FileReader();
			reader.onload = function (e) {
				_this.setState(Object.assign({}, _this.state, { imagePreviewUrl: e.target.result }));
			};
			reader.readAsDataURL(e.target.files[0]);
		};

		_this.onFileChange = function (e) {
			_this.previewImage(e);
			_this.setState(Object.assign({}, _this.state, {
				form: Object.assign({}, _this.state.form),
				file: e.target.files[0]
			}));
		};

		_this.uploadSingleImage = function (e) {
			var formData = new FormData();
			formData.append("threshold", Number(_this.state.form.threshold));
			formData.append("file", _this.state.file);
			axios.post("/non-blurry-upload-single-image", formData).then(function (res) {
				console.log(res.data);
				_this.setState(Object.assign({}, _this.state, {
					response: Object.assign({}, res.data)
				}));
			}).catch(function (err) {
				return console.log(err);
			});
		};

		_this.state = {
			form: {
				threshold: 100.0
			},
			imagePreviewUrl: null,
			response: null
		};
		return _this;
	}

	_createClass(Page, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return React.createElement(
				React.Fragment,
				null,
				React.createElement(
					"div",
					{
						className: "page-heading",
						style: {
							textAlign: "center",
							fontSize: 45,
							padding: 60,
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						}
					},
					"Non Blur Images only!"
				),
				React.createElement(
					"div",
					{ className: "row", style: { minHeight: 512, alignItems: "center" } },
					!this.state.response && React.createElement(
						"form",
						{
							className: "col sm-12 md-6",
							onSubmit: function onSubmit(e) {
								e.preventDefault();
								_this2.uploadSingleImage();
							}
						},
						React.createElement(
							"div",
							{ className: "form-group" },
							React.createElement(
								"label",
								null,
								"Select Image"
							),
							React.createElement("input", { name: "image", type: "file", onChange: this.onFileChange })
						),
						React.createElement(
							"div",
							{ className: "form-group" },
							React.createElement(
								"label",
								null,
								"Threshold"
							),
							React.createElement("input", {
								type: "text",
								name: "threshold",
								value: this.state.form.threshold,
								onChange: function onChange(e) {
									_this2.setState(Object.assign({}, _this2.state, {
										form: Object.assign({}, _this2.state.form, {
											threshold: e.target.value
										})
									}));
								}
							})
						),
						React.createElement(
							"div",
							null,
							React.createElement(
								"button",
								null,
								"Submit"
							)
						)
					),
					this.state.response && React.createElement(
						"div",
						{ className: "col sm-12 md-6" },
						React.createElement(
							"p",
							{ style: { fontSize: 24 } },
							this.state.response.isBlur ? React.createElement(
								"span",
								{ className: "text-warning" },
								"Meh! Blurry Image"
							) : React.createElement(
								"span",
								{ className: "text-success" },
								"Yay! Image is not Blurry"
							)
						),
						React.createElement(
							"button",
							{
								onClick: function onClick(e) {
									e.preventDefault();
									_this2.setState({
										response: null,
										imagePreviewUrl: null,
										form: { threshold: _this2.state.form.threshold }
									});
								}
							},
							"Upload another Image"
						),
						React.createElement(
							"p",
							{ style: { marginTop: 30 } },
							"Expert Info: Variance of Laplacian of the image is ",
							React.createElement("br", null),
							React.createElement(
								"span",
								{ style: { marginLeft: 20 } },
								this.state.response.var
							)
						),
						React.createElement(
							"p",
							{ style: { marginLeft: 20 } },
							"Threshold Variance: ",
							this.state.form.threshold
						)
					),
					React.createElement(
						"div",
						{ className: "col sm-12 md-6", style: { textAlign: "center" } },
						this.state.imagePreviewUrl && React.createElement("img", {
							src: this.state.imagePreviewUrl,
							style: { maxWidth: 480, maxHeight: 480, alignItems: "center" }
						})
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "title" },
						" ",
						"Project: Detect Blurriness of Image (",
						React.createElement(
							"a",
							{
								href: "https://www.pyimagesearch.com/2015/09/07/blur-detection-with-opencv",
								target: "_blank"
							},
							" ",
							"Link to Tutorial",
							" "
						),
						")"
					),
					React.createElement(
						"div",
						{ className: "description" },
						React.createElement(
							"p",
							null,
							"Method Used: Variation of Laplacian",
							React.createElement("br", null),
							"A single channel of an image (presumably grayscale) is convolved with the Laplacian 3 x 3 kernel [[0,1,0],[1,-4,1],[0,1,0]]; and then the variance (i.e. standard deviation squared) of the response is calculated. If the variance falls below a pre-defined threshold, then the image is considered blurry; otherwise, the image is not blurry. The default variance provided is 100.0"
						)
					)
				)
			);
		}
	}]);

	return Page;
}(React.Component);

var App = function App() {
	return React.createElement(
		"div",
		{ className: "container", style: {} },
		React.createElement(Page, null)
	);
};

var domContainer = document.querySelector("#root");
ReactDOM.render(React.createElement(App, null), domContainer);