```javascript
function GetNumberOfK(data, k) {
      if (data && data.length > 0 && k != null) {
        const firstIndex = getFirstK(data, 0, data.length - 1, k);
        const lastIndex = getLastK(data, 0, data.length - 1, k);
        if (firstIndex != -1 && lastIndex != -1) {
            return lastIndex - firstIndex + 1;
        }
      }
      return 0;
    }

function getFirstK(data, first, last, k) {
    if (first > last) {
        return -1;
    }
    const mid = parseInt((first + last) / 2);
    if (data[mid] === k) {
    if (data[mid - 1] != k) {
        return mid;
    } else {
        return getFirstK(data, first, mid-1, k);
    }
    } else if (data[mid] > k) {
        return getFirstK(data, first, mid - 1, k);
    } else if (data[mid] < k) {
        return getFirstK(data, mid + 1, last, k);
    }
}

function getLastK(data, first, last, k) {
    if (first > last) {
        return -1;
    }
    const mid = parseInt((first + last) / 2);
    if (data[mid] === k) {
    if (data[mid + 1] != k) {
        return mid;
    } else {
        return getLastK(data, mid + 1, last, k);
    }
    } else if (data[mid] > k) {
        return getLastK(data, first, mid - 1, k);
    } else if (data[mid] < k) {
        return getLastK(data, mid + 1, last, k);
    }
}
```
**思路：**
使用二分查找分别找到第一个目标值出现的位置和最后一个位置，时间复杂度$O(logn)$。