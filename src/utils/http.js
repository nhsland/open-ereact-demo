function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  
export async function httpGet(url) {
  const response = await fetch(url, {
    //   headers: buildHeaders()
  });

  return checkStatus(response).json();
}

export async function httpPost(url, data) {
    const body = JSON.stringify(data);
    const response = await fetch(url, {
      method: 'POST',
      //   headers: buildHeaders(),
      body
    });
    return checkStatus(response).json();
  }
  
