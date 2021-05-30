const url = 'dist/data.json';

const getData = async () => {
    const res = await fetch(url);
    const data = await res.json()
    console.log(data)
}

getData()

