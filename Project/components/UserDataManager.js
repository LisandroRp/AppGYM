export default class UserDataManager {

    static myInstance = null;

    _mail = "";
    _Id = "";
    _Name = "";
    _usuario = "";
    _longitude = 0;
    _latitude = 0;

    /**
     * @returns {UserDataManager}
     */
    static getInstance() {
        if (UserDataManager.myInstance == null) {
            UserDataManager.myInstance = new UserDataManager();
        }

        return this.myInstance;
    }


    getUserEmail() {
        return this._mail
    }

    getUserName() {
        return this._Name
    }

    setUserData(userData) {
        this._mail = userData.mail
        this._usuario = userData.usuario
    }


    parseCoordenadasReact(item){
        return {
          longitude: item.coords.longitude,
          latitude: item.coords.latitude
        }
    }

    setCurrentPositionFromReact(){
        navigator.geolocation.getCurrentPosition(
          position => {
            const location = JSON.stringify(position);
            let position2 = this.parseCoordenadasReact(position)
            this._longitude = position2.longitude
            this._latitude = position2.latitude
            console.log("The position is LAT =>: " + this._latitude + "\n LONG => " + this._longitude)
        },
          error => Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }


      getCurrentPositionFromReact(){
          return {
            longitude: this._longitude,
            latitude: this._latitude
          }
      }
      getLatitude(){
          return this._latitude
      }
      getLongitude(){
          return this._longitude
      }
}