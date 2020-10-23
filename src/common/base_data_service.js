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
      onSuccess(responseJson);
    }).catch(exception => {
      onError({ error: exception });
    });
  }
}
