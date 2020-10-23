import { AppConfig } from "./config";

export default class BaseDataService {

  getData = (methodName, onError, onSuccess) => {
    const appConfig = AppConfig.BaseAPI;
    const responsePromise = fetch(`${appConfig}${methodName}`)
    this.onResponseReceipt(responsePromise, onError, onSuccess);
  }

  onResponseReceipt = (responsePromise, onError, onSuccess) => {
    responsePromise.then(response => {
      return response.json()
    }).then(responseJson => {
      if (responseJson && responseJson.results && onSuccess) {
        onSuccess({ results: responseJson.results, error: responseJson.error });
      } else if (onError) {
        if (!responseJson) {
          onError({ results: null, error: 'No response received.' });
        } else if (!responseJson.results) {
          onError({ results: null, error: 'No response received.' });
        }
      }
    }).catch(exception => {
      onError({ results: null, error: exception });
    });
  }
}
