export function getJSON(url) {
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(data => console.log(data));
        // .catch(function(error) {
        //     console.log(error);
        // });
}

export const getLocation = function() {
    navigator.geolocation.getCurrentPosition(result => {
        let lat = result.coords.latitude;
        let long = result.coords.longitude;
        console.log(lat);
        console.log(long);
        let baseUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02&latitude=${lat}&longitude=${long}&maxradiuskm=100`;
        return baseUrl;
    })
};

// export const getLocation = function(options) {
//     return new Promise(function(resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject, options);
//         console.log(Promise);
//     });
// };

// const url ="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02";
// getJSON(url);

