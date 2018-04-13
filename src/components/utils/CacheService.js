// 删除本地缓存
export function removeLocalStorageCache(key) {
  const {
    localStorage
  } = window;

  localStorage.removeItem(key);
}

// 保存本地缓存
export function setLocalStorageCache(key, value, expire) {
  const {
    localStorage
  } = window;
  // 转为json后存入缓存
  const saveValue = JSON.stringify({
    timestamp: new Date().getTime(),
    value,
    expire
  });
  localStorage.setItem(key, saveValue);
}

// 获取本地缓存值
export function getLocalStorageCache(key) {
  const {
    localStorage
  } = window;

  const valueJson = localStorage.getItem(key);
  // 获取不到缓存值
  if (valueJson === undefined || valueJson === null) {
    return null;
  }
  const orgValue = JSON.parse(valueJson);

  if (!orgValue.expire || new Date().getTime() < orgValue.expire) {
    return orgValue.value;
  }

  // 过期删除缓存
  removeLocalStorageCache(key);
  return null;
}

// 获取本地缓存信息
export function getLocalStorageInfo(key) {
  const {
    localStorage
  } = window;

  const valueJson = localStorage.getItem(key);
  // 获取不到缓存值
  if (valueJson === undefined) {
    return undefined;
  }

  return JSON.parse(valueJson);
}


export const memoryCache = (() => {
  const cache = {};
  return {
    // 设置内存缓存
    setMemoryCache(key, value) {
      // 存入时间戳
      cache[key] = {
        timestamp: new Date().getTime(),
        value
      };
    },
    // 获取内存缓存值
    getMemoryCache(key) {
      return cache[key] === undefined ? undefined : cache[key].value;
    },
    // 删除内存缓存
    removeMemoryCache(key) {
      if (key !== undefined) {
        cache[key] = undefined;
      }
    },
    // 获取内存缓存信息
    getMemoryCacheInfo(key) {
      return cache[key];
    }
  };
})();
