import React, { Component } from 'react';
import bgmasthead from '../images/bgmasthead.jpg';


export default class WelcomePage extends Component {

  render()
  {
      let style = {textAlign: "center", color:"grey"};
      let sectionStyle = {
          width: "100%",
          height: "250px",
          backgroundPosition: "center",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${bgmasthead})`
      };
    return (<section style={sectionStyle} >
            <h1 style={style}>Create your own financial cosmos</h1>
        </section>
    );
  }
}