import { Component } from 'react';
import base from '../GenerarBase';

const es = 1
const en = 2

class ExportadorFrases extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pedo: 0
        };
      }

    //**************************************** */
    //TEXTOS
    //**************************************** */
    ActualizandoBase(idioma) {
        switch (idioma) {

            case es:
                return "Actualizando la Base de Datos"
            case en:
                return "Updating the Database"
            default:
                return "Actualizando la Base de Datos"
        }
    }
    ActualizandoEjercicios(idioma) {
        switch (idioma) {

            case es:
                return "Actualizando Ejercicios"
            case en:
                return "Updating Exercises"
            default:
                return "Actualizando Ejercicios"
        }
    }
    ActualizandoEjercicio(idioma) {
        switch (idioma) {

            case es:
                return "Actualizando Ejercicio"
            case en:
                return "Updating Exercise"
            default:
                return "Actualizando Ejercicio"
        }
    }
    CreandoEjercicio(idioma) {
        switch (idioma) {

            case es:
                return "Creando Ejercicio"
            case en:
                return "Creating Exercise"
            default:
                return "Creando Ejercicio"
        }
    }
    BorrandoEjercicio(idioma) {
        switch (idioma) {

            case es:
                return "Borrando Ejercicio"
            case en:
                return "Erasing Exercise"
            default:
                return "Borranod Ejercicio"
        }
    }
    ActualizandoRutinas(idioma) {
        switch (idioma) {

            case es:
                return "Actualizando Rutinas"
            case en:
                return "Updating Routines"
            default:
                return "Actualizando Rutinas"
        }
    }
    ActualizandoRutina(idioma) {
        switch (idioma) {

            case es:
                return "Actualizando Rutina"
            case en:
                return "Updating Routine"
            default:
                return "Actualizando Rutina"
        }
    }
    CreandoRutina(idioma) {
        switch (idioma) {

            case es:
                return "Creando Rutina"
            case en:
                return "Creating Routine"
            default:
                return "Creando Rutina"
        }
    }
    BorrandoRutina(idioma) {
        switch (idioma) {

            case es:
                return "Borrando Rutina"
            case en:
                return "Erasing Routine"
            default:
                return "Borrando Rutina"
        }
    }
    CreandoPlan(idioma) {
        switch (idioma) {

            case es:
                return "Creando Plan"
            case en:
                return "Creating Plan"
            default:
                return "Creando Plan"
        }
    }
    ActualizandoPlan(idioma) {
        switch (idioma) {

            case es:
                return "Actualizando tu Plan"
            case en:
                return "Updating your Plan"
            default:
                return "Actualizando tu Plan"
        }
    }
    Actualizando(idioma) {
        switch (idioma) {

            case es:
                return "Actualizando App"
            case en:
                return "Updating App"
            default:
                return "Actualizando App"
        }
    }
    GuardandoConfiguracion(idioma) {
        switch (idioma) {

            case es:
                return "Guardando Configuraciones"
            case en:
                return "Saving Configuration"
            default:
                return "Guardando Configuraciones"
        }
    }
    DeslizarTraining(idioma) {
        switch (idioma) {

            case es:
                return "Desliza para crear tu plan de entrenamiento a medida"
            case en:
                return "Swipe to create your custom training plan"
            default:
                return "Desliza para crear tu plan de entrenamiento a medida"
        }
    }
    FichaTitulo(idioma) {
        switch (idioma) {

            case es:
                return "Ficha Personal" + "\n" + "y" + "\n" + "Objetivos a Alcanzar"
            case en:
                return "Personal Information" + "\n" + "and" + "\n" + "Goals to Achieve"
            default:
                return "Ficha Personal" + "\n" + "y" + "\n" + "Objetivos a Alcanzar"
        }
    }
    PlanTitulo(idioma) {
        switch (idioma) {

            case es:
                return "• Se le creará un plan de entrenamiento en base a los datos personales y objetivos señalados anteriormente." + '\n' + '\n' + "• Se incluirá un plan de alimentación y las rutinas que son mas útiles para el objetivo deseado." + '\n' + '\n' + "• Podrás cambiar tu ficha personal y objetivos en el momento que quieras accediendo en la parte de" + '\n' + '"Perfil"desde el SideMenu.'
            case en:
                return "• A training plan will be created based on the personal data and objectives indicated above." + '\n' + '\n' + "• A meal plan and routines that are most useful for the objective will be included " + '\n' + '\n' + "• You can change your personal profile and objectives at any time by accessing the " + '\n' + '"Profile" option of the SideMenu.'
            default:
                return "• Se le creará un plan de entrenamiento en base a los datos personales y objetivos señalados anteriormente." + '\n' + '\n' + "• Se incluirá un plan de alimentación y las rutinas que son mas útiles para el objetivo deseado." + '\n' + '\n' + "• Podrás cambiar tu ficha personal y objetivos en el momento que quieras accediendo en la parte de" + '\n' + '"Perfil"desde el SideMenu.'
        }
    }
    NoPlan(idioma) {
        switch (idioma) {

            case es:
                return 'Si desea crear su plan de entrenamiento solo debe completar la ficha técnica en la sección de "Cambiar Plan"'
            case en:
                return 'If you want to create your training plan you only need to complete the data sheet in the "Change Plan" section'
            default:
                return 'Si desea crear su plan de entrenamiento solo debe completar la ficha técnica en la sección de "Cambiar Plan"'
        }
    }
    Dia(idioma) {
        switch (idioma) {

            case es:
                return 'Día'
            case en:
                return 'Day'
            default:
                return 'Día'
        }
    }
    Dias(idioma) {
        switch (idioma) {

            case es:
                return 'Días'
            case en:
                return 'Days'
            default:
                return 'Días'
        }
    }
    Autor(idioma) {
        switch (idioma) {

            case es:
                return 'Autor'
            case en:
                return 'Author'
            default:
                return 'Autor'
        }
    }
    Series(idioma) {
        switch (idioma) {

            case es:
                return 'Series'
            case en:
                return 'Sets'
            default:
                return 'Series'
        }
    }
    Repeticiones(idioma) {
        switch (idioma) {

            case es:
                return 'Repeticiones'
            case en:
                return 'Reps'
            default:
                return 'Repeticiones'
        }
    }
    Tiempo(idioma) {
        switch (idioma) {

            case es:
                return 'Tiempo'
            case en:
                return 'Time'
            default:
                return 'Tiempo'
        }
    }
    //**************************************** */
    //PLAN
    //**************************************** */
    CaloriasNormal(idioma) {
        switch (idioma) {

            case es:
                return 'Calorías a consumir para mantener tu peso en base a la vida que llevas'
            case en:
                return 'Calories to consume to maintain your weight based on the life you lead'
            default:
                return 'Calorías a consumir para mantener tu peso en base a la vida que llevas'
        }
    }
    CaloriasAConsumir(idioma) {
        switch (idioma) {

            case es:
                return 'Calorías a consumir para cumplir con tu objetivo'
            case en:
                return 'Calories to consume to meet your goal'
            default:
                return 'Calorías a consumir para cumplir con tu objetivo'
        }
    }
    //NO Hay
    EjerciciosNo(idioma) {
        switch (idioma) {

            case es:
                return "Ups!" + '\n' + "No hay Ejercicios agregados a tu lista de favoritos"
            case en:
                return "Ups!" + '\n' + "There are no Exercises added to your favorites list"
            default:
                return "Ups!" + '\n' + "No hay Ejercicios agregados a tu lista de favoritos"
        }
    }
    RutinasNo(idioma) {
        switch (idioma) {

            case es:
                return "Ups!" + '\n' + "No hay Rutinas agregadas a tu lista de favoritos"
            case en:
                return "Ups!" + '\n' + "There are no Routines added to your favorites list"
            default:
                return "Ups!" + '\n' + "No hay Rutinas agregadas a tu lista de favoritos"
        }
    }
    RutinasPropiasNo(idioma) {
        switch (idioma) {

            case es:
                return "No haz creado ninguna Rutina"
            case en:
                return "You have not created any Routine"
            default:
                return "No haz creado ninguna Rutina"
        }
    }
    SuplementosNo(idioma) {
        switch (idioma) {

            case es:
                return "Ups!" + '\n' + "No hay Suplementos agregados a tu lista de favoritos"
            case en:
                return "Ups!" + '\n' + "There are no Supplements added to your favorites list"
            default:
                return "Ups!" + '\n' + "No hay Suplementos agregados a tu lista de favoritos"
        }
    }
    //**************************************** */
    //FIELDS
    //**************************************** */

    NivelActividad(idioma) {
        switch (idioma) {

            case es:
                return "Nivel de Actividad"
            case en:
                return "Activity level"
            default:
                return "Nivel de Actividad"
        }
    }
    NivelActividadOpciones(idioma, opcion) {
        switch (opcion) {

            case 1:
                switch (idioma) {

                    case es:
                        return "Casi Nulo (1 dia o menos)"
                    case en:
                        return "Next to Nothing (1 day or less)"
                    default:
                        return "Casi Nulo (1 dia o menos)"
                }
            case 2:
                switch (idioma) {

                    case es:
                        return "Ligero (2 a 3 dias)"
                    case en:
                        return "Slight (2 to 3 days)"
                    default:
                        return "Ligero (2 a 3 dias)"
                }
            case 3:
                switch (idioma) {

                    case es:
                        return "Moderado (4 a 5 dias)"
                    case en:
                        return "Moderate (4 to 5 days)"
                    default:
                        return "Moderado (4 a 5 dias)"
                }
            case 4:
                switch (idioma) {

                    case es:
                        return "Fuerte (5 a 7 dias)"
                    case en:
                        return "Strong (5 to 7 days)"
                    default:
                        return "Fuerte (5 a 7 dias)"
                }
            case 5:
                switch (idioma) {

                    case es:
                        return "Deportista (2 veces al dia)"
                    case en:
                        return "Athlete (twice a day)"
                    default:
                        return "Deportista (2 veces al dia)"
                }
        }
    }
    Genero(idioma) {
        switch (idioma) {

            case es:
                return "Genero"
            case en:
                return "Gender"
            default:
                return "Genero"
        }
    }
    GeneroOpciones(idioma, opcion) {
        switch (opcion) {

            case 1:
                switch (idioma) {

                    case es:
                        return "Masculino"
                    case en:
                        return "Male"
                    default:
                        return "Masculino"
                }
            case 2:
                switch (idioma) {

                    case es:
                        return "Femenino"
                    case en:
                        return "Female"
                    default:
                        return "Femenino"
                }
        }
    }
    ObjetivoDeseado(idioma) {
        switch (idioma) {

            case es:
                return "Objetivo Deseado"
            case en:
                return "Goals to Achieve"
            default:
                return "Objetivo Deseado"
        }
    }
    ObjetivoDeseadoOpciones(idioma, opcion) {
        switch (opcion) {

            case 1:
                switch (idioma) {

                    case es:
                        return "Ganar Masa Muscualar"
                    case en:
                        return "Gain Muscle Mass"
                    default:
                        return "Ganar Masa Muscualar"
                }
            case 2:
                switch (idioma) {

                    case es:
                        return "Perder Peso"
                    case en:
                        return "Lose Weight"
                    default:
                        return "Perder Peso"
                }
            case 3:
                switch (idioma) {

                    case es:
                        return "Ganar Resistencia"
                    case en:
                        return "Gain Physical Stamina"
                    default:
                        return "Ganar Resistencia"
                }
            case 4:
                switch (idioma) {

                    case es:
                        return "Definir"
                    case en:
                        return "Get Ripped"
                    default:
                        return "Definir"
                }
            case 5:
                switch (idioma) {

                    case es:
                        return "Mantener"
                    case en:
                        return "Maintain Body Weight"
                    default:
                        return "Mantener"
                }
        }
    }
    ExperienciaEntrenamiento(idioma) {
        switch (idioma) {

            case es:
                return "Experiencia en Entrenamiento"
            case en:
                return "Training Experience"
            default:
                return "Experiencia en Entrenamiento"
        }
    }
    ExperienciaEntrenamientoOpciones(idioma, opcion) {
        switch (opcion) {

            case 1:
                switch (idioma) {

                    case es:
                        return "Principiante"
                    case en:
                        return "Beginner"
                    default:
                        return "Principiante"
                }
            case 2:
                switch (idioma) {

                    case es:
                        return "Conocimiento Basico"
                    case en:
                        return "Basic Knowledge"
                    default:
                        return "Conocimiento Basico"
                }
            case 3:
                switch (idioma) {

                    case es:
                        return "Experimentado"
                    case en:
                        return "Experienced"
                    default:
                        return "Experimentado"
                }
        }
    }
    AlturaDeseado(idioma) {
        switch (idioma) {

            case es:
                return "Altura cm"
            case en:
                return "Height cm"
            default:
                return "Altura cm"
        }
    }
    EdadDeseada(idioma) {
        switch (idioma) {

            case es:
                return "Edad"
            case en:
                return "Age"
            default:
                return "Edad"
        }
    }
    PesoDeseado(idioma) {
        switch (idioma) {

            case es:
                return "Peso Kg"
            case en:
                return "Weight Kg"
            default:
                return "Peso Kg"
        }
    }
    TipoRutina(idioma) {
        switch (idioma) {

            case es:
                return "Seleccionar Tipo de Rutina"
            case en:
                return "Select Routine Type"
            default:
                return "Seleccionar Tipo de Rutina"
        }
    }
    TipoRutinaOpciones(idioma, opcion) {
        switch (opcion) {

            case 1:
                switch (idioma) {

                    case es:
                        return "Musculacion"
                    case en:
                        return "Bodybuilding"
                    default:
                        return "Musculacion"
                }
            case 2:
                switch (idioma) {

                    case es:
                        return "Aerobico"
                    case en:
                        return "Aerobics"
                    default:
                        return "Aerobico"
                }
        }
    }
    Nombre(idioma) {
        switch (idioma) {

            case es:
                return "Nombre"
            case en:
                return "Name"
            default:
                return "Nombre"
        }
    }
    MusculoEjercicio(idioma) {
        switch (idioma) {

            case es:
                return "Músculo del Ejercicio"
            case en:
                return "Exercise Muscle"
            default:
                return "Músculo del Ejercicio"
        }
    }
    MusculoEjercicioOpciones(idioma, opcion) {
        switch (opcion) {

            case 1:
                return this.Pecho(idioma)
            case 2:
                return this.Espalda(idioma)
            case 3:
                return this.Hombros(idioma)
            case 4:
                return this.Piernas(idioma)
            case 5:
                return this.Biceps(idioma)
            case 6:
                return this.Triceps(idioma)
            case 7:
                return this.Abdominales(idioma)
            case 8:
                return this.Cardio(idioma)
        }
    }
    ElementoEjercicio(idioma) {
        switch (idioma) {

            case es:
                return "Elemento del Ejercicio"
            case en:
                return "Element of Exercise"
            default:
                return "Elemento del Ejercicio"
        }
    }
    ElementoEjercicioOpciones(idioma, opcion) {
        switch (opcion) {

            case 1:
                return this.Barra(idioma)
            case 2:
                return this.Mancuernas(idioma)
            case 3:
                return this.Poleas(idioma)
            case 4:
                return this.Maquina(idioma)
            case 5:
                return this.Libre(idioma)
        }
    }
    //**************************************** */
    //SEARCH
    //**************************************** */
    SearchOpciones(idioma) {
        switch (idioma) {

            case es:
                return "Nombre/Musculo/Elemento"
            case en:
                return "Name/Muscle/Element"
            default:
                return "Nombre/Musculo/Elemento"
        }
    }
    Search(idioma) {
        switch (idioma) {

            case es:
                return "Buscar"
            case en:
                return "Search"
            default:
                return "Buscar"
        }
    }

    //**************************************** */
    //BOTONES
    //**************************************** */
    OmitirPlan(idioma) {
        switch (idioma) {

            case es:
                return "Omitir Plan"
            case en:
                return "Skip Plan"
            default:
                return "Omitir Plan"
        }
    }
    CrearPlan(idioma) {
        switch (idioma) {

            case es:
                return "Crear Plan"
            case en:
                return "Create Plan"
            default:
                return "Crear Plan"
        }
    }
    Cancelar(idioma) {
        switch (idioma) {

            case es:
                return "Cancelar"
            case en:
                return "Cancel"
            default:
                return "Cancelar"
        }
    }
    Aceptar(idioma) {
        switch (idioma) {

            case es:
                return "Aceptar"
            case en:
                return "Accept"
            default:
                return "Aceptar"
        }
    }
    Actualizar(idioma) {
        switch (idioma) {

            case es:
                return "Actualizar"
            case en:
                return "Update"
            default:
                return "Actualizar"
        }
    }
    Guardar(idioma) {
        switch (idioma) {

            case es:
                return "Guardar"
            case en:
                return "Save"
            default:
                return "Guardar"
        }
    }
    Borrar(idioma) {
        switch (idioma) {

            case es:
                return "Borrar"
            case en:
                return "Delete"
            default:
                return "Borrar"
        }
    }
    Empezar(idioma) {
        switch (idioma) {

            case es:
                return "¡¡Empezar!!"
            case en:
                return "Start!!"
            default:
                return "¡¡Empezar!!"
        }
    }
    SwipperSiguienteidioma(idioma){
        switch (idioma) {

            case es:
                return "Sig"
            case en:
                return "Next"
            default:
                return "Sig"
        }
    }
    SwipperAnterior(idioma){
        switch (idioma) {

            case es:
                return "Ant"
            case en:
                return "Back"
            default:
                return "Ant"
        }
    }
    //**************************************** */
    //MODAL
    //**************************************** */

    OmitirPlanModalLabel(idioma) {
        switch (idioma) {

            case es:
                return "¿Desea omitir la creacion de su plan?"
            case en:
                return "Do you want to skip the creation of your plan?"
            default:
                return "¿Desea omitir la creacion de su plan?"
        }
    }
    ActualizarPlanModalLabel(idioma) {
        switch (idioma) {

            case es:
                return "Para desbloquear el cambio de plan se le mostrara una publicidad"
            case en:
                return "To unlock the plan change it will be shown an advertisement"
            default:
                return "Para desbloquear el cambio de plan se le mostrara una publicidad"
        }
    }
    BorrarEjerciciosRutina(idioma) {
        switch (idioma) {

            case es:
                return "¿Está seguro que desea borrar todos los ejercicios de la rutina"
            case en:
                return "Are you sure you want to delete all exercises from the routine"
            default:
                return "¿Está seguro que desea borrar todos los ejercicios de la rutina"
        }
    }
    BorrarEjercicio(idioma) {
        switch (idioma) {

            case es:
                return "¿Está seguro que desea borrar el ejercicio"
            case en:
                return "Are you sure you want to delete the exercise"
            default:
                return "¿Está seguro que desea borrar el ejercicio"
        }
    }
    BorrarRutina(idioma) {
        switch (idioma) {

            case es:
                return "¿Está seguro que desea borrar la rutina"
            case en:
                return "Are you sure you want to delete the routine"
            default:
                return "¿Está seguro que desea borrar la rutina"
        }
    }
    EjercicioPertenece1(idioma) {
        switch (idioma) {

            case es:
                return "El ejercicio"
            case en:
                return "The exercise"
            default:
                return "El ejercicio"
        }
    }
    EjercicioPertenece2(idioma) {
        switch (idioma) {

            case es:
                return "pertenece a las rutinas:"
            case en:
                return "belongs to the routines:"
            default:
                return "pertenece a las rutinas:"
        }
    }
    EjercicioPertenece3(idioma) {
        switch (idioma) {

            case es:
                return "Debe eliminarlos de las rutinas primero"
            case en:
                return "You must remove them from routines first"
            default:
                return "Debe eliminarlos de las rutinas primero"
        }
    }
    EjercicioSimple(idioma) {
        switch (idioma) {

            case es:
                return "Ejercicio" + '\n' + "Simple"
            case en:
                return "Simple" + '\n' + "Exercise"
            default:
                return "Ejercicio" + '\n' + "Simple"
        }
    }
    EjercicioCombinado(idioma) {
        switch (idioma) {

            case es:
                return "Ejercicio" + '\n' + "Combinado"
            case en:
                return "Combined" + '\n' + "Exercise"
            default:
                return "Ejercicio" + '\n' + "Combinado"
        }
    }
    CrearRutina(idioma) {
        {
            switch (idioma) {

                case es:
                    return "¿Desea crear la rutina"
                case en:
                    return "Do you want to create the routine"
                default:
                    return "¿Desea crear la rutina"
            }
        }
    }
    CrearEjercicioModal(idioma) {
        {
            switch (idioma) {

                case es:
                    return "¿Desea crear el Ejercicio"
                case en:
                    return "Do you want to create the Exercise"
                default:
                    return "¿Desea crear el Ejercicio"
            }
        }
    }
    ActualizarEjercicioModal(idioma) {
        {
            switch (idioma) {

                case es:
                    return "¿Desea actualizar el Ejercicio"
                case en:
                    return "Do you want to update the Exercise"
                default:
                    return "¿Desea actualizar el Ejercicio"
            }
        }
    }
    CantidadSeries(idioma) {
        {
            switch (idioma) {

                case es:
                    return "Seleccione la cantidad de series"
                case en:
                    return "Select the number of series"
                default:
                    return "Seleccione la cantidad de series"
            }
        }
    }
    CantidadReps(idioma) {
        {
            switch (idioma) {

                case es:
                    return "Seleccione el orden y la cantidad de sus repeticiones"
                case en:
                    return "Select the order and quantity of your reps"
                default:
                    return "Seleccione el orden y la cantidad de sus repeticiones"
            }
        }
    }
    CantidadTiempo(idioma) {
        {
            switch (idioma) {

                case es:
                    return "Escriba el tiempo del ejercicio"
                case en:
                    return "Write the exercise time"
                default:
                    return "Escriba el tiempo del ejercicio"
            }
        }
    }
    //Favoritos
    SacarEjercicioFavs1(idioma) {
        {
            switch (idioma) {

                case es:
                    return "¿Desea sacar el Ejercicio"
                case en:
                    return "Do you want to take out the Exercise"
                default:
                    return "¿Desea sacar el Ejercicio"
            }
        }
    }
    SacarEjercicioFavs2(idioma) {
        {
            switch (idioma) {

                case es:
                    return "de su lista de favoritos"
                case en:
                    return "from your favorites list"
                default:
                    return "de su lista de favoritos"
            }
        }
    }
    SacarRutinaFavs1(idioma) {
        {
            switch (idioma) {

                case es:
                    return "¿Desea sacar la Rutina"
                case en:
                    return "Do you want to take out the Routine"
                default:
                    return "¿Desea sacar la Rutina"
            }
        }
    }
    SacarRutinaFavs2(idioma) {
        {
            switch (idioma) {

                case es:
                    return "de su lista de favoritos"
                case en:
                    return "from your favorites list"
                default:
                    return "de su lista de favoritos"
            }
        }
    }
    SacarSuplementoFavs1(idioma) {
        {
            switch (idioma) {

                case es:
                    return "¿Desea sacar el Suplemento"
                case en:
                    return "Do you want to take out the Supplement"
                default:
                    return "¿Desea sacar el Suplemento"
            }
        }
    }
    SacarSuplementoFavs2(idioma) {
        {
            switch (idioma) {

                case es:
                    return "de su lista de favoritos"
                case en:
                    return "from your favorites list"
                default:
                    return "de su lista de favoritos"
            }
        }
    }
    //**************************************** */
    //TITULOS
    //**************************************** */

    Ejercicios(idioma) {
        switch (idioma) {
            case es:
                return "Ejercicios"
            case en:
                return "Exercises"
            default:
                return "Ejercicios"
        }
    }
    EjerciciosDrawer(idioma) {
        console.log("************************")
        console.log(idioma)
        switch (idioma) {
            case es:
                return "Ejercicios"
            case en:
                return "Exercises"
            default:
                return "Ejercicios"
        }
    }
    CrearEjercicios(idioma) {
        switch (idioma) {

            case es:
                return "Crear Ejercicio"
            case en:
                return "Create Exercise"
            default:
                return "Crear Ejercicio"
        }
    }
    Editar(idioma) {
        switch (idioma) {
            case es:
                return "Editar"
            case en:
                return "Edit"
            default:
                return "Editar"
        }

    }
    Rutinas(idioma) {
        switch (idioma) {

            case es:
                return "Rutinas"
            case en:
                return "Routines"
            default:
                return "Rutinas"
        }
    }
    RutinaNueva(idioma) {
        switch (idioma) {

            case es:
                return "Nueva Rutina"
            case en:
                return "New Routine"
            default:
                return "Nueva Rutina"
        }
    }
    Musculos(idioma) {
        switch (idioma) {

            case es:
                return "Musculos"
            case en:
                return "Muscles"
            default:
                return "Musculos"
        }
    }
    Suplementos(idioma) {
        switch (idioma) {

            case es:
                return "Suplementos"
            case en:
                return "Supplements"
            default:
                return "Suplementos"
        }
    }
    Favoritos(idioma) {
        switch (idioma) {

            case es:
                return "Favoritos"
            case en:
                return "Favorites"
            default:
                return "Favoritos"
        }
    }
    EjerciciosFavs(idioma) {
        switch (idioma) {

            case es:
                return "Ejercicios Favoritos"
            case en:
                return "Favorite Exercises"
            default:
                return "Ejercicios Favoritos"
        }
    }
    RutinasFavs(idioma) {
        switch (idioma) {

            case es:
                return "Mis Rutinas"
            case en:
                return "My Routines"
            default:
                return "Mis Rutinas"
        }
    }
    Perfil(idioma) {

        switch (idioma) {

            case es:
                return "Perfil"
            case en:
                return "Profile"
            default:
                return "Perfil"
        }
    }
    Detalles(idioma) {
        switch (idioma) {

            case es:
                return "Detalles"
            case en:
                return "Details"
            default:
                return "Detalles"
        }
    }
    Marca(idioma) {
        switch (idioma) {

            case es:
                return "Marca"
            case en:
                return "Brand"
            default:
                return "Marca"
        }
    }
    Sabor(idioma) {
        switch (idioma) {

            case es:
                return "Sabor"
            case en:
                return "Flavor"
            default:
                return "Sabor"
        }
    }
    Beneficios(idioma) {
        switch (idioma) {

            case es:
                return "Beneficios"
            case en:
                return "Benefits"
            default:
                return "Beneficios"
        }
    }
    Uso(idioma) {
        switch (idioma) {

            case es:
                return "Uso"
            case en:
                return "Use"
            default:
                return "Uso"
        }
    }
    Ajustes(idioma) {
        switch (idioma) {

            case es:
                return "Ajustes"
            case en:
                return "Settings"
            default:
                return "Ajustes"
        }
    }
    //**************************************** */
    //Ejercicios
    //**************************************** */
    Ejecucion(idioma) {
        switch (idioma) {

            case es:
                return "Ejecución"
            case en:
                return "Execution"
            default:
                return "Ejecución"
        }
    }
    Descripcion(idioma) {
        switch (idioma) {

            case es:
                return "Descripción"
            case en:
                return "Description"
            default:
                return "Descripción"
        }
    }
    //**************************************** */
    //TAB
    //**************************************** */
    MiPlan(idioma) {
        switch (idioma) {

            case es:
                return "Mi Plan"
            case en:
                return "My Plan"
            default:
                return "Mi Plan"
        }
    }
    CambiarPlan(idioma) {
        switch (idioma) {

            case es:
                return "Cambiar Plan"
            case en:
                return "Change Plan"
            default:
                return "Cambiar Plan"
        }
    }
    //**************************************** */
    //Alerts
    //**************************************** */
    EjercicioRepetido(idioma) {
        switch (idioma) {

            case es:
                return 'Este ejercicio ya está en el día seleccionado'
            case en:
                return 'This exercise is already on the selected day'
            default:
                return 'Este ejercicio ya está en el día seleccionado'
        }
    }
    DiaParte1(idioma) {
        switch (idioma) {

            case es:
                return 'Debe agregar ejercicios en el día'
            case en:
                return 'Must add exercises on the day'
            default:
                return 'Debe agregar ejercicios en el día'
        }
    }
    DiaParte2(idioma) {
        switch (idioma) {

            case es:
                return 'para poder agregar los en este día'
            case en:
                return 'to be able to add them on this day'
            default:
                return 'para poder agregar los en este día'
        }
    }
    NombreEjercicioObligatorio(idioma) {
        switch (idioma) {

            case es:
                return 'Debes escribir el nombre del ejercicio'
            case en:
                return 'You must write the name of the exercise'
            default:
                return 'Debes escribir el nombre del ejercicio'
        }
    }
    MusculoMusculoObligatorio(idioma) {
        switch (idioma) {

            case es:
                return "Debes seleccionar el músculo del ejercicio"
            case en:
                return "You must select the muscle of the exercise"
            default:
                return "Debes seleccionar el músculo del ejercicio"
        }
    }
    MusculoElementoObligatorio(idioma) {
        switch (idioma) {

            case es:
                return "Debes seleccionar el elemento a usar del ejercicio"
            case en:
                return "You must select the element to use of the exercise"
            default:
                return "Debes seleccionar el elemento a usar del ejercicio"
        }
    }
    //MusculoAgregar
    CompletarCasilleros(idioma) {
        switch (idioma) {

            case es:
                return "Debe completar todos los casilleros"
            case en:
                return "You must complete all the fields"
            default:
                return "Debe completar todos los casilleros"
        }
    }
    CompletarTiempo(idioma) {
        switch (idioma) {

            case es:
                return "Debe marcar un tiempo"
            case en:
                return "You must set a time"
            default:
                return "Debe marcar un tiempo"
        }
    }
    CompletarSeries(idioma) {
        switch (idioma) {

            case es:
                return "Debe ingresar una cantidad de series"
            case en:
                return "You must enter a number of series"
            default:
                return "Debe ingresar una cantidad de series"
        }
    }

    //**************************************** */
    //Ayudas de Google
    //**************************************** */

    FavoritosLabel(idioma) {
        switch (idioma) {

            case es:
                return "Favorito"
            case en:
                return "Favorite"
            default:
                return "Favorito"
        }
    }
    FavoritosNoLabel(idioma) {
        switch (idioma) {

            case es:
                return "No Favorito"
            case en:
                return "No Favorite"
            default:
                return "No Favorito"
        }
    }
    FavoritosHint(idioma) {
        switch (idioma) {

            case es:
                return "Agregar a Favoritos"
            case en:
                return "Add to Favorites"
            default:
                return "Agregar a Favoritos"
        }
    }
    FavoritosNoHint(idioma) {
        switch (idioma) {

            case es:
                return "Sacar de Favoritos"
            case en:
                return "Remove from Favorites"
            default:
                return "Sacar de Favoritos"
        }
    }
    BannerHint(idioma) {
        switch (idioma) {

            case es:
                return "Navega al Anuncio"
            case en:
                return "Browse to Ad"
            default:
                return "Navega al Anuncio"
        }
    }
    EjerciciosHint(idioma) {
        switch (idioma) {

            case es:
                return "Navega a los Ejercicios de "
            case en:
                return "Navigate to the Exercises of "
            default:
                return "Navega a los Ejercicios de "
        }
    }

    //**************************************** */
    //MUSCULOS
    //**************************************** */
    Pecho(idioma) {
        switch (idioma) {

            case es:
                return "Pecho"
            case en:
                return "Chest"
            default:
                return "Pecho"
        }
    }
    Espalda(idioma) {
        switch (idioma) {

            case es:
                return "Espalda"
            case en:
                return "Back"
            default:
                return "Espalda"
        }
    }
    Hombros(idioma) {
        switch (idioma) {

            case es:
                return "Hombros"
            case en:
                return "Shoulders"
            default:
                return "Hombros"
        }
    }
    Piernas(idioma) {
        switch (idioma) {

            case es:
                return "Piernas"
            case en:
                return "Legs"
            default:
                return "Piernas"
        }
    }
    Biceps(idioma) {
        switch (idioma) {

            case es:
                return "Biceps"
            case en:
                return "Biceps"
            default:
                return "Biceps"
        }
    }
    Triceps(idioma) {
        switch (idioma) {

            case es:
                return "Triceps"
            case en:
                return "Triceps"
            default:
                return "Triceps"
        }
    }
    Abdominales(idioma) {
        switch (idioma) {

            case es:
                return "Abs"
            case en:
                return "Abs"
            default:
                return "Abs"
        }
    }
    Cardio(idioma) {
        switch (idioma) {

            case es:
                return "Cardio"
            case en:
                return "Cardio"
            default:
                return "Cardio"
        }
    }

    //**************************************** */
    //ELEMENTOS
    //**************************************** */
    Barra(idioma) {
        switch (idioma) {

            case es:
                return "Barra"
            case en:
                return "Barbell"
            default:
                return "Barra"
        }
    }
    Mancuernas(idioma) {
        switch (idioma) {

            case es:
                return "Mancuernas"
            case en:
                return "Dumbbells"
            default:
                return "Mancuernas"
        }
    }
    Poleas(idioma) {
        switch (idioma) {

            case es:
                return "Poleas"
            case en:
                return "Cable Station"
            default:
                return "Poleas"
        }
    }
    Maquina(idioma) {
        switch (idioma) {

            case es:
                return "Maquina"
            case en:
                return "Assisted Machine"
            default:
                return "Maquina"
        }
    }
    Libre(idioma) {
        switch (idioma) {

            case es:
                return "Libre"
            case en:
                return "No Equipment"
            default:
                return "Libre"
        }
    }
    //**************************************** */
    //MENUS
    //**************************************** */
    Musculacion(idioma) {
        switch (idioma) {

            case es:
                return "Musculacion"
            case en:
                return "Bodybuilding"
            default:
                return "Musculacion"
        }
    }
    Aerobico(idioma) {
        switch (idioma) {

            case es:
                return "Aerobico"
            case en:
                return "Aerobics"
            default:
                return "Aerobics"
        }
    }
    MisRutinas(idioma) {
        switch (idioma) {

            case 1:
                return "Mis Rutinas"
            case 2:
                return "My Routines"
            default:
                return "Mis Rutinas"
        }
    }
    Propia(idioma) {
        switch (idioma) {

            case 1:
                return "Propia"
            case 2:
                return "My Self"
            default:
                return "Propia"
        }
    }
}
export default new ExportadorFrases();