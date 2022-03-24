export function getData() {
        return fetch('https://wegotrip.com/api/v2/stats/plot')
            .then(data => data.json())
    }
