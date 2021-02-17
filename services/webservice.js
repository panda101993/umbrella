// const siteUrl = "http://172.16.6.199:8001/v1/api/"; //pramod

const siteUrl = "http://111.91.225.12:8014/v1/api/"; //staging

// http://172.16.0.216:2201/api/v1/user/getProfile
export default function graphQLRequest(variables, method, apiMethod, token, id) {
    console.log("ApiData=====>>>>Tokwnnnjnjjjnjnjn", token)
    var init = apiMethod == "GET" ? {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            "Authorization": token ? token : '',

        }
    } :
        {
         method: apiMethod,
            headers: {
                'Content-Type': "application/json",
                "Authorization": token ? token : '',

            },
            body: JSON.stringify(variables)
        }

    return fetch(siteUrl + method, init)
        .then(res => res.json()
            .then(data => {
                var apiData = {
                    status: res.status,
                    data: data
                }
                console.log("ApiData=====>>>>", init)
                return apiData;
            }))
        .catch(err => {
            console.log("err" + JSON.stringify(err))
            var apiData = {
                status: 900,
                data: "Please check your internet connection."
            }
            return apiData
        });
};
