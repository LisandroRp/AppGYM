import { Component } from 'react';
import { withNavigation } from 'react-navigation';


class ExportadorCreadores extends Component {

    queImagen(id_creador) {
        switch (id_creador) {

            case 0:

                return require('../../assets/Logo.png')

            case 1:

                return require('../../assets/Logo.png')

            case 2:

                return require('./Imagenes/InvaFitness.jpg')
        }
    }
    queImagenEspecifica(id_creador) {
        switch (id_creador) {

            case 0:

                return require('../../assets/Logo_Solo.png')

            case 1:

                return require('../../assets/Logo_Solo.png')

            case 2:

                return require('./Imagenes/InvaFitness_Solo.png')
        }
    }
    queLink(id_creador){
        switch (id_creador) {

            case 1:

                return "https://www.instagram.com/morganfitnesspartner/"

            case 2:

                return "https://www.instagram.com/invafitness/"
        }
    }
}
export default new ExportadorCreadores();