import axios from 'axios';

// possibly this component can be replaced by useSWR()
// THIS CODE IS TAKEN FROM https://stackoverflow.com/questions/55868338/how-to-avoid-sending-multiple-duplicate-ajax-requests-in-axios
// hackape's and Jamter's answer
const customAxios = axios.create();

const pendings = {}
const caches = {}
const cacheUtils = {
  getUniqueUrl: function (config) {
    return config.url + '&' + config.method
  },
  isCached: function (config) {
    let uniqueUrl = this.getUniqueUrl(config)
    return caches[uniqueUrl] !== undefined
  },
  isPending: function (config) {
    let uniqueUrl = this.getUniqueUrl(config)
    if (!pendings[uniqueUrl]) {
      pendings[uniqueUrl] = {isFinished: false}
      return false
    } else {
      return true
    }
  },
  // removePending:  function (config) {
  //   let uniqueUrl = this.getUniqueUrl(config)
  //   if (!pendings[uniqueUrl]) {
  //     pendings[uniqueUrl] = [config]
  //     return false
  //   } else {
  //     console.log(`cache url: ${uniqueUrl}`)
  //     pendings[uniqueUrl].push(config)
  //     return true
  //   }
  // },
  setCachedResponse: function (config, response) {
    let uniqueUrl = this.getUniqueUrl(config)
    caches[uniqueUrl] = response
    pendings[uniqueUrl].isFinished = true
  },
  getError: function (config) {
    const skipXHRError = new Error('skip')
    skipXHRError.isSkipXHR = true
    skipXHRError.requestConfig = config
    return skipXHRError
  },
  getCachedResponse: function (config) {
    let uniqueUrl = this.getUniqueUrl(config)
    return caches[uniqueUrl]
  }
}
// This should be the *last* request interceptor to add
customAxios.interceptors.request.use(function (config) {
  console.log("interceptor request config", config)
  console.log("test pending list", pendings);
  // to avoid careless bug, only the request that explicitly declares *canCache* parameter can use cache
  if (config.canCache) {
    console.log("interceptor request cache", cacheUtils.isCached(config))
    if (cacheUtils.isCached(config)) {
      let error = cacheUtils.getError(config)
      throw error
    }
    if (cacheUtils.isPending(config)) {
      console.log("interceptor request pending")
      return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
          if (config.isFinished) {
            clearInterval(interval)
            let error = cacheUtils.getError(config)
            reject(error)
          }
        }, 200)
      });
    } else {
      console.log("interceptor request not pending")

      // no pending record, should send out request
      return config
    }
  } else {
    console.log("interceptor request can not cache")
    return config
  }
});

customAxios.interceptors.response.use(function (response) {
  console.log("interceptor response enter")
  cacheUtils.setCachedResponse(response.config, response)
  console.log("interceptor response store cache")
  return response;
}, function (error) {
  console.log("test pending list", pendings);
  console.log("interceptor response get error")
  /* recover from error back to normality
   * but this time we use an cached response result
   **/
  if (error.isSkipXHR) {
    console.log("interceptor response use cache")
    return cacheUtils.getCachedResponse(error.requestConfig)
  }
  return Promise.reject(error);
});

// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;