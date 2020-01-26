import React, { Component } from 'react';
import './App.css';
import Searcher from './searcher.js'
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.performSearch()
  }
  performSearch(searchTerm) {
    console.log('Perform Search')
    const urlString = '/* paste your api here */' + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log('Fetched data successfully')
        const results = searchResults.results
        
        
        var searchers = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          console.log(movie.title)
          const searcher = <Searcher key={movie.id} movie={movie}/>
          searchers.push(searcher)
        })
        this.setState({rows: searchers})
      },
      error: (xhr, status, err) => {
        console.error('Failed to fetched data')
      }
    })

  }
  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render () {
    return (
      <div class="App">
        
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <h1>Movie Searcher</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <input className="" style={{
          fontSize: 24,
          display: 'block',
          width: '100%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 25,
          overflow: hidden
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter the Movie Name"/>

        {this.state.rows}
      </div>
    );
  }
}
export default App;
