import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import Image from './Image';

class Images extends Component {
	state = {
		images: [],
		count: 30,
		start: 1
	};

	componentDidMount() {
		const { count, start } = this.state;

		axios.get(`/api/photos?start=${start}&count=${count}`).then(res =>
			this.setState({
				images: res.data
			})
		);
	}

	fetchImages = () => {
		this.setState(prevState => ({
			start: prevState.start + this.state.count
		}));

		axios
			.get(`/api/photos?start=${this.state.start}&count=${this.state.count}`)
			.then(res =>
				this.setState({
					images: [...this.state.images, ...res.data]
					// images: this.state.images.concat(res.data)
				})
			);
	};

	render() {
		console.log(this.state);
		return (
			<InfiniteScroll
				dataLength={this.state.images.length}
				next={this.fetchImages}
				hasMore={true}
				loader={<h4>Loading..</h4>}>
				{this.state.images.map(image => (
					<Image key={image.id} image={image} />
				))}
			</InfiniteScroll>
		);
	}
}
export default Images;
