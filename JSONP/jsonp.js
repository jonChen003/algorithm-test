function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    window[callback] = function (data) {
      resolve(data);
      document.body.removeChild(script);
    };
    const reqParams = { ...params, callback };
    const arr = [];
    Object.keys(reqParams).forEach((key) => {
      arr.push(`${key}=${reqParams[key]}`);
    });
    const reqString = arr.join('&');
    script.src = `${url}?${reqString}`;
    document.body.appendChild(script);
  });
}

jsonp({
  url: 'http://localhost:3000/say',
  params: { wd: 'Iloveyou' },
  callback: 'show',
}).then((data) => {
  console.log(data);
});
