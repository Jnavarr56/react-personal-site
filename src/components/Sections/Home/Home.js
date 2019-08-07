import React from 'react';
import Translateable from '../../Translateable/Translateable';
import particles from './ParticleConfig';
import IconLinks from './IconLinks/IconLinks';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.text = {
      subtitle: {
        english: 'Full Stack Developer',
        español: 'Desarrollador Full Stack'
      }
    };

    this.particleContainer = React.createRef();
  }

  componentDidMount = () => {
    window.particlesJS('home-particles', particles);
  };

  render = () => {
    console.log(process.env);

    const subtitle = this.text.subtitle[this.props.language];

    return (
      <div className="h-full w-full flex justify-center items-center">
        <div
          id="home-particles"
          className="h-full w-full absolute top-0 right-0"
        ></div>
        <div className="z-50 bg-white-opacity-75">
          <h1 className="text-black text-center text-2xl sm:text-6xl font-primary">
            Jorge Andrés Navarro
          </h1>
          <p className="text-black text-center text-xl sm:text-4xl tracking-widest uppercase">
            <Translateable text={subtitle} />
          </p>
        </div>
        <IconLinks />
      </div>
    );
  };
}
