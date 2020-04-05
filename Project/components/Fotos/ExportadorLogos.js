import { Component } from 'react';


class ExportadorLogos extends Component {

    traerLogo(musculo) {
        switch (musculo) {

            case "Pecho":

                return require('./Logos/Logo_Pecho.png');

            case "Abdominales":

                return require('./Logos/Logo_Abs.png');

            case "Espalda":

                return require('./Logos/Logo_Espalda.png');

            case "Hombros":

                return require('./Logos/Logo_Hombros.png');

            case "Bicep":

                return require('./Logos/Logo_Bicep.png');

            case "Tricep":

                return require('./Logos/Logo_Bicep.png');

            case "Pecho":

                return require('./Logos/Logo_Pecho.png');

            case "Piernas":

                return require('./Logos/Logo_Piernas.png');

            case "Cardio":

                return require('./Logos/Logo_Cardio.png');

        }
    }

    traerEstrella(favorito){
        if (favorito){
            return require('./Logos/Star_Llena.png')
        }else{
            return require('./Logos/Star_Borde.png')
        }
    }

}
export default new ExportadorLogos();