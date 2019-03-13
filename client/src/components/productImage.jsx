import React from 'react';
import axios from 'axios';
import { aws } from '../../config.js';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactImageMagnify from 'react-image-magnify';

class ProductImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// productId: 47,
			// logoImg: '',
			images: [],
			imgSource: {}
		};
		this.getImages = this.getImages.bind(this);
		this.imageSelector = this.imageSelector.bind(this);
		// this.getLogo = this.getLogo.bind(this);
	}

	componentDidMount() {
		// request images from database
		this.getImages();
		// this.getLogo();
	}

	// getLogo() {
	// 	const idtag = window.location.href.split('/')[3] || 60;
	// 	// console.log('idtag in image: ', idtag);
	// 	axios
	// 		// .get(`http://${aws}/api/items/${idtag}`)
	// 		.get(`http://localhost:3010/api/items/${idtag}`)
	// 		.then(({ data }) => {
	// 			console.log('data: in images for items logoimg', data.logooverlay);
	// 			this.setState({ logoImg: data.logooverlay });
	// 		})
	// 		.catch(err => console.error(err));
	// }

	getImages() {
		const idtag = window.location.href.split('/')[3] || 60;
		axios
			.get(`http://${aws}/api/images/${idtag}`)
			.then(({ data }) => {
				this.setState({ images: data, imgSource: data[0].imgsrc }); //configure data to be specifying what in data is images data.img
			})
			.catch(err => console.error(err));
	}

	imageSelector(selected, e) {
		this.setState({ imgSource: selected.imgsrc });
	}

	render() {
		return (
			<div className="col">
				<div className="row">
					<div className="col">
						<ReactImageMagnify
							className="primeImage"
							{...{
								smallImage: {
									src: `${this.state.imgSource}`,
									width: 470,
									height: 350
								},
								largeImage: {
									src: `${this.state.imgSource}`,
									width: 1024,
									height: 768,
									enlargedImagePortalId: '.target-zoom'
								}
							}}
						/>
					</div>
				</div>
				<div className="row imageTiles">
					{/* require css formatting to cluster tiles in center justified */}
					{this.state.images.map(image => (
						<div key={image.id}>
							<Image
								src={image.imgsrc}
								onClick={e => this.imageSelector(image, e)}
								thumbnail
								height="75px"
								width="60px"
								className="imageBox"
							/>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default ProductImage;
