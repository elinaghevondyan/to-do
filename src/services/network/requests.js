import config from './config';

const {base_url} = config;

export const request = (url, requestOptions, setRequestData) => {
    fetch(`${base_url}/${url}`, requestOptions)
        .then(async response => {
            const data = await response.json();
            setRequestData({
                response: data,
                error: !response.ok,
                loading: false,
            });
        })
        .catch(error => {
            setRequestData({
                response: { status: "network_failure" },
                error: true,
                loading: false,
            })
        });
};
