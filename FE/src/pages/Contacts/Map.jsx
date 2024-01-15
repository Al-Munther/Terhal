import React, { Component } from 'react';

class MapCard extends Component { 
  render() {
    let mapUrl = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2182.301915123972!2d60.648092876924096!3d56.84076497350625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43c16c25f7a0da8d%3A0x55656b82f868ce20!2sUlitsa%20Mira%2C%2032%2C%20Yekaterinburg%2C%20Sverdlovskaya%20oblast&#39;%2C%20620078!5e0!3m2!1sen!2sru!4v1684149540867!5m2!1sen!2sru" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    
    return (
      <div
      dangerouslySetInnerHTML={{__html: mapUrl}}
    />
    );
  }
}

export default MapCard;

