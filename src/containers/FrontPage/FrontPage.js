import React, { Component } from 'react';
import API from '../../utils/API';
import './FrontPage.css';
import ImageTableView from '../../components/ImageTableView/ImageTableView';
import FavoritePicks from '../../components/FavoritePicks/FavoritePicks';
import ShowServerError from '../../components/Alert/ServerError';

API.configure();

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      breeds: [],
      selected_breed: 0,
      favoriteImage: false,
      favedImages: [],
      url: API.configure(),
      serverError: null
    };
  }

  getBreeds = () => {
    API.getBreeds()
      .then(res => this.setState({ breeds: res.data }))
      .catch(err => console.log(err));
  };

  getCatsImagesByBreed = (breed_id, amount) => {
    API.getCatsImagesByBreed(breed_id, amount)
      .then(res => this.setState({ images: res.data }))
      .catch(err => console.log(err));
  };

  favoriteCatsClickHandler = image => {
    this.setState({ favoriteImage: true });
    this.setState({ favedImages: [image, ...this.state.favedImages] });
  };

  onBreedSelectChange = e => {
    let selectedBreed = e.target.value;
    this.setState({ selected_breed: selectedBreed });
    this.getCatsImagesByBreed(selectedBreed, 5);
  };

  componentDidMount = () => {
    this.getBreeds();
  };

  render() {
    let favedItems;
    if (this.state.favoriteImage) {
      favedItems = this.state.favedImages.map(fav => {
        return (
          <FavoritePicks>
            <ul>
              <img className='CatImageFav' key={fav.id} alt='' src={fav.url} />
            </ul>
          </FavoritePicks>
        );
      });
    }

    return (
      <div>
        {this.state.serverError && (
          <ShowServerError error={this.state.serverError} />
        )}
        <h3>Select a Cat Breed</h3>
        <select
          value={this.state.selected_breed}
          onChange={this.onBreedSelectChange}>
          {this.state.breeds.map(breed => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
        <div className='Main'>
          <div className='Box-field'>
            {this.state.images.map(image => (
              <ImageTableView>
                <img
                  className='CatImage'
                  key={image.id}
                  alt=''
                  src={image.url}
                />
                <button
                  className='Button'
                  onClick={() => this.favoriteCatsClickHandler(image)}>
                  Add to Favorites
                </button>
              </ImageTableView>
            ))}
          </div>
          <div className='Box-field'>{favedItems}</div>
        </div>
      </div>
    );
  }
}

export default FrontPage;
