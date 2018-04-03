// 保存本地缓存
export function setLocalStorageCache(key, value) {
  const {
    localStorage
  } = window;
  // 转为json后存入缓存
  const saveValue = JSON.stringify({
    timestamp: new Date().getTime(),
    value
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
  return orgValue.value;
}

// 删除本地缓存
export function removeLocalStorageCache(key) {
  const {
    localStorage
  } = window;

  localStorage.removeItem(key);
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
