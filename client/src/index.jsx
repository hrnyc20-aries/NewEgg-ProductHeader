import React from 'react';
import ReactDOM from 'react-dom';
import ProductImage from './components/productImage';
import ProductHeaderInformation from './components/productHeaderInformation';
import ProductOptions from './components/productOptions';
import ProductFooterInformation from './components/productFooterInformation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// product id to pass down to child components
			productId: ''
		};
		this.getIdByUrl = this.getIdByUrl.bind(this);
	}
	componentDidMount() {
		// request product id from URL when componentDidMount()
		this.getIdByUrl();
		// GET request for productImages, productOptions, productHeaderInformation, productFooterInformation
		// productImages; mouseOverZoom(), image tiles w/ mouseOver()
		// productHeaderInformation; title, share button (w/ social media icons), star rating reviews, Q&A #
		// productOptions; product varying options
		// productFooterInformation; descriptions
	}

	// getItemByUrl, run on componentDidMount
	// use window.location TO product ID
	getIdByUrl() {
		let item = window.location.href.split('/')[3] || 60;
		this.setState({ productId: item });
	}

	render() {
		return (
			<div className="row">
				<div className="col-4">
					<ProductImage id={this.state.productId} />
				</div>

				<div className="col-5">
					<ProductHeaderInformation />
					<ProductOptions />
					<ProductFooterInformation />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('productDetails'));
