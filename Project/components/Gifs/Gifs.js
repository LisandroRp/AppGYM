import { Component } from 'react';
import { withNavigation } from 'react-navigation';


class Gifs extends Component {

    EncontrarGifs(nombre) {
        switch (nombre) {

            case "Press de Banca":

                return (require('./ab.png'))
                break;

            default:
                return 'pito'
                break;
        }
    }
}
export default new Gifs();
