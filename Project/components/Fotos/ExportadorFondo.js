import { Component } from 'react';

class ExportadorFondo extends Component {

    traerFondo() {
        return require('../../assets/Pared_Fondo.jpg')
    }
    traerFondoDrawer(){
        return require('../../assets/Pared_Fondo_Drawer.jpg')
    }
}
export default new ExportadorFondo();