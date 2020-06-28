import { Component } from 'react';
import { withNavigation } from 'react-navigation';


class ExportadorEjercicios extends Component {

    queMusculo(id_musculo) {
        switch (id_musculo) {

            case 1:
                return require('./Ejercicios/PECHO.png')

            case 2:

                return require('./Ejercicios/ESPALDA.png')

            case 3:

                return require('./Ejercicios/HOMBROS.png')

            case 4:

                return require('./Ejercicios/PIERNAS.png')

            case 5:

                return require('./Ejercicios/BICEPS.png')

            case 6:

                return require('./Ejercicios/TRICEPS.png')

            case 7:

                return require('./Ejercicios/ABS.png')

            case 8:

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