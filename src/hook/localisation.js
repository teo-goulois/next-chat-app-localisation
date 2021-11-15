export function getLocalisation() {

    const getLocation = () => {
        if (navigator.geolocation) {
          return navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
        } else {
          alert('Geolocation is not supported by this browser.')
        }
      }
    
      const geoSuccess = position => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        console.log('e', lat, lng)
        return { lat: lat, lng: lng}
      }
    
      const geoError = () => {
        alert('geo failed')
      }

    return getLocation()
}