import { Component } from 'react';


class ExportadorLogos extends Component {

    traerLogo(id_musculo) {
        switch (id_musculo) {

            case 1:

                return require('./Logos/Logo_Pecho.png');

            case 2:

                return require('./Logos/Logo_Espalda.png');

            case 3:

                return require('./Logos/Logo_Hombros.png');

            case 4:

                return require('./Logos/Logo_Piernas.png');

            case 5:

                return require('./Logos/Logo_Bicep.png');

            case 6:

                return require('./Logos/Logo_Tricep.png');

            case 7:

                return require('./Logos/Logo_Abs.png');
            case 8:

                return require('./Logos/Logo_Cardio.png');

        }
    }

    traerEstrella(favorito) {
        if (favorito) {
            return require('./Logos/Star_Llena.png')
        } else {
            return require('./Logos/Star_Borde.png')
        }
    }
    traerEstrellaBlanca(favorito) {
        if (favorito) {
            return require('./Logos/Star_Llena_Blanca.png')
        } else {
            return require('./Logos/Star_Borde_Blanca.png')
        }
    }
    traerInstagram() {
        return require("./Logos/Instagram.png")
    }
    traerSideMenu(menu) {
        console.log(menu)
        return require('./Logos/Star_Borde_Blanca.png')
    }

}
export default new ExportadorLogos();