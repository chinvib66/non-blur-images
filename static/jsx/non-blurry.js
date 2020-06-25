class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				threshold: 100.0,
			},
			imagePreviewUrl: null,
			response: null,
		};
	}

	previewImage = e => {
		var reader = new FileReader();
		reader.onload = e => {
			this.setState({ ...this.state, imagePreviewUrl: e.target.result });
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	onFileChange = e => {
		this.previewImage(e);
		this.setState({
			...this.state,
			form: { ...this.state.form },
			file: e.target.files[0],
		});
	};

	uploadSingleImage = e => {
		const formData = new FormData();
		formData.append("threshold", Number(this.state.form.threshold));
		formData.append("file", this.state.file);
		axios
			.post("/non-blurry-upload-single-image", formData)
			.then(res => {
				console.log(res.data);
				this.setState({
					...this.state,
					response: { ...res.data },
				});
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<React.Fragment>
				<div
					className="page-heading"
					style={{
						textAlign: "center",
						fontSize: 45,
						padding: 60,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Non Blur Images only!
				</div>
				<div className="row" style={{ minHeight: 512, alignItems: "center" }}>
					{!this.state.response && (
						<form
							className="col sm-12 md-6"
							onSubmit={e => {
								e.preventDefault();
								this.uploadSingleImage();
							}}
						>
							<div className="form-group">
								<label>Select Image</label>
								<input name="image" type="file" onChange={this.onFileChange} />
							</div>
							<div className="form-group">
								<label>Threshold</label>
								<input
									type="text"
									name="threshold"
									value={this.state.form.threshold}
									onChange={e => {
										this.setState({
											...this.state,
											form: {
												...this.state.form,
												threshold: e.target.value,
											},
										});
									}}
								/>
							</div>
							<div>
								<button>Submit</button>
							</div>
						</form>
					)}
					{this.state.response && (
						<div className="col sm-12 md-6">
							<p style={{ fontSize: 24 }}>
								{this.state.response.isBlur ? (
									<span className="text-warning">Meh! Blurry Image</span>
								) : (
									<span className="text-success">Yay! Image is not Blurry</span>
								)}
							</p>
							<button
								onClick={e => {
									e.preventDefault();
									this.setState({
										response: null,
										imagePreviewUrl: null,
										form: { threshold: this.state.form.threshold },
									});
								}}
							>
								Upload another Image
							</button>
							<p style={{ marginTop: 30 }}>
								Expert Info: Variance of Laplacian of the image is <br />
								<span style={{ marginLeft: 20 }}>{this.state.response.var}</span>
							</p>
							<p style={{ marginLeft: 20 }}>
								Threshold Variance: {this.state.form.threshold}
							</p>
						</div>
					)}
					<div className="col sm-12 md-6" style={{ textAlign: "center" }}>
						{this.state.imagePreviewUrl && (
							<img
								src={this.state.imagePreviewUrl}
								style={{ maxWidth: 480, maxHeight: 480, alignItems: "center" }}
							/>
						)}
					</div>
				</div>
				<div className="row">
					<div className="title">
						{" "}
						Project: Detect Blurriness of Image (
						<a
							href="https://www.pyimagesearch.com/2015/09/07/blur-detection-with-opencv"
							target="_blank"
						>
							{" "}
							Link to Tutorial{" "}
						</a>
						)
					</div>
					<div className="description">
						<p>
							Method Used: Variation of Laplacian
							<br />A single channel of an image (presumably grayscale) is convolved with
							the Laplacian 3 x 3 kernel [[0,1,0],[1,-4,1],[0,1,0]]; and then the variance
							(i.e. standard deviation squared) of the response is calculated. If the
							variance falls below a pre-defined threshold, then the image is considered
							blurry; otherwise, the image is not blurry. The default variance provided is
							100.0
						</p>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const App = () => {
	return (
		<div className="container" style={{}}>
			<Page />
		</div>
	);
};

const domContainer = document.querySelector("#root");
ReactDOM.render(<App />, domContainer);
