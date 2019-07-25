import Foundation



class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        for i in 0..<nums.count {
            for j in i+1..<nums.count {
                if(nums[i] + nums[j] == target) {
                        return [i, j]
                }
            }
        }
        return [];
    }
    func twoSum2(_ nums:[Int], _ target:Int) -> [Int] {
        var map:[Int:Int] = [:];
        for i in 0..<nums.count {
            let num = nums[i];
            let need = target - num;
            let index = map[need]
            if(index != nil) {
                return [index!, i];
            }
            map.updateValue(i, forKey: num);
        }
        return [];
    }
}
var s = Solution();
print(s.twoSum([2,  11, 7, 15], 9));
print(s.twoSum2([2,  11, 7, 15], 9));


