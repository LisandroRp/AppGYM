import { Component } from 'react';
import { withNavigation } from 'react-navigation';


class ExportadorEjercicios extends Component {

    queMusculo(nombre) {
        switch (nombre) {

            case "Abdominales":

                return require('./Ejercicios/ABS.png')

            case "Espalda":

                return require('./Ejercicios/ESPALDA.png')

            case "Hombros":

                return require('./Ejercicios/HOMBROS.png')

            case "Biceps":

                return require('./Ejercicios/BICEPS.png')

            case "Triceps":

                return require('./Ejercicios/TRICEPS.png')

            case "Pecho":

                return require('./Ejercicios/PECHO.png')

            case "Piernas":

                return require('./Ejercicios/PIERNAS.png')

            case "Cardio":

                return require('./Ejercicios/CARDIO.png')
        }
    }
    Pecho(){
        return require('./Ejercicios/PECHO.png')
    }
    Espalda(){
        return require('./Ejercicios/ESPALDA.png')
    }
    Hombros(){
        return require('./Ejercicios/HOMBROS.png')
    }
    Piernas(){
        return require('./Ejercicios/PIERNAS.png')
    }
    Bicep(){
        return require('./Ejercicios/BICEPS.png')
    }
    Triceps(){
        return require('./Ejercicios/TRICEPS.png')
    }
    Abs(){
        return require('./Ejercicios/ABS.png')
    }
    Cardio(){
        return require('./Ejercicios/CARDIO.png')
    }
}
export default new ExportadorEjercicios();