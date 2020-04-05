import { Component } from 'react';
import { withNavigation } from 'react-navigation';


class ExportadorMenus extends Component {

    EncontrarMenu(nombre) {
        switch (nombre) {

        }
    }
    Musculacion(){
        return require('./Menus/MUSCULACION.png')
    }
    Aerobico(){
        return require('./Menus/AEROBICO.png')
    }
    Ejercicios(){
        return require('./Menus/EJERCICIOS.png')
    }
    Propias(){
        return require('./Menus/PROPIAS.png')
    }
    Rutinas(){
        return require('./Menus/RUTINAS.png')
    }
    Suplementacion(){
        return require('./Menus/SUPLEMENTACION.png')
    }
}
export default new ExportadorMenus();