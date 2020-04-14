import { Component } from 'react';
import { withNavigation } from 'react-navigation';


class ExportadorEjercicios extends Component {

    queSuplementacion(tipo) {
        switch (tipo) {

            case "Aminoacidos":

                return require('./Suplementacion/AMINOACIDOS.png')

            case "Creatina":

                return require('./Suplementacion/CREATINA.png')

            case "Ganador":

                return require('./Suplementacion/GANADOR.png')

            case "Multivitaminico":

                return require('./Suplementacion/MULTIVITAMINICO.png')

            case "Proteina":

                return require('./Suplementacion/PROTEINA.png')

            case "Quemador":

                return require('./Suplementacion/QUEMADOR.png')

        }
    }
    aminoacidos() {
        return require('./Suplementacion/AMINOACIDOS.png')
    }
    creatina() {
        return require('./Suplementacion/CREATINA.png')
    }
    ganador() {
        return require('./Suplementacion/GANADOR.png')
    }
    multivitaminico() {
        return require('./Suplementacion/MULTIVITAMINICO.png')
    }
    proteina() {
        return require('./Suplementacion/PROTEINA.png')
    }
    quemador() {
        return require('./Suplementacion/QUEMADOR.png')
    }
}
export default new ExportadorEjercicios();