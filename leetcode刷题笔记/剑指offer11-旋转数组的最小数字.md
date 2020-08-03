```javascript
function minNumberInRotateArray(arr)
{
    let len = arr.length;
    if(len == 0)  return 0;
    let low = 0, high = len - 1;
    while(low < high) {
        let mid = low + Math.floor((high-low)/2);
        if(arr[mid] > arr[high]) {
            low = mid + 1;
        } else if(arr[mid] == arr[high]) {
            high = high - 1;
        } else {
            high = mid;
        }
    }
 
    return arr[low];
}
```
分析：

旋转数组其实是由两个有序数组拼接而成的，最小的元素刚好是这两个子数组的分界线，因此我们可以使用二分法，只需要找到拼接点即可。O(logn)

- (1)`array[mid] > array[high]:`

出现这种情况的array类似[3,4,5,6,0,1,2]，此时最小数字一定在mid的右边。 low = mid + 1

- (2)`array[mid] == array[high]:`

出现这种情况的array类似 [1,0,1,1,1]或者[1,1,1,0,1]，此时最小数字不好判断在mid左边 还是右边,这时只好一个一个试 。 high = high - 1

- (3)`array[mid] < array[high]:`

出现这种情况的array类似[2,2,3,4,5,6,6],此时最小数字一定就是array[mid]或者在mid的左 边。因为右边必然都是递增的。 high = mid